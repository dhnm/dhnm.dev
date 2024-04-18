import { Slot, component$, useSignal } from "@builder.io/qwik"
import { routeAction$, zod$, z, server$ } from "@builder.io/qwik-city"

import Container from "~/components/Container"
import { DocumentIcon, GitHubIcon, LinkedInIcon } from "~/components/icons"
import TextLink from "~/components/TextLink"
import ContactForm from "./ContactForm"

export const verifyToken = server$(async function (
  token: string,
  kind: "invisible" | "managed" | "repeated",
) {
  // Validate the incoming token
  if (!token) {
    return { status: 400, message: "Missing token" }
  }

  // Generate or retrieve an idempotency key and secret based on the kind of request
  let idempotencyKey: string
  let secret: string | undefined

  if (kind !== "repeated") {
    idempotencyKey = crypto.randomUUID()
    this.cookie.set("turnstilekey", idempotencyKey, { maxAge: 300 })
    this.cookie.set("kind", kind, { maxAge: 300 })
    secret =
      kind === "invisible"
        ? this.env.get("CF_INVISIBLE_SECRET")
        : this.env.get("CF_MANAGED_SECRET")
  } else {
    idempotencyKey = this.cookie.get("turnstilekey")?.value || ""
    secret =
      this.cookie.get("kind")?.value === "invisible"
        ? this.env.get("CF_INVISIBLE_SECRET")
        : this.env.get("CF_MANAGED_SECRET")
  }

  // Prepare the data for the API request
  const formData = new FormData()
  formData.append("secret", secret || "")
  formData.append("response", token)
  formData.append("idempotency_key", idempotencyKey)
  if (this.clientConn.ip) {
    formData.append("remoteip", this.clientConn.ip)
  }

  // Perform the API call to verify the token
  const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify"
  const result = await fetch(url, { method: "POST", body: formData })

  const outcome = await result.json()
  if (outcome.success) {
    return { status: 200, message: this.env.get("MY_EMAIL"), ok: true }
  }

  console.error("here")
  console.error(outcome)
  return { status: 403, message: "Failed to verify token" }
})

export const useSendEmail = routeAction$(
  async (data, { env, fail }) => {
    // Verify the captcha token
    try {
      const verifyRes = await verifyToken(
        data["cf-turnstile-response"],
        "repeated",
      )
      if (verifyRes.status !== 200) {
        return fail(verifyRes.status, {
          message: `Anti-bot validation failed: ${verifyRes.message}.`,
        })
      }
    } catch (e) {
      console.error(e)
      return fail(520, { message: "Unknown Anti-bot validation error." })
    }

    // Retrieve credentials from environment
    const apiKey = env.get("EMAIL_API_KEY")
    if (!apiKey) {
      console.error("Missing Email API key.")
      return fail(500, { message: "Server configuration error." })
    }

    const my_email = env.get("MY_EMAIL")!
    const sender_email = env.get("SENDER_EMAIL")!
    const api_send_url = env.get("EMAIL_API_SEND_URL")!

    const escapeHtml = (text) =>
      text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")

    const safeMessage = escapeHtml(data.message).replace(/\n/g, "<br>")
    const messageWithBreaks = safeMessage.replace(/\n/g, "<br />")

    // Prepare email
    const payload = {
      api_key: apiKey,
      sender: `dhnmdev <${sender_email}>`,
      to: [`Nhat Minh <${my_email}>`],
      template_id: "3650622",
      template_data: {
        from: data.email,
        message: messageWithBreaks,
      },
      custom_headers: [
        {
          header: "Reply-To",
          value: data.email,
        },
      ],
    }

    // Send email
    try {
      const mailRes = await fetch(api_send_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!mailRes.ok) {
        console.error(`Provider Error ${mailRes.status}:`, await mailRes.text())
        return fail(mailRes.status, {
          message: `Provider Error ${mailRes.status}.`,
        })
      }

      const mailResPayload = await mailRes.json()

      if (!mailResPayload.data?.succeeded) {
        console.error(mailResPayload.failures)
        return fail(500, {
          message: "Provider failed to send email.",
        })
      }

      return { failed: false }
    } catch (e) {
      console.error(e)
      return fail(520, { message: "Unknown Provider Error 520." })
    }
  },
  zod$({
    email: z.string().email(),
    message: z
      .string()
      .trim()
      .min(15, { message: "Message is too short." })
      .max(3000, { message: "Message is too long." }),
    "cf-turnstile-response": z
      .string({ required_error: "Anti-bot validation failed." })
      .min(1, { message: "Anti-bot validation failed." }),
  }),
)

