import { component$ } from "@builder.io/qwik"
import Container from "~/components/Container"

import Hero from "./Hero"
import KeyProjects from "./KeyProjects"
import Explorations from "./Explorations"
import Thoughts from "./Thoughts"

export default component$(() => (
  <>
    <Hero />
    <KeyProjects />
    <Explorations />
    {/*<Thoughts />*/}
    <Container class="mt-16 sm:mt-36" />
  </>
))
