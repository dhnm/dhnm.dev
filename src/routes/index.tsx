import { Slot, component$ } from "@builder.io/qwik"

import Container from "~/components/Container"
import { DocumentIcon, GitHubIcon, LinkedInIcon } from "~/components/icons"
import ContactForm from "./ContactForm"

const OpenToWorkIndicator = () => (
  <div class="mt-9 flex items-center gap-2">
    {/* Diode - Green Circle */}
    <span
      class="h-3 w-3 rounded-full bg-[radial-gradient(circle,#00ff00_15%,#17a443_85%)] shadow-[0_0_2px_2px_#00ff0060,0_0_4px_4px_#00ff0020]"
      aria-hidden="true"
    ></span>
    <span class="uppercase text-success">Open to work (UK or Remote)</span>
  </div>
)

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

export default component$(() => (
  <>
    <Container class="mt-9">
      <h1 class="text-4xl sm:text-5xl">
        Building Cool Stuff & Exploring What’s&nbsp;Next
      </h1>
      <div class="mx-auto grid max-w-xl grid-cols-1 items-center gap-y-10 lg:max-w-none lg:grid-cols-2">
        <div class="max-w-2xl">
          <OpenToWorkIndicator />
          <div class="mt-9 flex flex-wrap gap-2">
            <FrontPageSecondaryButton href="/Nhat_Minh_CV.pdf">
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
              <span class="font-extrabold">design</span>, or anything under the
              sun? <span class="font-extrabold">Let's chat!</span>
            </p>
          </div>
        </div>
        <div class="space-y-10 lg:pl-16 xl:pl-24">
          <ContactForm />
        </div>
      </div>
    </Container>
    <Container class="mt-16 sm:mt-24">
      <section>
        <h2>🚧&nbsp;Website Under Construction&nbsp;🚧</h2>
        <p class="mt-6">
          I'm working hard among other commitments to include a showcase of my
          works and thoughts here. In the meantime, feel free to reach out to me
          via the contact information above.
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
))
