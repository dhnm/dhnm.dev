import { Slot, component$ } from "@builder.io/qwik"
import Container from "~/components/Container"
import {
  PlayIcon,
  GitHubIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "~/components/icons"
import clsx from "clsx"

const SecondaryCardLink = component$(({ href }: { href: string }) => (
  <a
    href={href}
    class="btn btn-ghost btn-sm bg-sky-200 hover:bg-sky-300 dark:bg-sky-900 dark:hover:bg-sky-800"
  >
    <Slot />
  </a>
))

type ProjectTags =
  | "TypeScript"
  | "React"
  | "Node.js"
  | "GraphQL"
  | "Deno"
  | "Rust"
  | "Python"
  | "Machine Learning"
  | "Data Analytics"
  | "Web Development"
  | "UI/UX Design"
  | "Product Management"
  | "iOS"
  | "Swift"
  | "Next.js"
  | "Express"
  | "MongoDB"
  | "REST API"
  | "WebSockets"
  | "CI/CD"
  | "UIKit"
  | "Meta Graph API"
  | "Core Location"
  | "SSG"
  | "FTP"

type Project = {
  name: string
  tags: ProjectTags[]
  description: string
  coverUrl: string
  article?: string
  source?: string
  demo?: string
}

const projects: Project[] = [
  {
    name: "Suite of Analytical Apps and Tools for vain.zone",
    tags: [
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "Data Analytics",
      "MongoDB",
      "REST API",
      "WebSockets",
      "CI/CD",
    ],
    description:
      "Developed a comprehensive analytical website, integrating complex database structures & aggregations, chatbots, third-party extensions, real-time collaboration features, and caching and performance optimization strategies to align with resource constraints.",
    coverUrl:
      "https://cdn.hashnode.com/res/hashnode/image/upload/v1716822104269/721e2cfb-20b8-4095-b25a-52c33030ca3c.webp?auto=compress,format&format=webp",
  },
  {
    name: "Native Mobile App for PORGMUN Conference",
    tags: ["iOS", "Swift", "UIKit", "Meta Graph API", "Core Location"],
    description:
      "Created an iOS app to facilitate Model United Nations conferences, featuring real-time and location-based updates and interactive tools for participants. Maintained and evolved the app for the successive conference editions.",
    coverUrl:
      "https://cdn.hashnode.com/res/hashnode/image/upload/v1716822452915/befb1775-7e46-4f63-a422-172636257feb.webp?auto=compress,format&format=webp",
  },
  {
    name: "Website for Sítko Festival",
    tags: ["React", "SSG", "GraphQL", "FTP"],
    description:
      "Designed and developed a responsive website for a university drama festival, featuring brand-aligned animations and optimized image serving for various screen types. Managed the site from inception to post-festival, reflecting changing requirements at each stage.",
    coverUrl:
      "https://cdn.hashnode.com/res/hashnode/image/upload/v1716822756825/5ec4a48c-8268-4ba9-b6b8-59276db34fb5.webp?auto=compress,format&format=webp",
  },
  {
    name: "Website for Sítko Festivall",
    tags: ["React", "SSG", "GraphQL", "FTP"],
    description:
      "Designed and developed a responsive website for a university drama festival, featuring brand-aligned animations and optimized image serving for various screen types. Managed the site from inception to post-festival, reflecting changing requirements at each stage.",
    coverUrl:
      "https://cdn.hashnode.com/res/hashnode/image/upload/v1716822756825/5ec4a48c-8268-4ba9-b6b8-59276db34fb5.webp?auto=compress,format&format=webp",
  },
  {
    name: "Suite of Analytical Apps and Tools for vain.zone",
    tags: [
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "Data Analytics",
      "MongoDB",
      "REST API",
      "WebSockets",
      "CI/CD",
    ],
    description:
      "Developed a comprehensive analytical website, integrating complex database structures & aggregations, chatbots, third-party extensions, real-time collaboration features, and caching and performance optimization strategies to align with resource constraints.",
    coverUrl:
      "https://cdn.hashnode.com/res/hashnode/image/upload/v1716822104269/721e2cfb-20b8-4095-b25a-52c33030ca3c.webp?auto=compress,format&format=webp",
    article: "#",
    source: "#",
    demo: "#",
  },
]

const KeyProjects = component$(() => (
  <Container class="mt-16 sm:mt-36">
    <section id="projects">
      <h1 class="mb-10 md:mb-16">Projects</h1>
      <ul class="grid grid-cols-1 gap-10 lg:grid-cols-4 xl:gap-14">
        {projects.map((p, i) => (
          <li
            key={p.name}
            class={clsx(
              projects.length === i + 1 && (i + 1) % 2 === 1
                ? "lg:col-start-2 lg:col-end-4"
                : "lg:col-span-2",
            )}
          >
            <figure>
              <img
                width="656"
                height="369"
                src={p.coverUrl}
                alt={"Screenshot of the project: " + p.name}
                class="w-11/12 rounded-2xl border border-base-200 shadow-xl"
              />
            </figure>
            <div class="card -mt-[20%] ml-auto w-11/12 border-base-200 bg-base-100 shadow-xl">
              <div class="card-body p-4 lg:p-6 xl:p-8">
                <h2 class="card-title mb-2 text-lg sm:text-xl">{p.name}</h2>
                <ul class="flex flex-wrap gap-1">
                  {p.tags.map((tag) => (
                    <li class="badge badge-info badge-outline" key={tag}>
                      {tag}
                    </li>
                  ))}
                </ul>
                <p class="mt-2">{p.description}</p>
                <div
                  class={clsx(
                    (p.demo || p.source || p.article) &&
                      "card-actions mt-3 justify-end",
                  )}
                >
                  {p.demo && (
                    <SecondaryCardLink href={p.demo}>
                      <PlayIcon class="h-4 w-4 fill-current" /> Demo
                    </SecondaryCardLink>
                  )}
                  {p.source && (
                    <SecondaryCardLink href={p.source}>
                      <GitHubIcon class="h-4 w-4 fill-current" /> Code
                    </SecondaryCardLink>
                  )}
                  {p.article && (
                    <a href={p.article} class="btn btn-outline btn-sm">
                      Read{" "}
                      <ChevronRightIcon class="-mx-1 h-4 w-4 fill-current" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  </Container>
))

const Explorations = component$(() => (
  <Container class="mt-16 sm:mt-36">
    <section id="personal_projects">
      <h1 class="mb-6 md:mb-16">Personal Projects</h1>
      <ul class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-2">
        {projects.map((p) => (
          <li key={p.name}>
            <div class="card border-base-200 bg-base-100 shadow-xl">
              <div class="card-body inline p-2 sm:p-3 md:p-4">
                <img
                  width="304"
                  height="171"
                  src={p.coverUrl}
                  alt={"Screenshot of the project: " + p.name}
                  class="relative float-left mb-3 mr-3 w-5/12 rounded-xl"
                />
                <h3 class="text-md card-title mb-2 sm:text-lg">{p.name}</h3>
                <ul class="inline">
                  {p.tags.map((tag) => (
                    <li class="badge badge-info badge-outline mr-1" key={tag}>
                      {tag}
                    </li>
                  ))}
                </ul>
                <p class="mt-2">{p.description}</p>
                <div
                  class={clsx(
                    (p.demo || p.source || p.article) &&
                      "card-actions mt-3 justify-end",
                  )}
                >
                  {p.demo && (
                    <SecondaryCardLink href={p.demo}>
                      <PlayIcon class="h-4 w-4 fill-current" /> Demo
                    </SecondaryCardLink>
                  )}
                  {p.source && (
                    <SecondaryCardLink href={p.source}>
                      <GitHubIcon class="h-4 w-4 fill-current" /> Code
                    </SecondaryCardLink>
                  )}
                  {p.article && (
                    <a href={p.article} class="btn btn-outline btn-sm">
                      Read{" "}
                      <ChevronRightIcon class="-mx-1 h-4 w-4 fill-current" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div class="mt-6 flex justify-center">
        <button class="btn btn-primary">
          More Projects <ChevronDownIcon class="h-4 w-4 fill-current" />
        </button>
      </div>
    </section>
  </Container>
))

export default component$(() => (
  <>
    <KeyProjects />
    <Explorations />
  </>
))
