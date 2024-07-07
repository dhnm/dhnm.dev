import { Slot, component$ } from "@builder.io/qwik"
import Container from "~/components/Container"

import { GitHubIcon, LinkedInIcon } from "~/components/icons"
import ContactForm from "./ContactForm"

const OpenToWorkIndicator = () => (
  <div class="flex items-center gap-2">
    {/* Diode - Green Circle */}
    <span
      class="h-3 w-3 rounded-full bg-[radial-gradient(circle,#00ff00_15%,#17a443_85%)] shadow-[0_0_2px_2px_#00ff0060,0_0_4px_4px_#00ff0020]"
      aria-hidden="true"
    ></span>
    <span class="uppercase text-success">Open to work (UK or Remote)</span>
  </div>
)

export const HeroButton = component$(({ href }: { href: string }) => {
  return (
    <a href={href} target="_blank" class="btn btn-primary">
      <Slot />
    </a>
  )
})

export default component$(() => (
  <Container>
    <h1 class="my-9 max-w-lg text-3xl !leading-normal md:my-36 md:max-w-3xl md:text-4xl xl:text-5xl">
      I Love Building Cool Stuff & Exploring What’s&nbsp;Next in Tech
    </h1>
    <div class="mx-auto flex max-w-xl flex-col items-center gap-y-10 lg:max-w-none lg:flex-row">
      <div class="max-w-2xl">
        <OpenToWorkIndicator />
        <div class="mt-9 flex flex-wrap gap-2">
          <HeroButton href="https://github.com/dhnm">
            GitHub
            <GitHubIcon class="h-4 w-4 fill-current" />
          </HeroButton>
          <HeroButton href="https://linkedin.com/in/dhnm">
            LinkedIn
            <LinkedInIcon class="h-4 w-4 fill-current" />
          </HeroButton>
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
            <span class="font-extrabold">film festival</span>, geeking out over
            something like the mysteries of{" "}
            <span class="font-extrabold">quantum physics</span>, or plotting to
            win at <span class="font-extrabold">pickleball</span>.
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
      <div class="space-y-10 lg:pl-16 lg:pt-8 xl:pl-24">
        <ContactForm />
      </div>
    </div>
  </Container>
))
