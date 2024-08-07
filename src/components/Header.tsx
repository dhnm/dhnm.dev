import { Slot, useSignal, $, useOnWindow } from "@builder.io/qwik"
import { Link } from "@builder.io/qwik-city"
import clsx from "clsx"

import type { CSSProperties } from "@builder.io/qwik"
import { type PropsOf, component$ } from "@builder.io/qwik"
import Container from "./Container"

import AvatarImage from "../media/avatar.webp?jsx"
import { ChevronDownIcon, CloseIcon } from "./icons"

const menuItems = [
  { selector: "#top", title: "Home" },
  { selector: "#about", title: "About" },
  { selector: "#projects", title: "Projects" },
]

const MobileNavItem = component$((props: PropsOf<"button">) => (
  <li>
    <button class="block py-2" {...props}>
      <Slot />
    </button>
  </li>
))

const scrollToSelector = (selector: string) => {
  const element = document.querySelector(selector) as HTMLElement
  const yOffset = -30
  const elPos = element.getBoundingClientRect().top + window.scrollY + yOffset
  window.scrollTo({ top: elPos, behavior: "smooth" })
}

const MobileNavigation = component$((props: PropsOf<"div">) => {
  const menuRef = useSignal<HTMLDialogElement | undefined>()

  const openMenu = $(() => {
    menuRef.value?.showModal()
    menuRef.value?.show
  })

  return (
    <>
      <div {...props}>
        <button
          class="group flex items-center rounded-full bg-base-100/60 px-4 py-2 text-sm font-medium shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-md dark:ring-white/10 dark:hover:ring-white/20"
          onClick$={openMenu}
        >
          Menu
          <ChevronDownIcon class="ml-3 h-auto w-2 fill-zinc-500 stroke-zinc-500 group-hover:fill-zinc-700 group-hover:stroke-zinc-700 dark:group-hover:fill-zinc-400 dark:group-hover:stroke-zinc-400" />
        </button>
        <dialog ref={menuRef} class="modal modal-top">
          <form method="dialog" class="modal-backdrop">
            <button class="fixed inset-0 z-50 bg-base-300/40 backdrop-blur-sm dark:bg-base-300/80">
              close
            </button>
          </form>
          <div class="modal-box fixed inset-x-4 top-8 z-50 w-auto origin-top rounded-3xl bg-base-100 p-8 ring-1 ring-base-100/5">
            <div class="flex flex-row-reverse items-center justify-between">
              <form method="dialog">
                <button aria-label="Close menu" class="-m-1 p-1">
                  <CloseIcon class="h-6 w-6 fill-zinc-500 dark:fill-zinc-400" />
                </button>
              </form>
              <div class="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Menu
              </div>
            </div>
            <nav class="mt-6">
              <ul class="-my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300">
                {menuItems.map((item) => (
                  <MobileNavItem
                    key={item.title}
                    onClick$={() => {
                      scrollToSelector(item.selector)
                      menuRef.value?.close()
                    }}
                  >
                    {item.title}
                  </MobileNavItem>
                ))}
              </ul>
            </nav>
          </div>
        </dialog>
      </div>
    </>
  )
})

const NavItem = component$((props: PropsOf<"button">) => {
  return (
    <li>
      <button
        class="group relative block px-3 py-2 transition hover:text-primary"
        {...props}
      >
        <Slot />
        <span class="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 opacity-0 group-hover:opacity-100" />
      </button>
    </li>
  )
})

function DesktopNavigation(props: PropsOf<"nav">) {
  return (
    <nav {...props}>
      <ul class="flex rounded-box bg-base-100/70 px-3 text-sm font-medium shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-lg dark:ring-white/10">
        {menuItems.map((item) => (
          <NavItem
            key={item.title}
            data-key={item.title}
            onClick$={() => scrollToSelector(item.selector)}
          >
            {item.title}
          </NavItem>
        ))}
      </ul>
    </nav>
  )
}

function AvatarContainer({ class: className, ...props }: PropsOf<"div">) {
  return (
    <div
      class={clsx(
        className,
        "h-10 w-10 rounded-full bg-base-100/90 p-0.5 shadow-lg shadow-base-content/5 ring-1 ring-base-content/5 backdrop-blur",
      )}
      {...props}
    />
  )
}

function Avatar({
  large = false,
  class: className,
  ...props
}: Omit<PropsOf<typeof Link>, "href"> & {
  large?: boolean
}) {
  return (
    <Link
      href="/"
      aria-label="Home"
      class={clsx(className, "pointer-events-auto")}
      {...props}
    >
      <AvatarImage
        alt="Picture of me"
        class={clsx(
          "rounded-full bg-base-100 object-cover",
          large ? "h-16 w-16" : "h-9 w-9",
        )}
      />
    </Link>
  )
}

const clamp = (value: number, a: number, b: number) => {
  const min = Math.min(a, b)
  const max = Math.max(a, b)
  return Math.min(Math.max(value, min), max)
}

const setProperty = (property: string, value: string) => {
  document.documentElement.style.setProperty(property, value)
}
const removeProperty = (property: string) => {
  document.documentElement.style.removeProperty(property)
}

