import { component$, Slot } from "@builder.io/qwik"

import KeyProjects from "./Projects.Key"
import Explorations from "./Projects.Extra"

export const SecondaryCardLink = component$(({ href }: { href: string }) => (
  <a
    href={href}
    target="_blank"
    class="btn btn-ghost btn-sm bg-sky-200 hover:bg-sky-300 dark:bg-sky-900 dark:hover:bg-sky-800"
  >
    <Slot />
  </a>
))

export default component$(() => (
  <section id="projects">
    <KeyProjects />
    <Explorations />
  </section>
))
