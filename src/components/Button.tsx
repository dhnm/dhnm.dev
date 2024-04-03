import { component$, Slot } from "@builder.io/qwik"
import { Link } from "@builder.io/qwik-city"
import type { PropsOf } from "@builder.io/qwik"
import clsx from "clsx"

const variantStyles = {
  primary:
    "active:text-zinc-100/85 bg-congress-800 font-semibold text-congress-100 text-zinc-100 hover:bg-congress-900 hover:bg-zinc-700 active:bg-congress-800 dark:bg-congress-600 dark:text-congress-900 dark:hover:bg-congress-500 dark:active:bg-congress-600 dark:active:text-congress-900",
  secondary:
    "border-1 border border-congress-800 bg-zinc-200/20 font-medium text-congress-800 hover:border-congress-900 hover:text-congress-900 active:border-congress-800 active:text-congress-800 dark:border-congress-600 dark:bg-zinc-800/20 dark:text-congress-600 dark:hover:border-congress-500 dark:hover:bg-zinc-800/20 dark:hover:text-congress-500 dark:active:border-congress-600 dark:active:bg-zinc-800/20 dark:active:text-congress-600",
}

type ButtonProps = { variant?: keyof typeof variantStyles } & (
  | (PropsOf<"button"> & { href?: undefined })
  | PropsOf<typeof Link>
)

export default component$<ButtonProps>(
  ({ variant = "primary", class: className, ...props }) => {
    const cls = clsx(
      "inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none disabled:cursor-not-allowed disabled:opacity-50",
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
