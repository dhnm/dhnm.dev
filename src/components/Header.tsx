import { Link, useLocation } from "@builder.io/qwik-city"
import clsx from "clsx"

import Container from "./Container"
import type { CSSProperties } from "@builder.io/qwik"
import {
  component$,
  //Slot,
  type PropsOf,
  useSignal,
  //$,
  useVisibleTask$,
  useComputed$,
} from "@builder.io/qwik"

import AvatarImage from "../media/avatar.jpg?jsx"
//import { ChevronDownIcon, CloseIcon } from "./icons";

/* const MobileNavItem = component$(({ href }: { href: string }) => {
  return (
    <li>
      <Link href={href} class="block py-2">
        <Slot />
      </Link>
    </li>
  );
});

const MobileNavigation = component$((props: PropsOf<"div">) => {
  const menuRef = useSignal<HTMLDialogElement | undefined>();

  const openMenu = $(() => {
    menuRef.value?.showModal();
  });

  return (
    <>
      <div {...props}>
        <button
          class="group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-stone-800 shadow-lg shadow-stone-800/5 ring-1 ring-stone-900/5 backdrop-blur dark:bg-stone-800/90 dark:text-stone-200 dark:ring-white/10 dark:hover:ring-white/20"
          onClick$={openMenu}
        >
          Menu
          <ChevronDownIcon class="ml-3 h-auto w-2 stroke-stone-500 group-hover:stroke-stone-700 dark:group-hover:stroke-stone-400" />
        </button>
        <dialog ref={menuRef} class="modal modal-top">
          <form method="dialog" class="modal-backdrop">
            <button class="fixed inset-0 z-50 bg-stone-800/40 backdrop-blur-sm dark:bg-black/80">
              close
            </button>
          </form>
          <div class="modal-box fixed inset-x-4 top-8 z-50 w-auto origin-top rounded-3xl bg-white p-8 ring-1 ring-stone-900/5 dark:bg-stone-900 dark:ring-stone-800">
            <div class="flex flex-row-reverse items-center justify-between">
              <form method="dialog">
                <button aria-label="Close menu" class="-m-1 p-1">
                  <CloseIcon class="h-6 w-6 text-stone-500 dark:text-stone-400" />
                </button>
              </form>
              <h2
                class="text-sm font-medium text-stone-600 dark:text-stone-400"
                id="here"
              >
                Menu
              </h2>
            </div>
            <nav class="mt-6">
              <ul class="-my-2 divide-y divide-stone-100 text-base text-stone-800 dark:divide-stone-100/5 dark:text-stone-300">
                <MobileNavItem href="/">Home</MobileNavItem>
                <MobileNavItem href="/about">About</MobileNavItem>
                <MobileNavItem href="/articles">Articles</MobileNavItem>
                <MobileNavItem href="/projects">Projects</MobileNavItem>
                <MobileNavItem href="/speaking">Speaking</MobileNavItem>
                <MobileNavItem href="/uses">Uses</MobileNavItem>
              </ul>
            </nav>
          </div>
        </dialog>
      </div>
    </>
  );
});

const NavItem = component$(({ href }: { href: string }) => {
  const isActive = useLocation().url.pathname === href;

  return (
    <li>
      <Link
        href={href}
        class={clsx(
          "relative block px-3 py-2 transition",
          isActive
            ? "text-congress-500 dark:text-congress-400"
            : "hover:text-congress-500 dark:hover:text-congress-400",
        )}
      >
        <Slot />
        {isActive && (
          <span class="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-congress-500/0 via-congress-500/40 to-congress-500/0 dark:from-congress-400/0 dark:via-congress-400/40 dark:to-congress-400/0" />
        )}
      </Link>
    </li>
  );
});

function DesktopNavigation(props: PropsOf<"nav">) {
  return (
    <nav {...props}>
      <ul class="flex rounded-full bg-white/90 px-3 text-sm font-medium text-stone-800 shadow-lg shadow-stone-800/5 ring-1 ring-stone-900/5 backdrop-blur dark:bg-stone-800/90 dark:text-stone-200 dark:ring-white/10">
        <NavItem href="/">Home</NavItem>
        <NavItem href="/about">About</NavItem>
        <NavItem href="/articles">Articles</NavItem>
        <NavItem href="/projects">Projects</NavItem>
        <NavItem href="/speaking">Speaking</NavItem>
        <NavItem href="/uses">Uses</NavItem>
      </ul>
    </nav>
  );
} */

function clamp(number: number, a: number, b: number) {
  const min = Math.min(a, b)
  const max = Math.max(a, b)
  return Math.min(Math.max(number, min), max)
}

