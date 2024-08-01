import { component$ } from "@builder.io/qwik"
import clsx from "clsx"

import { SecondaryCardLink } from "./Projects"
import Container from "~/components/Container"
import { ChevronRightIcon, CodeIcon, PlayIcon } from "~/components/icons"

import { keyProjects, projectCovers } from "~/utils/projects.util"

export default component$(() => (
  <section id="key-projects">
    <Container class="mt-16 sm:mt-36">
      <h1 class="mb-10 md:mb-16">Projects</h1>
      <ul class="grid grid-cols-1 gap-10 lg:grid-cols-4 xl:gap-14">
        {keyProjects.map((p, i) => (
          <li
            key={p.name}
            class={clsx(
              keyProjects.length === i + 1 && (i + 1) % 2 === 1
                ? "lg:col-start-2 lg:col-end-4"
                : "lg:col-span-2",
            )}
          >
            <figure>
              {(() => {
                const Image = projectCovers[p.cover]
                return (
                  <Image
                    alt={`Screenshot of the project: ${p.name}`}
                    class="w-11/12 rounded-box border border-base-200 shadow-xl"
                  />
                )
              })()}
            </figure>
            <div class="card -mt-[20%] ml-auto w-11/12 border border-base-content/10 bg-base-100/85 shadow-xl backdrop-blur-xl">
              <div class="card-body p-4 lg:p-6 xl:p-8">
                <h2 class="card-title mb-2 text-lg sm:text-xl">{p.name}</h2>
                <ul class="flex flex-wrap gap-1">
                  {p.tags.map((tag) => (
                    <li class="badge badge-info badge-outline" key={tag}>
                      {tag}
                    </li>
                  ))}
                </ul>
                <div class="prose text-left text-base-content">
                  <ul>
                    {p.descriptionArr.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
                <div
                  class={clsx(
                    (p.demo || p.source || p.article) &&
                      "card-actions mt-1 justify-start",
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
    </Container>
  </section>
))
