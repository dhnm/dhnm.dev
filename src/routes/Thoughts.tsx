import { component$ } from "@builder.io/qwik"
import clsx from "clsx"
import Container from "~/components/Container"

import { ChevronDownIcon, ChevronRightIcon } from "~/components/icons"

type Article = {
  title: string
  perex: string
  coverUrl: string
  url: string
}

const articles: Article[] = [
  {
    title: "Suite of Analytical Apps and Tools for vain.zone",
    perex:
      "Developed a comprehensive analytical website, integrating complex database structures & aggregations, chatbots, third-party extensions, real-time collaboration features, and caching and performance optimization strategies to align with resource constraints.",
    coverUrl:
      "https://cdn.hashnode.com/res/hashnode/image/upload/v1716822104269/721e2cfb-20b8-4095-b25a-52c33030ca3c.webp?auto=compress,format&format=webp",
    url: "#1",
  },
  {
    title: "Native Mobile App for PORGMUN Conference",
    perex:
      "Created an iOS app to facilitate Model United Nations conferences, featuring real-time and location-based updates and interactive tools for participants. Maintained and evolved the app for the successive conference editions.",
    coverUrl:
      "https://cdn.hashnode.com/res/hashnode/image/upload/v1716822452915/befb1775-7e46-4f63-a422-172636257feb.webp?auto=compress,format&format=webp",
    url: "#2",
  },
  {
    title: "Website for Sítko Festival",
    perex:
      "Designed and developed a responsive website for a university drama festival, featuring brand-aligned animations and optimized image serving for various screen types. Managed the site from inception to post-festival, reflecting changing requirements at each stage.",
    coverUrl:
      "https://cdn.hashnode.com/res/hashnode/image/upload/v1716822756825/5ec4a48c-8268-4ba9-b6b8-59276db34fb5.webp?auto=compress,format&format=webp",
    url: "#3",
  },
  {
    title: "Website for Sítko Festivall",
    perex:
      "Designed and developed a responsive website for a university drama festival, featuring brand-aligned animations and optimized image serving for various screen types. Managed the site from inception to post-festival, reflecting changing requirements at each stage.",
    coverUrl:
      "https://cdn.hashnode.com/res/hashnode/image/upload/v1716822756825/5ec4a48c-8268-4ba9-b6b8-59276db34fb5.webp?auto=compress,format&format=webp",
    url: "#4",
  },
  {
    title: "Suite of Analytical Apps and Tools for vain.zone",
    perex:
      "Developed a comprehensive analytical website, integrating complex database structures & aggregations, chatbots, third-party extensions, real-time collaboration features, and caching and performance optimization strategies to align with resource constraints.",
    coverUrl:
      "https://cdn.hashnode.com/res/hashnode/image/upload/v1716822104269/721e2cfb-20b8-4095-b25a-52c33030ca3c.webp?auto=compress,format&format=webp",
    url: "#5",
  },
]

export default component$(() => (
  <Container class="mt-16 sm:mt-36">
    <h1 class="mb-6 md:mb-16">Thoughts</h1>
    <ul class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-2 md:gap-3 lg:gap-4">
      {articles.map((a, i) => (
        <li key={a.url} class={clsx(i === 0 && "row-span-2 lg:row-span-3")}>
          <a
            href="#"
            class="card h-full w-full transform-gpu border-base-200 bg-base-100 shadow-xl transition-transform duration-300 ease-in-out hover:scale-[1.01]"
          >
            {i === 0 && (
              <figure>
                <img
                  width="540"
                  height="270"
                  src={a.coverUrl}
                  alt=""
                  class="aspect-video w-full object-cover"
                />
              </figure>
            )}
            <div class="card-body w-full flex-row gap-0 p-2 sm:p-3 md:p-4">
              {i !== 0 && (
                <img
                  width="270"
                  height="270"
                  src={a.coverUrl}
                  alt=""
                  class="mb-3 mr-2 aspect-square w-1/5 rounded-xl object-cover sm:mb-0 sm:mr-3 sm:w-2/5 md:mr-4 lg:w-1/4"
                />
              )}
              <div class="flex w-full flex-col justify-between">
                <div>
                  <h2
                    class={clsx(
                      "card-title mb-2",
                      i === 0 ? "text-xl sm:text-2xl" : "text-lg sm:text-xl",
                    )}
                  >
                    {a.title}
                  </h2>
                  {i === 0 && <p class="mt-2">{a.perex}</p>}
                </div>
                <div class="card-actions justify-end">
                  <button class="btn btn-outline btn-sm">
                    Read <ChevronRightIcon class="-mx-1 h-4 w-4 fill-current" />
                  </button>
                </div>
              </div>
            </div>
          </a>
        </li>
      ))}
    </ul>
    <div class="mt-6 flex justify-center">
      <button class="btn btn-primary">
        More Articles <ChevronDownIcon class="h-4 w-4 fill-current" />
      </button>
    </div>
  </Container>
))
