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
      <a
        href={href}
        target="_blank"
        class="btn btn-secondary border-[oklch(95%_0.01_200)] bg-[oklch(95%_0.01_200)] transition-colors hover:border-[oklch(92%_0.01_200)] hover:bg-[oklch(92%_0.01_200)] dark:border-[oklch(28%_0.05_240)] dark:bg-[oklch(28%_0.05_240)] dark:hover:border-[oklch(25%_0.05_240)] dark:hover:bg-[oklch(25%_0.05_240)]"
      >
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
  | "Data Science"
  | "Web Development"
  | "UI/UX Design"
  | "Product Management"
  | "iOS"
  | "Swift"
  | "Next.js"
  | "Express"

type Project = {
  name: string
  tags: ProjectTags[]
  description: string
  source?: string
  demo?: string
}

const projects: Project[] = [
  {
    name: "Sitko",
    tags: ["React", "GraphQL"],
    description: "A project to sit and code",
    source: "github.com",
  },
  {
    name: "PORGMUN",
    tags: ["iOS", "Swift"],
    description:
      "An iOS app for a Model United Nations conference.\nAn iOS app for a Model United Nations conference.",
    source: "github.com",
  },
  {
    name: "vain.zone",
    tags: ["React", "Next.js", "Node.js", "Express"],
    description: "Game analytics for Vainglory",
    source: "github.com",
  },
]

const Projects = component$(() => (
  <Container class="mt-16 sm:mt-36">
    <section id="projects">
      <h2>Key Projects</h2>
      <div class="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-2">
        {projects.map((p) => (
          <div
            key={p.name}
            class="flex flex-col rounded-2xl bg-base-300 shadow-xl"
          >
            <div class="flex flex-col gap-2 p-6">
              <div class="grid grid-cols-[33%_67%] gap-4">
                <img
                  width="720"
                  height="480"
                  src="https://unsplash.it/720/480"
                  alt="Placeholder"
                  class="w-full rounded-2xl"
                />
                <div class="flex flex-auto flex-col gap-2">
                  <h2 class="card-title">{p.name}</h2>
                  <div class="-ml-1 mb-1 flex gap-1">
                    {p.tags.map((tag) => (
                      <div class="badge" key={tag}>
                        {tag}
                      </div>
                    ))}
                  </div>
                  <p>{p.description}</p>
                </div>
              </div>
              <div class="card-actions justify-end">
                {p.source && (
                  <button class="btn btn-outline btn-sm">
                    <GitHubIcon class="h-4 w-4 fill-current" /> Code
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
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
