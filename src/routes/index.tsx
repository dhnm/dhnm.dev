import { Slot, component$ } from "@builder.io/qwik"

import Container from "~/components/Container"
import { DocumentIcon, GitHubIcon, LinkedInIcon } from "~/components/icons"
import ContactForm from "./ContactForm"

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
    demo: "dhnm.dev",
    source: "github.com",
  },
  {
    name: "Native Mobile App for PORGMUN Conference",
    tags: ["iOS", "Swift", "UIKit", "Meta Graph API", "Core Location"],
    description:
      "Created an iOS app to facilitate Model United Nations conferences, featuring real-time and location-based updates and interactive tools for participants. Maintained and evolved the app for the successive conference editions.",
    slug: "porgmun",
    demo: "dhnm.dev",
    source: "github.com",
  },
  {
    name: "Website for Sítko Festival",
    tags: ["React", "SSG", "GraphQL", "FTP"],
    description:
      "Designed and developed a responsive website for a university drama festival, featuring brand-aligned animations and optimized image serving for various screen types. Managed the site from inception to post-festival, reflecting changing requirements at each stage.",
    slug: "sitko",
    demo: "dhnm.dev",
    source: "github.com",
  },
]

const Projects = component$(() => (
  <Container class="mt-16 sm:mt-36">
    <section id="projects">
      <h2 class="mb-6">Projects</h2>
      <div class="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {projects.map((p) => (
          <div
            key={p.name}
            class="rounded-2xl bg-base-100 p-3 text-base-content shadow-xl md:p-6"
          >
            <img
              width="720"
              height="480"
              src="https://unsplash.it/720/480"
              alt="Placeholder"
              class="float-left mb-3 mr-3 w-1/3 rounded-2xl md:mr-6"
            />
            <h2 class="card-title mb-2 text-lg sm:text-xl">{p.name}</h2>
            <div class="inline">
              {p.tags.map((tag) => (
                <>
                  <div
                    class="badge badge-info badge-outline badge-sm"
                    key={tag}
                  >
                    {tag}
                  </div>{" "}
                </>
              ))}
            </div>
            <p class="mt-2">{p.description}</p>
            <div class="card-actions mt-3 justify-end">
              {p.demo && <button class="btn btn-ghost btn-sm">Demo</button>}
              {p.source && (
                <button class="btn btn-ghost btn-sm">
                  <GitHubIcon class="h-4 w-4 fill-current" /> Code
                </button>
              )}
              {p.slug && (
                <button class="btn btn-outline btn-sm">Read More</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
    <section id="personal_projects">
      <h2 class="mb-6 mt-16 sm:mt-36">Personal Projects</h2>
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
      <div class="mx-auto grid max-w-xl grid-cols-1 items-center gap-y-10 lg:max-w-none lg:grid-cols-2">
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