export default component$(() => {
  const avatarRef = useSignal<HTMLDivElement>()
  const headerRef = useSignal<HTMLDivElement>()
  const isInitial = useSignal(true)

  const upDelay = 64

  const updateStyles = $(() => {
    if (!headerRef.value || !avatarRef.value) return
    const downDelay = avatarRef.value.offsetTop

    // Update Header Styles

    const { top, height } = headerRef.value.getBoundingClientRect()

    let scrollY = clamp(
      window.scrollY,
      0,
      document.body.scrollHeight - window.innerHeight,
    )

    setProperty("--content-offset", `${downDelay}px`)

    if (isInitial.value || scrollY < downDelay) {
      isInitial.value = false
      setProperty("--header-height", `${downDelay + height}px`)
      setProperty("--header-mb", `${-downDelay}px`)
    } else if (top + height < -upDelay) {
      const offset = Math.max(height, scrollY - upDelay)
      setProperty("--header-height", `${offset}px`)
      setProperty("--header-mb", `${height - offset}px`)
    } else if (top === 0) {
      setProperty("--header-height", `${scrollY + height}px`)
      setProperty("--header-mb", `${-scrollY}px`)
    }

    if (top === 0 && scrollY > 0 && scrollY >= downDelay) {
      setProperty("--header-inner-position", "fixed")
      removeProperty("--header-top")
      removeProperty("--avatar-top")
    } else {
      removeProperty("--header-inner-position")
      setProperty("--header-top", "0")
      setProperty("--avatar-top", "0")
    }

    // Update Avatar Styles
    const fromScale = 1
    const toScale = 36 / 64
    const fromX = 0
    const toX = 2 / 16

    scrollY = downDelay - window.scrollY

    const scale = clamp(
      (scrollY * (fromScale - toScale)) / downDelay + toScale,
      fromScale,
      toScale,
    )
    const x = clamp((scrollY * (fromX - toX)) / downDelay + toX, fromX, toX)

    setProperty(
      "--avatar-image-transform",
      `translate3d(${x}rem,0,0) scale(${scale})`,
    )

    const borderScale = 1 / (toScale / scale)
    const borderX = (-toX + x) * borderScale
    const borderTransform = `translate3d(${borderX}rem,0,0) scale(${borderScale})`

    setProperty("--avatar-border-transform", borderTransform)
    setProperty("--avatar-border-opacity", scale === toScale ? "1" : "0")

    // Update Active Menu Item
    menuItems.forEach((item) => {
      const section = document.querySelector(item.selector) as HTMLElement
      const button = document.querySelector(
        `button[data-key="${item.title}"]`,
      ) as HTMLElement
      const buttonSpan = button.querySelector("span") as HTMLElement
      const top = section.offsetTop - 80
      const height = section.clientHeight + 40
      const bottom = top + height
      if (window.scrollY >= top && window.scrollY < bottom) {
        button.classList.add("!text-primary")
        buttonSpan.classList.add("!opacity-100")
      } else {
        button.classList.remove("!text-primary")
        buttonSpan.classList.remove("!opacity-100")
      }
    })
  })

  useOnWindow(
    "load",
    $(() => {
      updateStyles()
    }),
  )

  useOnWindow("scroll", updateStyles)
  useOnWindow("resize", updateStyles)

  return (
    <>
      <span id="top" class="absolute h-96 w-full" />
      <header
        id="header"
        class="pointer-events-none relative z-50 flex flex-none flex-col"
        style={{
          height: "var(--header-height)",
          marginBottom: "var(--header-mb)",
        }}
      >
        <div
          ref={avatarRef}
          class="order-last mt-[calc(theme(spacing.16)-theme(spacing.3))]"
        />
        <Container class="sticky top-0 order-last -mb-3 pt-3">
          <div
            class="top-[var(--avatar-top,theme(spacing.3))] w-full"
            style={{
              position:
                "var(--header-inner-position)" as CSSProperties["position"],
            }}
          >
            <div class="relative">
              <AvatarContainer
                class="absolute left-0 top-3 origin-left transition-opacity"
                style={{
                  opacity: "var(--avatar-border-opacity, 0)",
                  transform: "var(--avatar-border-transform)",
                }}
              />
              <Avatar
                large
                class="block h-16 w-16 origin-left"
                style={{ transform: "var(--avatar-image-transform)" }}
              />
            </div>
          </div>
        </Container>
        <div ref={headerRef} class="sticky top-0 z-10 h-16 pt-6">
          <Container
            class="top-[var(--header-top,theme(spacing.6))] w-full"
            style={{
              position:
                "var(--header-inner-position)" as CSSProperties["position"],
            }}
          >
            <div class="relative flex justify-end md:justify-center">
              <MobileNavigation class="pointer-events-auto md:hidden" />
              <DesktopNavigation class="pointer-events-auto hidden md:block" />
            </div>
          </Container>
        </div>
      </header>
      <div class="flex-none" style={{ height: "var(--content-offset)" }} />
    </>
  )
})
