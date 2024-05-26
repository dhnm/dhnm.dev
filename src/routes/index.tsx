import { Slot, component$ } from "@builder.io/qwik"

import Container from "~/components/Container"
import {
  DocumentIcon,
  GitHubIcon,
  LinkedInIcon,
  PlayIcon,
} from "~/components/icons"
import ContactForm from "./ContactForm"
import clsx from "clsx"

const OpenToWorkIndicator = () => (
  <div class="flex items-center gap-2">
    {/* Diode - Green Circle */}
    <span
      class="h-3 w-3 rounded-full bg-[radial-gradient(circle,#00ff00_15%,#17a443_85%)] shadow-[0_0_2px_2px_#00ff0060,0_0_4px_4px_#00ff0020]"
      aria-hidden="true"
    ></span>
    <span class="uppercase text-success">Open to work (UK or Remote)</span>
  </div>
)

export const FrontPageSecondaryButton = component$(
  ({ href }: { href: string }) => {
    return (
      <a href={href} target="_blank" class="btn btn-primary">
        <Slot />
      </a>
    )
  },
)

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
  slug?: string
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
    slug: "vainzone",
    demo: "#",
    source: "#",
  },
  {
    name: "Native Mobile App for PORGMUN Conference",
    tags: ["iOS", "Swift", "UIKit", "Meta Graph API", "Core Location"],
    description:
      "Created an iOS app to facilitate Model United Nations conferences, featuring real-time and location-based updates and interactive tools for participants. Maintained and evolved the app for the successive conference editions.",
    slug: "porgmun",
    demo: "#",
    source: "#",
  },
  {
    name: "Website for Sítko Festival",
    tags: ["React", "SSG", "GraphQL", "FTP"],
    description:
      "Designed and developed a responsive website for a university drama festival, featuring brand-aligned animations and optimized image serving for various screen types. Managed the site from inception to post-festival, reflecting changing requirements at each stage.",
    slug: "sitko",
    demo: "#",
    source: "#",
  },
]

const Projects = component$(() => (
  <Container class="mt-16 sm:mt-36">
    <section id="projects" class="relative">
      <h1 class="relative mb-10 md:mb-16">Projects</h1>
      <ul class="flex flex-wrap gap-12 md:gap-20">
        {projects.map((p) => (
          <li key={p.name} class="m-auto box-border md:max-w-[45%]">
            <img
              width="1200"
              height="800"
              src="https://unsplash.it/1200/800"
              alt="Placeholder"
              class="w-11/12 rounded-2xl border border-base-200 shadow-xl"
            />
            <div class="card -mt-[22%] ml-auto w-10/12 border-base-200 bg-base-100 shadow-xl">
              <div class="card-body">
                <h2 class="card-title mb-2 text-lg sm:text-xl">{p.name}</h2>
                <ul class="flex flex-wrap gap-1">
                  {p.tags.map((tag) => (
                    <li
                      class="badge badge-info badge-outline badge-sm"
                      key={tag}
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                <p class="mt-2">{p.description}</p>
                <div class="card-actions mt-3 justify-end">
                  {p.demo && (
                    <a href={p.demo} class="btn btn-ghost btn-sm">
                      <PlayIcon class="h-4 w-4 fill-current" /> Demo
                    </a>
                  )}
                  {p.source && (
                    <a href={p.source} class="btn btn-ghost btn-sm">
                      <GitHubIcon class="h-4 w-4 fill-current" /> Code
                    </a>
                  )}
                  {p.slug && (
                    <a href={p.slug} class="btn btn-outline btn-sm">
                      Read More
                    </a>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
    <section id="personal_projects">
      <h1 class="mb-6 mt-16 sm:mt-36">Personal Projects</h1>
      <p>List of personal projects</p>
    </section>
  </Container>
))

export default component$(() => (
  <>
    <Container class="mt-9">
      <h1 class="mb-9 max-w-lg text-4xl !leading-normal md:my-36 md:max-w-3xl md:text-5xl lg:text-5xl xl:text-6xl">
        I Love Building Cool Stuff & Exploring What’s&nbsp;Next in Tech
      </h1>
      <div class="mx-auto flex max-w-xl flex-col items-center gap-y-10 lg:max-w-none lg:flex-row">
        <div class="max-w-2xl">
          <OpenToWorkIndicator />
          <div class="mt-9 flex flex-wrap gap-2">
            <FrontPageSecondaryButton href="/Nhat_Minh_CV.pdf">
              CV (Resume)
              <DocumentIcon class="h-4 w-4 fill-current" />
            </FrontPageSecondaryButton>
            <FrontPageSecondaryButton href="https://github.com/dhnm">
              GitHub
              <GitHubIcon class="h-4 w-4 fill-current" />
            </FrontPageSecondaryButton>
            <FrontPageSecondaryButton href="https://linkedin.com/in/dhnm">
              LinkedIn
              <LinkedInIcon class="h-4 w-4 fill-current" />
            </FrontPageSecondaryButton>
          </div>
          <div class="prose mt-9 text-base-content">
            <p>
              Hey there! I'm all about{" "}
              <span class="font-extrabold">
                turning code into something amazing
              </span>{" "}
              and{" "}
              <span class="font-extrabold">
                getting machines to learn new tricks
              </span>
              .
            </p>
            <p>
              You might also catch me at a{" "}
              <span class="font-extrabold">film festival</span>, geeking out
              over something like the mysteries of{" "}
              <span class="font-extrabold">quantum physics</span>, or plotting
              to win at <span class="font-extrabold">pickleball</span>.
            </p>
            <p>
              Do you have an interesting{" "}
              <span class="font-extrabold">challenge</span> or want to talk{" "}
              <span class="font-extrabold">tech</span>,{" "}
              <span class="font-extrabold">design</span>, or anything under the
              sun? <span class="font-extrabold">Let's chat!</span>
            </p>
          </div>
        </div>
        <div class="space-y-10 lg:pl-16 lg:pt-8 xl:pl-24">
          <ContactForm />
        </div>
      </div>
    </Container>
    <Projects />
  </>
))
