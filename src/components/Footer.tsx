import { component$ } from "@builder.io/qwik"

import Container from "./Container"

export default component$(() => {
  return (
    <footer class="footer footer-horizontal border-base-100 mt-32 border-t py-10">
      <Container class="grid-flow-col">
        <nav class="gap-4"></nav>
      </Container>
      <Container class="grid-flow-col justify-self-end">
        <aside>
          <p class="text-base-content/70 text-sm">
            &copy; {new Date().getFullYear()} Nhật Minh Đinh Huy. All rights
            reserved.
          </p>
        </aside>
      </Container>
    </footer>
  )
})
