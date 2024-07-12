/** eslint-disable qwik/no-use-visible-task */
import type { Signal } from "@builder.io/qwik"
import {
  $,
  Slot,
  component$,
  createContextId,
  useContext,
  useContextProvider,
  useOnWindow,
  useSignal,
  useStore,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik"
import clsx from "clsx"

const buildMasonryLayout = $(({ masonry, items }: MasonryRefs) => {
  const masonryEl = masonry.value!
  const children = items.map((item) => item.value!)

  // setup
  const width = masonryEl.getBoundingClientRect().width
  const colWidth = children[0].getBoundingClientRect().width
  const numCols = Math.floor(width / colWidth)
  const cols = []

  for (let i = 0; i < numCols; i++) {
    cols.push({ height: 0, index: i })
  }

  // position items
  let maxHeight = 0

  for (let i = 0; i < children.length; i++) {
    let col = cols[0]

    for (const c of cols) {
      if (c.height < col.height) col = c
    }

    const item = children[i] as HTMLElement
    const left = col.index * colWidth + "px"
    const top = col.height + "px"

    item.style.transform = `translate(${left}, ${top})`

    col.height += item.getBoundingClientRect().height

    if (col.height > maxHeight) maxHeight = col.height
  }

  masonryEl.style.height = `${maxHeight}px`
})

type MasonryRefs = {
  masonry: Signal<HTMLUListElement | undefined>
  items: Signal<HTMLLIElement | undefined>[]
}
const masonryRefsContext = createContextId<MasonryRefs>("MasonryRefsContext")

export const Masonry = component$(
  ({ class: className }: { class?: string }) => {
    const resizeTimeout = useSignal<number>()
    const masonry = useSignal<HTMLUListElement>()

    const masonryRefs = useStore<MasonryRefs>({
      masonry: masonry,
      items: [],
    })

    useContextProvider(masonryRefsContext, masonryRefs)

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(() => buildMasonryLayout(masonryRefs), {
      strategy: "document-idle",
    })

    useOnWindow(
      "resize",
      $(() => {
        clearTimeout(resizeTimeout.value)
        resizeTimeout.value = Number(
          setTimeout(() => buildMasonryLayout(masonryRefs), 200),
        )
      }),
    )

    return (
      <ul ref={masonry} class={clsx("relative", className)}>
        <Slot />
      </ul>
    )
  },
)

export const MasonryItem = component$(
  ({ class: className }: { class?: string }) => {
    const ref = useSignal<HTMLLIElement>()
    const masonryRefs = useContext<MasonryRefs>(masonryRefsContext)
    useTask$(() => {
      masonryRefs.items.push(ref)
    })

    return (
      <li
        ref={ref}
        class={clsx(
          "absolute box-border inline transform-gpu border-transparent",
          className,
        )}
      >
        <Slot />
      </li>
    )
  },
)
