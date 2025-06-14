import type { ClassList, PropsOf } from "@builder.io/qwik"
import { Slot, component$ } from "@builder.io/qwik"
import clsx from "clsx"

type ContainerProps = PropsOf<"div"> & {
  class?: ClassList
}

export const ContainerOuter = component$<ContainerProps>(
  ({ class: className, ...props }) => {
    return (
      <div class={clsx("sm:px-8", className)} {...props}>
        <div class="mx-auto w-full max-w-7xl lg:px-8">
          <Slot />
        </div>
      </div>
    )
  },
)

export default component$<ContainerProps>(({ class: className, ...props }) => {
  return (
    <div class={clsx("relative px-4 sm:px-8 lg:px-12", className)} {...props}>
      <div class="mx-auto max-w-2xl lg:max-w-5xl">
        <Slot />
      </div>
    </div>
  )
})
