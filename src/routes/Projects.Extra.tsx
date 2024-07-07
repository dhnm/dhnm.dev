import { component$, useSignal } from "@builder.io/qwik"
import clsx from "clsx"

import Container from "~/components/Container"
import { Masonry, MasonryItem } from "~/components/Masonry"
import {
  ChevronDownIcon,
  ChevronRightIcon,
  CodeIcon,
  PlayIcon,
} from "~/components/icons"

import { SecondaryCardLink } from "./Projects"

import { explorations, projectCovers } from "~/utils/projects.util"
import type { Project } from "~/utils/projects.util"

const ProjectGrid = component$(({ projects }: { projects: Project[] }) => (
  <Masonry class="-mx-1 md:-mx-2">
    {projects.map((p) => (
      <MasonryItem
        key={p.name}
        class="box-border w-full p-1 md:w-1/2 md:p-2 xl:w-1/3"
      >
        <div class="card border-base-200 bg-base-100 shadow-xl">
          <div class="card-body inline p-2 sm:p-3 md:p-4">
            <figure class="!inline">
              {"cover" in p &&
                (() => {
                  const Image = projectCovers[p.cover]
                  return (
                    <Image
                      alt={`Screenshot of the project: ${p.name}`}
                      class="relative float-left mb-3 mr-3 w-5/12 rounded-xl sm:w-4/12 md:w-5/12"
                    />
                  )
                })()}
            </figure>
            <h3 class="text-md card-title sm:text-lg">{p.name}</h3>
            <ul class="my-1.5 inline">
              {p.tags.map((tag) => (
                <li class="badge badge-info badge-outline mr-1" key={tag}>
                  {tag}
                </li>
              ))}
            </ul>
            <p>{p.description}</p>
            <div
              class={clsx(
                (p.demo || p.source || p.article) &&
                  "card-actions mt-3 justify-start",
              )}
            >
              {p.demo && (
                <SecondaryCardLink href={p.demo}>
                  <PlayIcon class="h-4 w-4 fill-current" /> Demo
                </SecondaryCardLink>
              )}
              {p.source && (
                <SecondaryCardLink href={p.source}>
                  <CodeIcon class="h-4 w-4 fill-current" /> Code
                </SecondaryCardLink>
              )}
              {p.article && (
                <a href={p.article} class="btn btn-outline btn-sm">
                  Read <ChevronRightIcon class="-mx-1 h-4 w-4 fill-current" />
                </a>
              )}
            </div>
          </div>
        </div>
      </MasonryItem>
    ))}
  </Masonry>
))

const MoreProjects = component$(({ projects }: { projects: Project[] }) => {
  const visible = useSignal(false)

  return (
    <>
      <div class="mt-6 flex justify-center">
        <button
          class={clsx("btn btn-primary", visible.value && "btn-outline")}
          onClick$={() => (visible.value = !visible.value)}
        >
          More Projects <ChevronDownIcon class="h-4 w-4 fill-current" />
        </button>
      </div>
      <div
        class={clsx(
          "transition-gpu transition-all duration-300",
          !visible.value ? "max-h-0 overflow-hidden" : "max-h-full",
        )}
      >
        <div
          class={clsx(
            "transition-gpu mt-3 transition-all duration-300",
            !visible.value
              ? "translate-y-16 opacity-0"
              : "opacity-1 translate-y-0",
          )}
        >
          <ProjectGrid projects={projects} />
        </div>
      </div>
    </>
  )
})

export default component$(() => {
  return (
    <Container class="mt-16 sm:mt-36">
      <section id="explorations">
        <h1 class="mb-6 md:mb-16">Personal Projects</h1>
        <ProjectGrid projects={explorations.slice(0, 6)} />
        <MoreProjects projects={explorations.slice(6)} />
      </section>
    </Container>
  )
})
