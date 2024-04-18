import type {
  TurnstileObject,
  RenderParameters,
  SupportedLanguages,
} from "./turnstile-types"
import type { CSSProperties, ClassList, QRL, Signal } from "@builder.io/qwik"
import {
  $,
  component$,
  createContextId,
  useContext,
  useContextProvider,
  useOnWindow,
  useServerData,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik"
import clsx from "clsx"

declare global {
  interface Window {
    [TURNSTILE_LOAD_FUNCTION]?: () => void
    turnstile: TurnstileObject
  }
}

const TURNSTILE_LOAD_FUNCTION = "cf__turnstileOnLoad"
const TURNSTILE_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js"

const Turnstile = component$(
  ({
    id,
    class: className,
    style,
    sitekey,
    action,
    cData,
    theme,
    language,
    tabIndex,
    responseField,
    responseFieldName,
    size,
    fixedSize,
    retry,
    retryInterval,
    refreshExpired,
    appearance,
    execution,
    ref,
    onVerify,
    onLoad,
    onError,
    onExpire,
    onTimeout,
    onAfterInteractive,
    onBeforeInteractive,
    onUnsupported,
  }: TurnstileProps) => {
    useTurnstile()
    const turnstileState = useContext(turnstileStateContext)

    const boundTurnstileObject = useStore<BoundTurnstileObject>({
      execute: $(() => {}),
      reset: $(() => {}),
      getResponse: $(() => ""),
      isExpired: $(() => false),
    })

    const genRef = useSignal<Element>()
    const unwrappedRef = ref ?? genRef

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(({ track, cleanup }) => {
      track(() => turnstileState.value)

      if (turnstileState.value === "error") {
        onError?.(new Error("Turnstile failed to load"))
        return
      }

      if (
        turnstileState.value === "unloaded" ||
        turnstileState.value === "loading"
      )
        return

      const renderParameters: RenderParameters = {
        sitekey,
        action,
        cData,
        theme,
        language,
        tabindex: tabIndex,
        "response-field": responseField,
        "response-field-name": responseFieldName,
        size,
        retry,
        "retry-interval": retryInterval,
        "refresh-expired": refreshExpired,
        appearance,
        execution,
        callback: (token: string) => onVerify?.(token, boundTurnstileObject),
        "error-callback": (error?: any) =>
          onError?.(error, boundTurnstileObject),
        "expired-callback": onExpire && (() => onExpire!(boundTurnstileObject)),
        "timeout-callback": () => onTimeout?.(boundTurnstileObject),
        "after-interactive-callback": () =>
          onAfterInteractive?.(boundTurnstileObject),
        "before-interactive-callback": () =>
          onBeforeInteractive?.(boundTurnstileObject),
        "unsupported-callback": () => onUnsupported?.(boundTurnstileObject),
      }

      const widgetId = window.turnstile.render(
        unwrappedRef.value as HTMLElement,
        renderParameters,
      )

      const newBoundTurnstileObject = createBoundTurnstileObject(widgetId)
      boundTurnstileObject.execute = newBoundTurnstileObject.execute
      boundTurnstileObject.getResponse = newBoundTurnstileObject.getResponse
      boundTurnstileObject.isExpired = newBoundTurnstileObject.isExpired
      boundTurnstileObject.reset = newBoundTurnstileObject.reset

      onLoad?.(widgetId, boundTurnstileObject)

      cleanup(() => {
        if (widgetId) window.turnstile.remove(widgetId)
      })
    })

    return (
      <div
        id={id}
        ref={unwrappedRef}
        class={clsx(
          className,
          fixedSize &&
            (size === "compact" ? "h-[120px] w-[130px]" : "h-[65px] w-[300px]"),
        )}
        style={style}
      />
    )
  },
)

export default Turnstile

export interface TurnstileProps extends TurnstileCallbacks {
  sitekey: string
  action?: string
  cData?: string
  theme?: "light" | "dark" | "auto"
  language?: SupportedLanguages | "auto"
  tabIndex?: number
  responseField?: boolean
  responseFieldName?: string
  size?: "normal" | "compact"
  fixedSize?: boolean
  retry?: "auto" | "never"
  retryInterval?: number
  refreshExpired?: "auto" | "manual" | "never"
  appearance?: "always" | "execute" | "interaction-only"
  execution?: "render" | "execute"
  ref?: Signal<HTMLElement>
  id?: string
  userRef?: Signal<Element | undefined>
  class?: ClassList
  style?: CSSProperties
}

export interface TurnstileCallbacks {
  onVerify?: QRL<(token: string, boundTurnstile: BoundTurnstileObject) => void>
  onLoad?: QRL<(widgetId: string, boundTurnstile: BoundTurnstileObject) => void>
  onError?: QRL<
    (error?: Error | any, boundTurnstile?: BoundTurnstileObject) => void
  >
  onExpire?: QRL<(boundTurnstile: BoundTurnstileObject) => void>
  onTimeout?: QRL<(boundTurnstile: BoundTurnstileObject) => void>
  onAfterInteractive?: QRL<(boundTurnstile: BoundTurnstileObject) => void>
  onBeforeInteractive?: QRL<(boundTurnstile: BoundTurnstileObject) => void>
  onUnsupported?: QRL<(boundTurnstile: BoundTurnstileObject) => void>
}

export interface BoundTurnstileObject {
  execute: QRL<(options?: RenderParameters) => void>
  reset: QRL<() => void>
  getResponse: QRL<() => string>
  isExpired: QRL<() => boolean>
}

function createBoundTurnstileObject(widgetId: string): BoundTurnstileObject {
  return {
    execute: $((options) => window.turnstile.execute(widgetId, options)),
    reset: $(() => window.turnstile.reset(widgetId)),
    getResponse: $(() => window.turnstile.getResponse(widgetId)),
    isExpired: $(() => window.turnstile.isExpired(widgetId)),
  }
}

type TurnstileState = "unloaded" | "loading" | "ready" | "error"

export const turnstileStateContext =
  createContextId<Signal<TurnstileState>>("TurnstileState")

export const useTurnstileProvider = () =>
  useContextProvider(
    turnstileStateContext,
    useSignal<TurnstileState>("unloaded"),
  )

const useTurnstile = () => {
  const turnstileState = useContext(turnstileStateContext)
  const nonce = useServerData<string | undefined>("nonce")

  useOnWindow(
    "load",
    $(() => {
      if (turnstileState.value === "unloaded") {
        turnstileState.value = "loading"
        window[TURNSTILE_LOAD_FUNCTION] = () => {
          turnstileState.value = "ready"
          delete window[TURNSTILE_LOAD_FUNCTION]
        }
        const url = `${TURNSTILE_SRC}?onload=${TURNSTILE_LOAD_FUNCTION}&render=explicit`
        const script = document.createElement("script")
        if (nonce) script.setAttribute("nonce", nonce)
        script.src = url
        script.async = true
        script.addEventListener("error", (e) => {
          console.error(e)
          delete window[TURNSTILE_LOAD_FUNCTION]
        })
        document.head.appendChild(script)
      }
    }),
  )
}
