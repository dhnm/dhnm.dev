import { /*Slot,*/ component$ } from "@builder.io/qwik"
// import { Link } from "@builder.io/qwik-city";

import { ContainerInner, ContainerOuter } from "./Container"

/* const NavLink = component$(({ href }: { href: string }) => {
  return (
    <Link
      href={href}
      class="transition hover:text-congress-500 dark:hover:text-congress-400"
    >
      <Slot />
    </Link>
  );
}); */

export default component$(() => {
  return (
    <footer class="mt-32 flex-none">
      <ContainerOuter>
        <div class="border-t border-zinc-100 py-10 dark:border-zinc-700/40">
          <ContainerInner>
            <div class="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div class="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                {/* <NavLink href="/about">About</NavLink>
                <NavLink href="/projects">Projects</NavLink>
                <NavLink href="/speaking">Speaking</NavLink>
                <NavLink href="/uses">Uses</NavLink> */}
              </div>
              <p class="text-sm text-zinc-500 dark:text-zinc-400">
                &copy; {new Date().getFullYear()} Nhật Minh Đinh Huy. All rights
                reserved.
              </p>
            </div>
          </ContainerInner>
        </div>
      </ContainerOuter>
    </footer>
  )
})
