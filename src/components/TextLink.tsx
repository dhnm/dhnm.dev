import type { PropsOf, Signal, ClassList } from "@builder.io/qwik"
import { component$, Slot } from "@builder.io/qwik"
import { Link } from "@builder.io/qwik-city"
import clsx from "clsx"

type LinkProps = PropsOf<"a"> & {
  ref?: Signal<Element | undefined>
  class?: ClassList
  as?: "a"
}

export default component$(
  ({ href, ref, class: className, ...props }: LinkProps) => {
    const Component = props.as || Link

    return (
      <Component
        ref={ref}
        href={href}
        class={clsx(
          "link link-primary underline decoration-primary/20 transition-colors ease-in-out",
          className,
        )}
        {...props}
      >
        <Slot />
      </Component>
    )
  },
)
