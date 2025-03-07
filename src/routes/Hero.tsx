import { Slot, component$ } from "@builder.io/qwik"
import Container from "~/components/Container"

import ContactForm from "./ContactForm"

export const HeroButton = component$(({ href }: { href: string }) => {
  return (
    <a href={href} target="_blank" class="btn btn-primary">
      <Slot />
    </a>
  )
})

export default component$(() => (
  <>
    <Container class="my-9 md:my-24">
      <h1 class="max-w-lg text-3xl font-normal !leading-normal md:max-w-3xl md:text-4xl xl:text-5xl">
        <span class="text-xl md:text-2xl xl:text-3xl">
          Hey there! My name is <span class="font-bold">Nhật&nbsp;Minh</span>.
        </span>
        <br />I use <span class="font-bold">software & AI</span> solutions
        <br />
        to deliver <span class="font-bold">joy & utility</span> to people.
      </h1>
    </Container>
    <Container id="about">
      <div class="mx-auto flex max-w-xl flex-col items-center gap-y-10 lg:max-w-none lg:flex-row">
        <div class="max-w-2xl">
          <div class="prose mt-9 text-base-content">
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
              I specialize in <b>rapid knowledge and skill acquisition</b>. In
              fact, <b>I compete in learning</b>. I believe this makes me
              well-equipped to deal with various challenges in this
              ever-changing world.
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
