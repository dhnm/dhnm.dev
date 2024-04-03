import type { PropsOf, Signal, ClassList } from "@builder.io/qwik"
import { component$, Slot } from "@builder.io/qwik"
import clsx from "clsx"

type ContainerProps = PropsOf<"div"> & {
  ref?: Signal<Element | undefined>
  class?: ClassList
}

export const ContainerOuter = component$<ContainerProps>(
  ({ ref, class: className, ...props }) => {
    return (
      <div ref={ref} class={clsx("sm:px-8", className)} {...props}>
        <div class="mx-auto w-full max-w-7xl lg:px-8">
          <Slot />
        </div>
      </div>
    )
  },
)

export const ContainerInner = component$<ContainerProps>(
  ({ ref, class: className, ...props }) => {
    return (
      <div
        ref={ref}
        class={clsx("relative px-4 sm:px-8 lg:px-12", className)}
        {...props}
      >
        <div class="mx-auto max-w-2xl lg:max-w-5xl">
          <Slot />
        </div>
      </div>
    )
  },
)

export default component$<ContainerProps>(({ ref, ...props }) => {
  return (
    <ContainerOuter ref={ref} {...props}>
      <ContainerInner>
        <Slot />
      </ContainerInner>
    </ContainerOuter>
  )
})
