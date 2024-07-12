import type { FunctionComponent, QwikIntrinsicElements } from "@builder.io/qwik"

import CoverVainzone from "../media/projects/vainzone.webp?jsx"
import CoverPorgmun from "../media/projects/porgmun.webp?jsx"
import CoverSitko from "../media/projects/sitko.webp?jsx"
import CoverTypeSpeed from "../media/projects/typespeed.webp?jsx"
import CoverGameOfLife from "../media/projects/gameoflife.webp?jsx"
import CoverPewPew from "../media/projects/pewpew.webp?jsx"
import CoverVGJump from "../media/projects/vgjump.webp?jsx"
import CoverTicTacToe from "../media/projects/tictactoe.webp?jsx"
import CoverMarkdownEditor from "../media/projects/markdowneditor.webp?jsx"
import CoverSimonSays from "../media/projects/simonsays.webp?jsx"
import CoverPomodoroTimer from "../media/projects/pomodorotimer.webp?jsx"
import CoverCalculator from "../media/projects/calculator.webp?jsx"
import CoverWeatherApp from "../media/projects/weatherapp.webp?jsx"

export enum ProjectCover {
  Vainzone,
  Porgmun,
  Sitko,
  TypeSpeed,
  GameOfLife,
  PewPew,
  VGJump,
  TicTacToe,
  MarkdownEditor,
  SimonSays,
  PomodoroTimer,
  Calculator,
  WeatherApp,
}

export const projectCovers: {
  [key in ProjectCover]: ViteImageComponent
} = {
  [ProjectCover.Vainzone]: CoverVainzone,
  [ProjectCover.Porgmun]: CoverPorgmun,
  [ProjectCover.Sitko]: CoverSitko,
  [ProjectCover.TypeSpeed]: CoverTypeSpeed,
  [ProjectCover.GameOfLife]: CoverGameOfLife,
  [ProjectCover.PewPew]: CoverPewPew,
  [ProjectCover.VGJump]: CoverVGJump,
  [ProjectCover.TicTacToe]: CoverTicTacToe,
  [ProjectCover.MarkdownEditor]: CoverMarkdownEditor,
  [ProjectCover.SimonSays]: CoverSimonSays,
  [ProjectCover.PomodoroTimer]: CoverPomodoroTimer,
  [ProjectCover.Calculator]: CoverCalculator,
  [ProjectCover.WeatherApp]: CoverWeatherApp,
}

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
  | "UIKit"
  | "Meta Graph API"
  | "Core Location"
  | "SSG"
  | "FTP"
  | "Qwik"
  | "TailwindCSS"
  | "ThreeJS"
  | "Cloudflare"
  | "Java"
  | "CLI"
  | "DX"
  | "mapbox API"
  | "Geolocation API"
  | "Kivy"
  | "Godot Engine"
  | "GDScript"
  | "Unity Engine"
  | "C#"
  | "3D"
  | "JavaScript"
  | "jQuery"
  | "CSS"
  | "Sass"

export type ViteImageProps = Omit<
  QwikIntrinsicElements["img"],
  "src" | "width" | "height" | "srcset"
>
export type ViteImageComponent = FunctionComponent<ViteImageProps>

export type SimpleProject = {
  name: string
  tags: ProjectTags[]
  description: string
  article?: string
  source?: string
  demo?: string
}

export type DecoratedProject = SimpleProject & {
  cover: ProjectCover
}

export type Project = SimpleProject | DecoratedProject

export const keyProjects: DecoratedProject[] = [
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
    ],
    description:
      "Developed a comprehensive analytical website, integrating complex database structures & aggregations, chatbots, third-party extensions, real-time collaboration features, and caching and performance optimization strategies to align with resource constraints.",
    cover: ProjectCover.Vainzone,
    source: "https://github.com/dhnm/vain.zone",
  },
  {
    name: "Native Mobile App for PORGMUN Conference",
    tags: ["iOS", "Swift", "UIKit", "Meta Graph API", "Core Location"],
    description:
      "Created an iOS app to facilitate Model United Nations conferences, featuring real-time and location-based updates and interactive tools for participants. Maintained and evolved the app for the successive conference editions.",
    cover: ProjectCover.Porgmun,
    source: "https://gitlab.com/dhnm/porgmun",
  },
  {
    name: "Website for Sítko Festival",
    tags: ["React", "SSG", "GraphQL", "FTP"],
    description:
      "Designed and developed a responsive website for a university drama festival, featuring brand-aligned animations and optimized image serving for various screen types. Managed the site from inception to post-festival, reflecting changing requirements at each stage.",
    cover: ProjectCover.Sitko,
    source: "https://gitlab.com/dhnm/sitko2018",
  },
]

