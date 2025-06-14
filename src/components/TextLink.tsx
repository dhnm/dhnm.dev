import type { ClassList, PropsOf } from "@builder.io/qwik"
import { Slot, component$ } from "@builder.io/qwik"
import { Link } from "@builder.io/qwik-city"
import clsx from "clsx"

type LinkProps = PropsOf<"a"> & {
  class?: ClassList
  as?: "a"
}

export default component$(({ href, class: className, ...props }: LinkProps) => {
  const Component = props.as || Link

  return (
    <Component
      href={href}
      class={clsx(
        "link link-primary decoration-primary/20 underline transition-colors ease-in-out",
        className,
      )}
      {...props}
    >
      <Slot />
    </Component>
  )
})
