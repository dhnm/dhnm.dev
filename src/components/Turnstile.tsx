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
import { server$ } from "@builder.io/qwik-city"
import clsx from "clsx"
import type {
  RenderParameters,
  SupportedLanguages,
  TurnstileObject,
} from "./turnstile-types"

const TURNSTILE_LOAD_FUNCTION = "cf__turnstileOnLoad"
const TURNSTILE_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js"

declare global {
  interface Window {
    [TURNSTILE_LOAD_FUNCTION]?: () => void
    turnstile?: TurnstileObject
  }
}

export const verifyToken = server$(async function (
  token: string,
  kind: "invisible" | "managed" | "repeated",
) {
  // Validate the incoming token
  if (!token) {
    return { status: 400, message: "Missing token" }
  }

  // Generate or retrieve an idempotency key and secret based on the kind of request
  let idempotencyKey: string
  let secret: string | undefined

  if (kind !== "repeated") {
    idempotencyKey = crypto.randomUUID()
    this.cookie.set("turnstilekey", idempotencyKey, { maxAge: 300 })
    this.cookie.set("kind", kind, { maxAge: 300 })
    secret =
      kind === "invisible"
        ? this.env.get("CF_INVISIBLE_SECRET")
        : this.env.get("CF_MANAGED_SECRET")
  } else {
    idempotencyKey = this.cookie.get("turnstilekey")?.value || ""
    secret =
      this.cookie.get("kind")?.value === "invisible"
        ? this.env.get("CF_INVISIBLE_SECRET")
        : this.env.get("CF_MANAGED_SECRET")
  }

  // Prepare the data for the API request
  const formData = new FormData()
  formData.append("secret", secret || "")
  formData.append("response", token)
  formData.append("idempotency_key", idempotencyKey)
  if (this.clientConn.ip) {
    formData.append("remoteip", this.clientConn.ip)
  }

  // Perform the API call to verify the token
  const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify"
  const result = await fetch(url, { method: "POST", body: formData })

  const outcome = await result.json()
  if (outcome.success) {
    return { status: 200, message: this.env.get("MY_EMAIL"), ok: true }
  }

  console.error(outcome)
  return { status: 403, message: "Failed to verify token" }
})

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
    useVisibleTask$(
      ({ track, cleanup }) => {
        track(() => turnstileState.value)

        if (turnstileState.value === "error") {
          onError?.(new Error("Turnstile failed to load"))
          return
        }

        if (turnstileState.value !== "ready") return

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
          "error-callback": (error?: Error | unknown) =>
            onError?.(error, boundTurnstileObject),
          "expired-callback":
            onExpire && (() => onExpire!(boundTurnstileObject)),
          "timeout-callback": () => onTimeout?.(boundTurnstileObject),
          "after-interactive-callback": () =>
            onAfterInteractive?.(boundTurnstileObject),
          "before-interactive-callback": () =>
            onBeforeInteractive?.(boundTurnstileObject),
          "unsupported-callback": () => onUnsupported?.(boundTurnstileObject),
        }

        const widgetId = window.turnstile!.render(
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
          if (widgetId) window.turnstile!.remove(widgetId)
        })
      },
      {
        strategy: "document-idle",
      },
    )

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
    (error?: Error | unknown, boundTurnstile?: BoundTurnstileObject) => void
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
    execute: $((options) => window.turnstile!.execute(widgetId, options)),
    reset: $(() => window.turnstile!.reset(widgetId)),
    getResponse: $(() => window.turnstile!.getResponse(widgetId)),
    isExpired: $(() => window.turnstile!.isExpired(widgetId)),
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
        window[TURNSTILE_LOAD_FUNCTION] = $(() => {
          turnstileState.value = "ready"
          delete window[TURNSTILE_LOAD_FUNCTION]
        })
        const url = `${TURNSTILE_SRC}?onload=${TURNSTILE_LOAD_FUNCTION}&render=explicit`
        const script = document.createElement("script")
        if (nonce) script.setAttribute("nonce", nonce)
        script.src = url
        script.async = true
        script.addEventListener(
          "error",
          $(() => {
            turnstileState.value = "error"
            delete window[TURNSTILE_LOAD_FUNCTION]
          }),
        )
        document.head.appendChild(script)
      }
    }),
  )
}
