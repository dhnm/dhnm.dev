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
    <span class="uppercase text-success">Open to work (UK, EU, or Remote)</span>
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
  <>
    <Container class="my-9 md:my-36">
      <h1 class="max-w-lg text-3xl font-normal !leading-normal md:max-w-3xl md:text-4xl xl:text-5xl">
        <span class="text-xl md:text-2xl xl:text-3xl">
          Hey there! My name is <span class="font-bold">Nhật&nbsp;Minh</span>.
        </span>
        <br />I am an <span class="font-bold">adaptable&nbsp;learner</span> and
        <br />
        deliver <span class="font-bold">software&nbsp;solutions</span>.
      </h1>
    </Container>
    <Container id="about">
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
              <b>I compete in learning.</b> In other words, I specialize in{" "}
              <b>rapid knowledge and skill acquisition</b>. I have a track
              record of internalizing massive amounts of learning material and{" "}
              <b>successfully applying</b> it under high-pressure settings and{" "}
              <b>tight deadlines</b>.
            </p>
            <p>
              I find it particularly rewarding to use <b>code</b> in creating
              solutions that have tangible, <b>real-world impact</b>.
            </p>
            <p>
              My approach is driven by immersing in stakeholder <b>needs</b> to
              tailor the solutions{" "}
              <b>across domains and the technology stack</b>. I keep up with
              developments from neural networks to quantum algorithms to
              understand the evolving technological possibilities.
            </p>
            <p>
              Have an interesting <span class="font-extrabold">challenge</span>{" "}
              or want to talk <span class="font-extrabold">tech</span>,{" "}
              <span class="font-extrabold">knowledge management</span>, or
              anything under the sun?{" "}
              <span class="font-extrabold">Let's chat!</span>
            </p>
          </div>
        </div>
        <div class="space-y-10 lg:pl-16 lg:pt-8 xl:pl-24">
          <ContactForm />
        </div>
      </div>
    </Container>
  </>
))
