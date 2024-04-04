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
          "text-congress-800 underline decoration-congress-800/20 transition-colors ease-in-out hover:text-congress-900 hover:decoration-congress-900 active:opacity-80 dark:text-congress-600 dark:decoration-congress-600/20 dark:hover:text-congress-500 dark:hover:decoration-congress-500",
          className,
        )}
        {...props}
      >
        <Slot />
      </Component>
    )
  },
)