export const ObscureEmail = () => (
  <span
    class="skeleton mb-[-0.3em] inline-block h-[1.395em] w-[7.528em] bg-primary/5"
    role="alert"
    aria-label="Loading email address"
    aria-busy="true"
  ></span>
)

const OpenToWorkIndicator = () => {
  return (
    <div class="mt-9 flex items-center gap-2">
      {/* Diode - Green Circle */}
      <span
        class="h-3 w-3 rounded-full bg-[radial-gradient(circle,#00ff00_15%,#17a443_85%)] shadow-[0_0_2px_2px_#00ff0060,0_0_4px_4px_#00ff0020]"
        aria-hidden="true"
      ></span>
      <span class="uppercase text-success">Open to work (UK or Remote)</span>
    </div>
  )
}

export const FrontPageSecondaryButton = component$(
  ({ href }: { href: string }) => {
    return (
      <a
        href={href}
        target="_blank"
        class="btn btn-secondary border-[oklch(95%_0.01_200)] bg-[oklch(95%_0.01_200)] transition-colors hover:border-[oklch(92%_0.01_200)] hover:bg-[oklch(92%_0.01_200)] dark:border-[oklch(28%_0.05_240)] dark:bg-[oklch(28%_0.05_240)] dark:hover:border-[oklch(25%_0.05_240)] dark:hover:bg-[oklch(25%_0.05_240)]"
      >
        <Slot />
      </a>
    )
  },
)

export default component$(() => {
  const action = useSendEmail()
  const myEmail = useSignal<string | undefined>(undefined)

  return (
    <>
      <Container class="mt-9">
        <h1 class="text-4xl sm:text-5xl">
          Building Cool Stuff & Exploring What’s&nbsp;Next
        </h1>
        <div class="mx-auto grid max-w-xl grid-cols-1 items-center gap-y-10 lg:max-w-none lg:grid-cols-2">
          <div class="max-w-2xl">
            <OpenToWorkIndicator />
            <div class="mt-9 flex flex-wrap gap-2">
              <FrontPageSecondaryButton href="/nhatminh-cv.pdf">
                CV (Resume)
                <DocumentIcon class="h-4 w-4 fill-current" />
              </FrontPageSecondaryButton>
              <FrontPageSecondaryButton href="https://github.com/dhnm">
                GitHub
                <GitHubIcon class="h-4 w-4 fill-current" />
              </FrontPageSecondaryButton>
              <FrontPageSecondaryButton href="https://linkedin.com/in/dhnm">
                LinkedIn
                <LinkedInIcon class="h-4 w-4 fill-current" />
              </FrontPageSecondaryButton>
            </div>
            <div class="prose mt-9 text-base-content">
              <p>
                Hey there! I'm all about{" "}
                <span class="font-extrabold">
                  turning code into something amazing
                </span>{" "}
                and{" "}
                <span class="font-extrabold">
                  getting machines to learn new tricks
                </span>
                .
              </p>
              <p>
                You might also catch me at a{" "}
                <span class="font-extrabold">film festival</span>, geeking out
                over something like the mysteries of{" "}
                <span class="font-extrabold">quantum physics</span>, or plotting
                to win at <span class="font-extrabold">pickleball</span>.
              </p>
              <p>
                Do you have an interesting{" "}
                <span class="font-extrabold">challenge</span> or want to talk{" "}
                <span class="font-extrabold">tech</span>,{" "}
                <span class="font-extrabold">design</span>, or anything under
                the sun? <span class="font-extrabold">Let's chat!</span>
              </p>
            </div>
          </div>
          <div class="space-y-10 lg:pl-16 xl:pl-24">
            <ContactForm action={action} myEmail={myEmail} />
          </div>
        </div>
      </Container>
      <Container class="mt-16 sm:mt-24">
        <section>
          <h2>🚧&nbsp;Website Under Construction&nbsp;🚧</h2>
          <p class="mt-6">
            I'm working hard among other commitments to include a showcase of my
            works and thoughts here. In the meantime, feel free to reach out to
            me via{" "}
            {myEmail.value ? (
              <TextLink href={`mailto:${myEmail.value}`}>
                {myEmail.value}
              </TextLink>
            ) : (
              <ObscureEmail />
            )}{" "}
            or <TextLink href="https://linkedin.com/in/dhnm">LinkedIn</TextLink>
            .
          </p>
        </section>
      </Container>
      {false && (
        <Container class="mt-16 sm:mt-20">
          <section id="projects">
            <h2>Projects</h2>
            <div class="mt-6">
              <img
                src="https://unsplash.it/270/270?grayscale"
                alt="Placeholder"
                width="270"
                height="270"
                class="rounded-3xl"
              />
            </div>
          </section>
        </Container>
      )}
    </>
  )
})
