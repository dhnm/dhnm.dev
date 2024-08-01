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
  | "Sketch"

export type ViteImageProps = Omit<
  QwikIntrinsicElements["img"],
  "src" | "width" | "height" | "srcset"
>
export type ViteImageComponent = FunctionComponent<ViteImageProps>

export type SimpleProject = {
  name: string
  tags: ProjectTags[]
  description?: string
  descriptionArr?: string[]
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
      "Meta Graph API",
    ],
    descriptionArr: [
      "Developed a platform for processing raw telemetry data and presenting it so users can analyze their performances and improve their outcomes.",
      "Enhanced user interactions with real-time collaborative systems, rich chatbots, and third-party services.",
      "Implemented caching and database optimizations to manage efficient resource usage, low response times, and instantaneous, comprehensive analysis of tens of thousands inter-related database items.",
    ],
    cover: ProjectCover.Vainzone,
    source: "https://github.com/dhnm/vain.zone",
  },
  {
    name: "Native Mobile App for PORGMUN Conference",
    tags: [
      "iOS",
      "Swift",
      "UIKit",
      "Meta Graph API",
      "Core Location",
      "Sketch",
    ],
    descriptionArr: [
      "Designed and developed an iOS app for hundreds of participants at Model United Nations conferences.",
      "Utilized location-based services to assist attendees in navigating the event.",
      "Adapted and refined the app across successive conferences to improve functionality and user satisfaction, achieving user rating of ⭐️4.7/5.",
    ],
    cover: ProjectCover.Porgmun,
    source: "https://gitlab.com/dhnm/porgmun",
  },
  {
    name: "Website for Sítko Festival",
    tags: ["React", "SSG", "GraphQL", "FTP", "Sketch"],
    descriptionArr: [
      "Designed and developed a responsive website for a university drama festival.",
      "Deployed a beneficial strategy of image serving optimization that enhanced performance as well as alignment with the brand aesthetics.",
      "Flexibly managed site updates and content modifications throughout the festival lifecycle to respond to ongoing needs.",
    ],
    cover: ProjectCover.Sitko,
    source: "https://gitlab.com/dhnm/sitko2018",
  },
]

export const explorations: Project[] = [
  {
    name: "dhnm.dev",
    tags: ["TypeScript", "Qwik", "TailwindCSS", "ThreeJS", "Cloudflare"],
    descriptionArr: [
      "Personal website showcasing my projects.",
      "Employed resumability to achieve faster load times over more traditional hydration.",
    ],
    source: "https://github.com/dhnm/dhnm.dev",
  },
  {
    name: "Pew Pew",
    tags: ["3D", "GDScript", "Godot Engine"],
    descriptionArr: [
      "3D shooter game with custom-made assets.",
      "Added progressive difficulty with enemies following the player movements and scoring for increased retention.",
    ],
    cover: ProjectCover.PewPew,
  },
  {
    name: "McKinsey Points of Interest",
    tags: ["React", "Next.js", "Geolocation API", "mapbox API"],
    descriptionArr: [
      "App showing the company's points of interests nearby.",
      "Responsible for the software; presented the solution as team with diverse responsibilities.",
    ],
  },
  {
    name: "VG Jump",
    tags: ["C#", "Unity Engine"],
    descriptionArr: [
      "Fun platformer with the player avoiding obstacles, collecting coins, and shooting enemies.",
      "Collaborated with an artist to brainstorm gameplay and requirements for the assets.",
    ],
    cover: ProjectCover.VGJump,
  },
  {
    name: "TypeSpeed",
    tags: ["Python", "Kivy"],
    descriptionArr: [
      "Speed typing game to improve typing speed and accuracy.",
      "Provided practical and entertainment value with challenges and score system.",
    ],
    cover: ProjectCover.TypeSpeed,
  },
  {
    name: "Game of Life",
    tags: ["Python", "Kivy"],
    descriptionArr: [
      "Interactive simulation based on Conway's Game of Life rules.",
      "Enabled educational insights into cellular automata and experimentation with customizable scenarios.",
    ],
    cover: ProjectCover.GameOfLife,
  },
  {
    name: "Dave the Robot",
    tags: ["Python", "WebSockets", "REST API"],
    descriptionArr: [
      "Established student communication platform by automating server administration tasks.",
      "Included entertainment features to support community engagement.",
    ],
    source: "https://gitlab.com/gwo0d/dave-the-robot",
  },
  {
    name: "Pomodoro Timer",
    tags: ["JavaScript", "CSS", "jQuery"],
    description:
      "Timer app using the Pomodoro Technique with focus and break times.",
    descriptionArr: [
      "Timer app using the Pomodoro Technique with customizable timings to adapt to personalized user needs.",
      "A simple and intuitive interface supports users to manage their time effectively, boosting productivity and preventing burnout.",
    ],
    cover: ProjectCover.PomodoroTimer,
    source: "https://codepen.io/dhnm/pen/JKYLpV",
  },
  {
    name: "ComposableIO",
    tags: ["Java", "CLI", "DX"],
    descriptionArr: [
      "Utility classes for composing command-line input flows to reduce complexity and improve readability.",
      "Extracted from a larger project to serve as a versatile importable module.",
    ],
    source: "https://gitlab.com/dhnm/composableio",
  },
  {
    name: "JS Calculator",
    tags: ["JavaScript", "CSS"],
    descriptionArr: ["Stylish calculator app."],
    cover: ProjectCover.Calculator,
    source: "https://codepen.io/dhnm/pen/qNONye",
  },
  {
    name: "Simon Says",
    tags: ["JavaScript", "Sass"],
    descriptionArr: [
      "Memory skill game using sound and visual cues.",
      "Programmed increasing difficulty and randomized levels to facilitate an entertaining way to test and improve cognitive abilities.",
    ],
    cover: ProjectCover.SimonSays,
    source: "https://codepen.io/dhnm/pen/zBrZvb",
  },
  {
    name: "Tic-Tac-Toe",
    tags: ["JavaScript", "jQuery"],
    descriptionArr: [
      "Classic Tic-Tac-Toe game.",
      "Implemented an algorithm to provide a challenging opponent to the player.",
    ],
    cover: ProjectCover.TicTacToe,
    source: "https://codepen.io/dhnm/pen/XKjZWo",
  },
  {
    name: "Markdown Editor",
    tags: ["React", "JavaScript", "Sass"],
    descriptionArr: [
      "Markdown text editor with instant visual preview of edits.",
    ],
    cover: ProjectCover.MarkdownEditor,
    source: "https://codepen.io/dhnm/pen/rLeLmG",
  },
  {
    name: "Weather App",
    tags: ["JavaScript", "jQuery", "REST API", "Geolocation API"],
    descriptionArr: [
      "Weather app using third party API to show latest forecast based on user location.",
    ],
    cover: ProjectCover.WeatherApp,
  },
  {
    name: "Twitch Streamers List",
    tags: ["JavaScript", "jQuery", "REST API"],
    descriptionArr: [
      "Informational app displaying a live list of Twitch streamers and their current streaming status using Twitch's API.",
    ],
  },
  {
    name: "Quotes App",
    tags: ["JavaScript", "jQuery"],
    descriptionArr: [
      "App that fetches and displays random quotes from a third-party API, helping with improving mood and motivation.",
    ],
  },
]
