import { component$, Slot } from "@builder.io/qwik"
import type {
  DocumentHead,
  DocumentMeta,
  RequestHandler,
} from "@builder.io/qwik-city"

//import "@fontsource-variable/inter"
//import "@fontsource-variable/source-serif-4"
//import "@fontsource-variable/source-sans-3"

import Header from "../components/Header"
import Footer from "../components/Footer"

export const head: DocumentHead = ({ head }) => {
  const title = head.title
    ? head.title + " - Nhật Minh"
    : "Nhật Minh - Software & People"
  const defaultMeta: Array<DocumentMeta> = [
    {
      name: "description",
      content:
        "Hey there! I'm all about turning code into something amazing and getting machines to learn new tricks. Let's craft some beautiful and efficient software experiences.",
    },
    { name: "author", content: "Nhật Minh Đinh Huy" },
    {
      name: "keywords",
      content:
        "personal website, portfolio, software engineer, developer, react, javascript, machine learning, artificial intelligence, apps, iOS, app developer",
    },
  ]

  const meta: Array<DocumentMeta> = []

  defaultMeta.forEach((dm) => {
    const index = head.meta.findIndex((m) => m.name === dm.name)
    if (index === -1) {
      meta.push(dm)
    }
  })

  return {
    title,
    meta,
  }
}

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  })
}

export default component$(() => {
  return (
    <>
      <div class="flex w-full">
        <div class="fixed inset-0 flex justify-center">
          <div class="flex w-full">
            <div class="-z-30 w-full ring-1 ring-zinc-100 dark:ring-zinc-300/20">
              <svg
                class="fixed inset-0 -z-30 h-full w-full stroke-zinc-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] dark:stroke-white/10"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
                    width="200"
                    height="200"
                    x="50%"
                    y="-1"
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M.5 200V.5H200" fill="none" />
                  </pattern>
                </defs>
                <svg
                  x="50%"
                  y="-1"
                  class="overflow-visible fill-none dark:fill-zinc-800/20"
                >
                  <path
                    d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                    stroke-width="0"
                  />
                </svg>
                <rect
                  width="100%"
                  height="100%"
                  stroke-width="0"
                  fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)"
                />
              </svg>
              <div
                class="fixed left-[calc(50%-4rem)] top-10 -z-30 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
                aria-hidden="true"
              >
                <div
                  class="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-accent/20 to-accent opacity-10"
                  style="clip-path: polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)"
                ></div>
              </div>
              <div
                class="fixed bottom-10 right-[calc(50%-4rem)] -z-30 -scale-100 transform-gpu blur-3xl sm:right-[calc(50%-18rem)] lg:bottom-[calc(50%-30rem)] lg:right-48 xl:right-[calc(50%-24rem)]"
                aria-hidden="true"
              >
                <div
                  class="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-accent/20 to-accent opacity-10"
                  style="clip-path: polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div class="relative flex w-full flex-col">
          <Header />
          <main class="flex-auto">
            <Slot />
          </main>
          <Footer />
        </div>
      </div>
    </>
  )
})
