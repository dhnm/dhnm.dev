import { component$, Slot } from "@builder.io/qwik"
import { Link } from "@builder.io/qwik-city"
import type { PropsOf } from "@builder.io/qwik"
import clsx from "clsx"

const variantStyles = {
  primary:
    "bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70",
  secondary:
    "bg-zinc-50 font-medium text-zinc-900 hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70",
}

type ButtonProps = { variant?: keyof typeof variantStyles } & (
  | (PropsOf<"button"> & { href?: undefined })
  | PropsOf<typeof Link>
)

export default component$<ButtonProps>(
  ({ variant = "primary", class: className, ...props }) => {
    const cls = clsx(
      "inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none",
      variantStyles[variant],
      className,
    )

    return typeof props.href === "undefined" ? (
      <button class={cls} {...(props as PropsOf<"button">)}>
        <Slot />
      </button>
    ) : (
      <Link class={cls} {...props}>
        <Slot />
      </Link>
    )
  },
)