function AvatarContainer({ class: className, ...props }: PropsOf<"div">) {
  return (
    <div
      class={clsx(
        className,
        "h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-stone-800/5 ring-1 ring-stone-900/5 backdrop-blur dark:bg-stone-800/90 dark:ring-white/10",
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
        alt=""
        class={clsx(
          "rounded-full bg-stone-100 object-cover dark:bg-stone-800",
          large ? "h-16 w-16" : "h-9 w-9",
        )}
      />
    </Link>
  )
}

export default component$(() => {
  const location = useLocation()
  const isHomePage = useComputed$(() => location.url.pathname === "/")

  const headerRef = useSignal<HTMLElement | undefined>()
  const avatarRef = useSignal<HTMLElement | undefined>()
  const isInitial = useSignal(true)

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track, cleanup }) => {
    track(isHomePage)

    const downDelay = avatarRef.value?.offsetTop ?? 0
    const upDelay = 64

    function setProperty(property: string, value: string) {
      document.documentElement.style.setProperty(property, value)
    }

    function removeProperty(property: string) {
      document.documentElement.style.removeProperty(property)
    }

    function updateHeaderStyles() {
      if (!headerRef.value) {
        return
      }

      const { top, height } = headerRef.value.getBoundingClientRect()
      const scrollY = clamp(
        window.scrollY,
        0,
        document.body.scrollHeight - window.innerHeight,
      )

      if (isInitial.value) {
        setProperty("--header-position", "sticky")
      }

      setProperty("--content-offset", `${downDelay}px`)

      if (isInitial.value || scrollY < downDelay) {
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
        setProperty("--header-top", "0px")
        setProperty("--avatar-top", "0px")
      }
    }

    function updateAvatarStyles() {
      if (!isHomePage.value) {
        return
      }

      const fromScale = 1
      const toScale = 36 / 64
      const fromX = 0
      const toX = 2 / 16

      const scrollY = downDelay - window.scrollY

      let scale = (scrollY * (fromScale - toScale)) / downDelay + toScale
      scale = clamp(scale, fromScale, toScale)

      let x = (scrollY * (fromX - toX)) / downDelay + toX
      x = clamp(x, fromX, toX)

      setProperty(
        "--avatar-image-transform",
        `translate3d(${x}rem, 0, 0) scale(${scale})`,
      )

      const borderScale = 1 / (toScale / scale)
      const borderX = (-toX + x) * borderScale
      const borderTransform = `translate3d(${borderX}rem, 0, 0) scale(${borderScale})`

      setProperty("--avatar-border-transform", borderTransform)
      setProperty("--avatar-border-opacity", scale === toScale ? "1" : "0")
    }

    function updateStyles() {
      updateHeaderStyles()
      updateAvatarStyles()
      isInitial.value = false
    }

    function throttleRAF<T extends (...args: any[]) => any>(
      func: T,
    ): (...args: Parameters<T>) => void {
      let waiting = false // Initially, not waiting for anything
      return function (
        this: ThisParameterType<T>,
        ...args: Parameters<T>
      ): void {
        if (!waiting) {
          // If not already waiting, request a frame
          requestAnimationFrame(() => {
            func.apply(this, args) // Execute the function in the next frame
            waiting = false // Reset waiting status
          })
          waiting = true // Set waiting status to prevent multiple calls
        }
      }
    }

    updateStyles()

    const throttledUpdateStyles = throttleRAF(updateStyles)

    window.addEventListener("scroll", throttledUpdateStyles, {
      passive: true,
    })
    window.addEventListener("resize", throttledUpdateStyles)

    cleanup(() => {
      window.removeEventListener("scroll", throttledUpdateStyles)
      window.removeEventListener("resize", throttledUpdateStyles)
    })
  })

  return (
    <>
      <header
        class="pointer-events-none relative z-50 flex flex-none flex-col"
        style={{
          height: "var(--header-height)",
          marginBottom: "var(--header-mb)",
        }}
      >
        {isHomePage.value && (
          <>
            <div
              ref={avatarRef}
              class="order-last mt-[calc(theme(spacing.16)-theme(spacing.3))]"
            />
            <Container
              class="top-0 order-last -mb-3 pt-3"
              style={{
                position: "var(--header-position)" as CSSProperties["position"],
              }}
            >
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
          </>
        )}
        <div
          ref={headerRef}
          class="top-0 z-10 h-16 pt-6"
          style={{
            position: "var(--header-position)" as CSSProperties["position"],
          }}
        >
          <Container
            class="top-[var(--header-top,theme(spacing.6))] w-full"
            style={{
              position:
                "var(--header-inner-position)" as CSSProperties["position"],
            }}
          >
            <div class="relative flex gap-4">
              <div class="flex flex-1">
                {!isHomePage.value && (
                  <AvatarContainer>
                    <Avatar />
                  </AvatarContainer>
                )}
              </div>
              <div class="flex flex-1 justify-end md:justify-center">
                {/* <MobileNavigation class="pointer-events-auto md:hidden" />
                <DesktopNavigation class="pointer-events-auto hidden md:block" /> */}
              </div>
              <div class="flex justify-end md:flex-1"></div>
            </div>
          </Container>
        </div>
      </header>
      {isHomePage.value && (
        <div class="flex-none" style={{ height: "var(--content-offset)" }} />
      )}
    </>
  )
})
