import { component$ } from "@builder.io/qwik"
import Container from "~/components/Container"

import Hero from "./Hero"
import Projects from "./Projects"
import Thoughts from "./Thoughts"

export default component$(() => (
  <>
    <Hero />
    <Projects />
    {false && <Thoughts />}
    <Container class="mt-16 sm:mt-36" />
  </>
))
