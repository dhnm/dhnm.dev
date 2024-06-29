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

import type { Project } from "./KeyProjects"
import { SecondaryCardLink } from "./KeyProjects"

const projects: Project[] = [
  {
    name: "dhnm.dev",
    tags: ["TypeScript", "Qwik", "TailwindCSS", "ThreeJS", "Cloudflare"],
    description:
      "Personal website with my projects. Exploring the concept of resumability with Qwik over hydration.",
    coverUrl: "https://unsplash.it/300/200.webp?random=1",
    source: "https://github.com/dhnm/dhnm.dev",
  },
  {
    name: "ComposableIO",
    tags: ["Java", "CLI", "DX"],
    description: "Utility classes for composing command-line input flows.",
    coverUrl: "https://unsplash.it/300/200.webp?random=2",
    source: "https://gitlab.com/dhnm/composableio",
  },
  {
    name: "Dave the Robot",
    tags: ["Python", "WebSockets", "REST API"],
    description:
      "Discord chatbot with server management and entertainment features for Computer Science students.",
    coverUrl: "https://unsplash.it/300/200.webp?random=3",
    source: "https://gitlab.com/gwo0d/dave-the-robot",
  },
  {
    name: "McKinsey Points of Interest",
    tags: ["React", "Next.js", "Geolocation API", "mapbox API"],
    description:
      "App showing closest points of interest relevant to McKinsey & Company.",
    coverUrl: "https://unsplash.it/300/200.webp?random=4",
  },
  {
    name: "Game of Life",
    tags: ["Python", "Kivy"],
    description: "Interactive simulation based on Conway's Game of Life rules.",
    coverUrl: "https://unsplash.it/300/200.webp?random=5",
  },
  {
    name: "TypeSpeed",
    tags: ["Python", "Kivy"],
    description: "Speed typing game to improve typing speed and accuracy.",
    coverUrl: "https://unsplash.it/300/200.webp?random=6",
  },
  {
    name: "The Vaccinator",
    tags: ["3D", "GDScript", "Godot Engine"],
    description:
      "3D game with the player character shooting at randomly generated waves of enemies that follow the player.",
    coverUrl: "https://unsplash.it/300/200.webp?random=7",
  },
  {
    name: "VG Tribute",
    tags: ["C#", "Unity Engine"],
    description:
      "Fun platformer with the player character jumping over obstacles, collecting coins, and shooting enemies.",
    coverUrl: "https://unsplash.it/300/200.webp?random=8",
  },
  {
    name: "Tic-tac-toe",
    tags: ["JavaScript", "jQuery"],
    description: "Classic Tic-tac-toe game with a strong computer opponent.",
    coverUrl: "https://unsplash.it/300/200.webp?random=9",
    source: "https://codepen.io/dhnm/pen/XKjZWo",
  },
  {
    name: "Markdown Editor",
    tags: ["React", "JavaScript", "Sass"],
    description: "Markdown editor with real-time preview.",
    coverUrl: "https://unsplash.it/300/200.webp?random=10",
    source: "https://codepen.io/dhnm/pen/rLeLmG",
  },
  {
    name: "Simon Says",
    tags: ["JavaScript", "Sass"],
    description: "Memory skill game using sound and visual cues.",
    coverUrl: "https://unsplash.it/300/200.webp?random=11",
    source: "https://codepen.io/dhnm/pen/zBrZvb",
  },
  {
    name: "Pomodoro Timer",
    tags: ["JavaScript", "CSS", "jQuery"],
    description:
      "Timer app using the Pomodoro Technique with focus and break times.",
    coverUrl: "https://unsplash.it/300/200.webp?random=12",
    source: "https://codepen.io/dhnm/pen/JKYLpV",
  },
  {
    name: "Pretty Calculator",
    tags: ["JavaScript", "CSS"],
    description: "Stylish calculator app.",
    coverUrl: "https://unsplash.it/300/200.webp?random=13",
    source: "https://codepen.io/dhnm/pen/qNONye",
  },
  {
    name: "Twitch Streamers List",
    tags: ["JavaScript", "jQuery", "REST API"],
    description:
      "App that displays a list of Twitch streamers with their status using Twitch's API.",
    coverUrl: "https://unsplash.it/300/200.webp?random=14",
    source: "https://codepen.io/dhnm/pen/aZzevN",
  },
  {
    name: "Weather App",
    tags: ["JavaScript", "jQuery", "REST API", "Geolocation API"],
    description:
      "Weather app using third party API to show forecast based on user location.",
    coverUrl: "https://unsplash.it/300/200.webp?random=15",
    source: "https://codepen.io/dhnm/pen/RRNaWm",
  },
  {
    name: "Quotes App",
    tags: ["JavaScript", "jQuery"],
    description:
      "App that fetches a third party API and displays random quotes.",
    coverUrl: "https://unsplash.it/300/200.webp?random=16",
    source: "https://codepen.io/dhnm/pen/aZzOgx",
  },
]

const ProjectGrid = component$(({ projects }: { projects: Project[] }) => (
  <Masonry class="-mx-1 md:-mx-2">
    {projects.map((p) => (
      <MasonryItem key={p.name} class="box-border p-1 md:w-1/2 md:p-2 xl:w-1/3">
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
        <ProjectGrid projects={projects.slice(0, 6)} />
        <MoreProjects projects={projects.slice(6)} />
      </section>
    </Container>
  )
})
