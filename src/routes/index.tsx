import { component$ } from "@builder.io/qwik"
import ContactForm from "~/components/index/ContactForm"

export default component$(() => {
  return (
    <div class="m-auto max-w-md">
      <div class="mt-12 mb-6">
        <h1 class="my-6">Hey there,</h1>
        <p class="my-3">
          I am Nhật Minh and I explore ways of utilizing technology to make our
          lives more fun and efficient.
        </p>
        <p class="my-3">
          Feel free to contact me if you have any questions or if you want to
          chat about my work!
        </p>
      </div>
      <ContactForm />
    </div>
  )
})
