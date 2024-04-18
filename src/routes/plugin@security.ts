import type { RequestHandler } from "@builder.io/qwik-city"
import { isDev } from "@builder.io/qwik/build"

export const onRequest: RequestHandler = (event) => {
  if (isDev) return

  const nonce = Array.from(crypto.getRandomValues(new Uint8Array(16)), (byte) =>
    ("0" + (byte & 0xff).toString(16)).slice(-2),
  ).join("")

  event.sharedMap.set("@nonce", nonce)

  const csp = [
    "default-src 'self' 'unsafe-inline",
    "font-src 'self' https: data:",
    "form-action 'self'",
    "frame-ancestors 'self'",
    "img-src 'self' 'unsafe-inline' data:",
    `script-src 'self' 'unsafe-inline' https: 'nonce-${nonce}' 'strict-dynamic'`,
    "script-src-attr 'none'",
    "style-src 'self' https: 'unsafe-inline'",
    `frame-src 'self' 'nonce-${nonce}'`,
    "object-src 'none'",
    "base-uri 'self'",
    "upgrade-insecure-requests",
  ]

  event.headers.set("Content-Security-Policy", csp.join("; "))

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
  event.headers.set("X-Frame-Options", "SAMEORIGIN")
  event.headers.set("X-Permitted-Cross-Domain-Policies", "none")
  event.headers.delete("X-Powered-By")
  event.headers.set("X-XSS-Protection", "0")
}
