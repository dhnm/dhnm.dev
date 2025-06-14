import { component$ } from "@builder.io/qwik"
import ContactForm from "~/components/index/ContactForm"

import Logo from "~/assets/dhnm_logo.png?quality=100&jsx"

export default component$(() => {
  return (
    <div class="m-auto max-w-md">
      <Logo
        class="mx-auto my-12 h-24 w-24"
        alt="Logo - a black circle and right-angle shape on white circular background"
      />
      <div class="mt-6 mb-9 px-2 text-lg">
        <h2 class="mb-6">Hey there,</h2>
        <p class="mb-3">
          I am Nhật Minh. I research and build technologies that help people
          perform their tasks efficiently and with ease.
        </p>
        <p>
          Feel free to contact me if you have any questions or if you want to
          chat about my work!
        </p>
      </div>
      <ContactForm />
    </div>
  )
})
