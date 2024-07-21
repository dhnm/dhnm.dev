import { component$ } from "@builder.io/qwik"

import { ContainerInner, ContainerOuter } from "./Container"

export default component$(() => {
  return (
    <footer class="mt-32 flex-none">
      <ContainerOuter>
        <div class="border-t border-base-100 py-10">
          <ContainerInner>
            <div class="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div class="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium"></div>
              <p class="text-sm text-base-content/70">
                &copy; {new Date().getFullYear()} Nhật Minh Đinh Huy. All rights
                reserved.
              </p>
            </div>
          </ContainerInner>
        </div>
      </ContainerOuter>
    </footer>
  )
})