export const explorations: Project[] = [
  {
    name: "dhnm.dev",
    tags: ["TypeScript", "Qwik", "TailwindCSS", "ThreeJS", "Cloudflare"],
    description:
      "Personal website with my projects. Exploring the concept of resumability with Qwik over hydration.",
    source: "https://github.com/dhnm/dhnm.dev",
  },
  {
    name: "McKinsey Points of Interest",
    tags: ["React", "Next.js", "Geolocation API", "mapbox API"],
    description:
      "App showing closest points of interest relevant to McKinsey & Company.",
  },
  {
    name: "Pew Pew",
    tags: ["3D", "GDScript", "Godot Engine"],
    description:
      "3D game with the player character shooting at procedurally generated waves of enemies that follow the player.",
    cover: ProjectCover.PewPew,
  },
  {
    name: "Dave the Robot",
    tags: ["Python", "WebSockets", "REST API"],
    description:
      "Discord chatbot with server management and entertainment features for Computer Science students.",
    source: "https://gitlab.com/gwo0d/dave-the-robot",
  },
  {
    name: "VG Jump",
    tags: ["C#", "Unity Engine"],
    description:
      "Fun platformer with the player character jumping over obstacles, collecting coins, and shooting enemies.",
    cover: ProjectCover.VGJump,
  },
  {
    name: "TypeSpeed",
    tags: ["Python", "Kivy"],
    description: "Speed typing game to improve typing speed and accuracy.",
    cover: ProjectCover.TypeSpeed,
  },
  {
    name: "Game of Life",
    tags: ["Python", "Kivy"],
    description: "Interactive simulation based on Conway's Game of Life rules.",
    cover: ProjectCover.GameOfLife,
  },
  {
    name: "Simon Says",
    tags: ["JavaScript", "Sass"],
    description: "Memory skill game using sound and visual cues.",
    cover: ProjectCover.SimonSays,
    source: "https://codepen.io/dhnm/pen/zBrZvb",
  },
  {
    name: "Pomodoro Timer",
    tags: ["JavaScript", "CSS", "jQuery"],
    description:
      "Timer app using the Pomodoro Technique with focus and break times.",
    cover: ProjectCover.PomodoroTimer,
    source: "https://codepen.io/dhnm/pen/JKYLpV",
  },
  {
    name: "ComposableIO",
    tags: ["Java", "CLI", "DX"],
    description: "Utility classes for composing command-line input flows.",
    source: "https://gitlab.com/dhnm/composableio",
  },
  {
    name: "JS Calculator",
    tags: ["JavaScript", "CSS"],
    description: "Stylish calculator app.",
    cover: ProjectCover.Calculator,
    source: "https://codepen.io/dhnm/pen/qNONye",
  },
  {
    name: "Tic-Tac-Toe",
    tags: ["JavaScript", "jQuery"],
    description: "Classic Tic-Tac-Toe game with a strong computer opponent.",
    cover: ProjectCover.TicTacToe,
    source: "https://codepen.io/dhnm/pen/XKjZWo",
  },
  {
    name: "Markdown Editor",
    tags: ["React", "JavaScript", "Sass"],
    description: "Markdown editor with real-time preview.",
    cover: ProjectCover.MarkdownEditor,
    source: "https://codepen.io/dhnm/pen/rLeLmG",
  },
  {
    name: "Weather App",
    tags: ["JavaScript", "jQuery", "REST API", "Geolocation API"],
    description:
      "Weather app using third party API to show forecast based on user location.",
    cover: ProjectCover.WeatherApp,
  },
  {
    name: "Twitch Streamers List",
    tags: ["JavaScript", "jQuery", "REST API"],
    description:
      "App that displays a list of Twitch streamers with their status using Twitch's API.",
  },
  {
    name: "Quotes App",
    tags: ["JavaScript", "jQuery"],
    description:
      "App that fetches a third party API and displays random quotes.",
  },
]
