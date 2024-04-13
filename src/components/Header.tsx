import { Link, useLocation } from "@builder.io/qwik-city"
import clsx from "clsx"

import Container from "./Container"
import type { CSSProperties } from "@builder.io/qwik"
import { component$, type PropsOf, useComputed$ } from "@builder.io/qwik"

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
          class="group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20"
          onClick$={openMenu}
        >
          Menu
          <ChevronDownIcon class="ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400" />
        </button>
        <dialog ref={menuRef} class="modal modal-top">
          <form method="dialog" class="modal-backdrop">
            <button class="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-sm dark:bg-black/80">
              close
            </button>
          </form>
          <div class="modal-box fixed inset-x-4 top-8 z-50 w-auto origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-zinc-800">
            <div class="flex flex-row-reverse items-center justify-between">
              <form method="dialog">
                <button aria-label="Close menu" class="-m-1 p-1">
                  <CloseIcon class="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
                </button>
              </form>
              <h2
                class="text-sm font-medium text-zinc-600 dark:text-zinc-400"
                id="here"
              >
                Menu
              </h2>
            </div>
            <nav class="mt-6">
              <ul class="-my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300">
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
      <ul class="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
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
        style={{
          width: large ? "4rem" : "2.25rem",
          height: large ? "4rem" : "2.25rem",
        }}
      />
    </Link>
  )
}

export default component$(() => {
  const location = useLocation()
  const isHomePage = useComputed$(() => location.url.pathname === "/")

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
            <div class="order-last mt-[calc(theme(spacing.16)-theme(spacing.3))]" />
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
