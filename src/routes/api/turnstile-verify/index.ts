import type { RequestHandler } from "@builder.io/qwik-city"

export const onPost: RequestHandler = async ({
  request,
  text,
  clientConn,
  cookie,
  env,
}) => {
  const body = await request.json()
  const token: string = body["token"]
  const kind: "invisible" | "managed" | "repeated" = body["kind"]

  if (!token) {
    text(400, "Missing token")
    return
  }

  let idempotencyKey: string
  let secret: string | undefined
  if (kind !== "repeated") {
    idempotencyKey = crypto.randomUUID()
    cookie.set("turnstilekey", idempotencyKey, {
      maxAge: 300,
    })
    cookie.set("kind", kind, { maxAge: 300 })
    secret =
      kind === "invisible"
        ? env.get("CF_INVISIBLE_SECRET")
        : env.get("CF_MANAGED_SECRET")
  } else {
    idempotencyKey = cookie.get("turnstilekey")?.value || ""
    secret =
      cookie.get("kind")?.value === "invisible"
        ? env.get("CF_INVISIBLE_SECRET")
        : env.get("CF_MANAGED_SECRET")
  }

  const formData = new FormData()
  formData.append("secret", secret || "")
  formData.append("response", token)
  formData.append("idempotency_key", idempotencyKey)
  if (clientConn.ip) {
    formData.append("remoteip", clientConn.ip)
  }

  const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify"
  const result = await fetch(url, {
    method: "POST",
    body: formData,
  })

  const outcome = await result.json()
  if (outcome.success) {
    text(200, "Token verified")
    return
  }

  text(403, "Failed to verify token")
}
