import { $, component$, useSignal } from "@builder.io/qwik"
import { Form } from "@builder.io/qwik-city"
import { globalAction$, zod$, z } from "@builder.io/qwik-city"
import clsx from "clsx"

import { ErrorIcon, MailIcon, SuccessIcon } from "~/components/icons"
import TextLink from "~/components/TextLink"
import Turnstile, { verifyToken } from "~/components/Turnstile"

export const useSendEmail = globalAction$(
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

    const escapeHtml = (text: string) =>
      text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")

    const safeMessage = escapeHtml(data.message)
    const messageWithBreaks = safeMessage.replace(/\n/g, "<br />")

    // Prepare email
    const payload = {
      api_key: apiKey,
      sender: `dhnmdev <${sender_email}>`,
      to: [`Nhật Minh <${my_email}>`],
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

const ObscureEmail = () => (
  <span
    class="skeleton mb-[-0.3em] inline-block h-[1.395em] w-[7.528em] bg-primary/5"
    role="alert"
    aria-label="Loading email address"
    aria-busy="true"
  ></span>
)

export default component$(() => {
  const failedVerifyAttempts = useSignal(0)
  const myEmail = useSignal<string | null>(null)
  const action = useSendEmail()

  const handleVerifySuccess = $((email: string) => {
    myEmail.value = email
  })

  const handleVerifyError = $(() => {
    if (!window.turnstile) {
      failedVerifyAttempts.value = Infinity
      return
    }
    failedVerifyAttempts.value++
    if (failedVerifyAttempts.value == 2) {
      console.error("Second verification failed.")
      window.turnstile.reset()
    } else if (failedVerifyAttempts.value > 2) {
      console.error("Second verification failed two times.")
    }
  })

  const turnstileVerify = $(async (token: string) => {
    try {
      const response = await verifyToken(
        token,
        failedVerifyAttempts.value == 0 ? "invisible" : "managed",
      )

      if (response.status == 200 && response.message) {
        handleVerifySuccess(response.message)
        return
      }
      console.error(response.status)
    } catch (e) {
      console.error(e)
    }

    handleVerifyError()
  })

  return (
    <Form
      action={action}
      class="rounded-2xl border border-base-content/10 bg-base-100 p-3 sm:p-6"
    >
      <h2 class="flex text-sm font-semibold">
        <MailIcon class="h-5 w-5 fill-none stroke-current" />
        <span class="ml-3 tracking-tight">Send me a message</span>
      </h2>
      <p
        class={clsx("mt-2 text-sm", failedVerifyAttempts.value > 2 && "hidden")}
      >
        Message me on{" "}
        {myEmail.value ? (
          <TextLink href={`mailto:${myEmail.value}`}>{myEmail.value}</TextLink>
        ) : (
          <ObscureEmail />
        )}{" "}
        or use the following form:
      </p>
      {action.value?.failed !== false && (
        <>
          <div class="mt-4">
            <textarea
              placeholder="Your Message"
              aria-label="Message"
              name="message"
              minLength={15}
              maxLength={3000}
              class="textarea textarea-bordered w-full text-base focus:outline-primary"
              rows={2}
              required
            ></textarea>
          </div>
          <div class="mt-1 flex space-x-2">
            <input
              type="email"
              placeholder="Your E-mail Address"
              aria-label="Your E-mail Address"
              name="email"
              required
              class="input input-bordered w-full text-base focus:outline-primary"
            />
            <button
              type="submit"
              class={"btn btn-outline btn-primary btn-md"}
              disabled={action.isRunning || failedVerifyAttempts.value > 2}
            >
              {action.isRunning ? (
                <span class="loading loading-spinner" />
              ) : (
                "Send"
              )}
            </button>
          </div>
          <div class="flex justify-center">
            {failedVerifyAttempts.value == 0 && (
              <Turnstile
                sitekey={import.meta.env.PUBLIC_CF_INVISIBLE_SITEKEY}
                onError={handleVerifyError}
                onVerify={turnstileVerify}
              />
            )}
            {failedVerifyAttempts.value > 0 && (
              <Turnstile
                sitekey={import.meta.env.PUBLIC_CF_MANAGED_SITEKEY}
                onError={handleVerifyError}
                onVerify={turnstileVerify}
                class="mt-3"
              />
            )}
          </div>
        </>
      )}
      {action.value?.failed === false && (
        <div
          role="alert"
          class="alert mt-3 border-success/10 bg-success/5 text-sm"
        >
          <SuccessIcon class="h-6 w-6 shrink-0 stroke-success" />
          <span>Message sent! I'll get back to you as soon as I can.</span>
        </div>
      )}

      <div
        role="alert"
        class={clsx(
          "alert mt-3 border-error/10 bg-error/5 text-sm",
          action.value?.failed || "hidden",
        )}
      >
        <ErrorIcon class="h-6 w-6 shrink-0 stroke-error" />
        <span>
          {action.value?.failed && (
            <>
              <p class="text-sm font-semibold">Failed to send message.</p>
              {!!action.value.fieldErrors || (
                <p class="text-sm">Please send me an e-mail instead.</p>
              )}
              {[
                action.value.fieldErrors?.message,
                action.value.fieldErrors?.email,
                action.value.fieldErrors?.["cf-turnstile-response"],
              ]
                .filter((e) => e)
                .map((fieldError) => (
                  <p class="mt-1 text-sm" key={fieldError![0]}>
                    {fieldError![0]}
                  </p>
                ))}
              {action.value.formErrors?.map((error) => (
                <p class="mt-1 text-sm" key={error}>
                  {error}
                </p>
              ))}
              {action.value.message && (
                <p class="mt-1 text-sm">{action.value.message}</p>
              )}
            </>
          )}
        </span>
      </div>
    </Form>
  )
})
