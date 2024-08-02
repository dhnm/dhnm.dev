import type { RequestHandler } from "@builder.io/qwik-city"
import { isDev } from "@builder.io/qwik/build"

export const onRequest: RequestHandler = (event) => {
  const nonce = Array.from(crypto.getRandomValues(new Uint8Array(16)), (byte) =>
    ("0" + (byte & 0xff).toString(16)).slice(-2),
  ).join("")

  event.sharedMap.set("@nonce", nonce)

  const csp = [
    "default-src 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    `script-src 'unsafe-inline' https://challenges.cloudflare.com 'nonce-${nonce}' 'strict-dynamic'`,
    "script-src-attr 'none'",
    "style-src-attr 'unsafe-inline'",
    `frame-src 'unsafe-inline' 'nonce-${nonce}' 'strict-dynamic'`,
    "object-src 'none'",
    "base-uri 'self'",
    "require-trusted-types-for 'script'",
    "upgrade-insecure-requests",
  ].join("; ")

  if (isDev) {
    console.log(csp)
    return
  }

  event.headers.set("Content-Security-Policy", csp)

  event.headers.set("X-Robots-Tag", "noindex, nofollow")

  event.headers.set("Cross-Origin-Embedder-Policy", "require-corp")
  event.headers.set("Cross-Origin-Opener-Policy", "same-origin")
  event.headers.set("Cross-Origin-Resource-Policy", "same-origin")
  event.headers.set("Origin-Agent-Cluster", "?1")
  event.headers.set("Referrer-Policy", "no-referrer")
  event.headers.set(
    "Strict-Transport-Security",
    "max-age=15552000; includeSubDomains",
  )
  event.headers.set("X-Content-Type-Options", "nosniff")
  event.headers.set("X-DNS-Prefetch-Control", "off")
  event.headers.set("X-Download-Options", "noopen")
  event.headers.set("X-Permitted-Cross-Domain-Policies", "none")
  event.headers.delete("X-Powered-By")
  event.headers.set("X-XSS-Protection", "0")
}
