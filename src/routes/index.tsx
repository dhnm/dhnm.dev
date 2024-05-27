import { component$ } from "@builder.io/qwik"

import Hero from "./Hero"
import Projects from "./Projects"
import Thoughts from "./Thoughts"
import Container from "~/components/Container"

export default component$(() => (
  <>
    <Hero />
    <Projects />
    <Thoughts />
    <Container class="mt-16 sm:mt-36" />
  </>
))
