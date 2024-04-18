import { $, component$, useSignal } from "@builder.io/qwik"
import type { Signal } from "@builder.io/qwik"
import { Form } from "@builder.io/qwik-city"
import clsx from "clsx"

import { ErrorIcon, MailIcon, SuccessIcon } from "~/components/icons"
import TextLink from "~/components/TextLink"
import Turnstile from "~/components/Turnstile"

import { verifyToken, type useSendEmail, ObscureEmail } from "."

const ContactForm = component$(
  ({
    action,
    myEmail,
  }: {
    action: ReturnType<typeof useSendEmail>
    myEmail: Signal<string | undefined>
  }) => {
    const failedVerifyAttempts = useSignal(0)

    const handleVerifySuccess = $((email: string) => {
      myEmail.value = email
    })

    const handleVerifyError = $(() => {
      failedVerifyAttempts.value++
      if (failedVerifyAttempts.value == 2) {
        console.error("Second verification failed.")
        window.turnstile.reset()
      } else if (failedVerifyAttempts.value > 2) {
        console.error("Second verification failed two times.")
      }
    })

    const turnstileVerify = $(async (token: string) => {
      try {
        const response = await verifyToken(
          token,
          failedVerifyAttempts.value == 0 ? "invisible" : "managed",
        )

        if (response.status == 200) {
          handleVerifySuccess(response.message!)
          return
        }
        console.error(response.status)
      } catch (e) {
        console.error(e)
      }

      handleVerifyError()
    })

    return (
      <Form
        action={action}
        class="rounded-2xl border border-base-content/10 p-3 backdrop-blur sm:p-6"
      >
        <h2 class="flex text-sm font-semibold">
          <MailIcon class="h-5 w-5 flex-none" />
          <span class="ml-3 tracking-tight">Send me a message</span>
        </h2>
        <p class="mt-2 text-sm">
          Message me on{" "}
          {myEmail.value ? (
            <TextLink href={`mailto:${myEmail.value}`}>
              {myEmail.value}
            </TextLink>
          ) : (
            <ObscureEmail />
          )}{" "}
          or use the following form:
        </p>
        {action.value?.failed !== false && (
          <>
            <div class="mt-4">
              <textarea
                placeholder="Your Message"
                aria-label="Message"
                name="message"
                minLength={15}
                maxLength={3000}
                class="textarea textarea-bordered w-full text-base focus:outline-primary"
                rows={2}
                required
              ></textarea>
            </div>
            <div class="mt-1 flex space-x-2">
              <input
                type="email"
                placeholder="Your E-mail Address"
                aria-label="Your E-mail Address"
                name="email"
                required
                class="input input-bordered w-full text-base focus:outline-primary"
              />
              <button
                type="submit"
                class={"btn btn-primary btn-md"}
                disabled={action.isRunning}
              >
                {action.isRunning ? (
                  <span class="loading loading-spinner" />
                ) : (
                  "Send"
                )}
              </button>
            </div>
            <div class="flex justify-center">
              {failedVerifyAttempts.value == 0 && (
                <Turnstile
                  sitekey={import.meta.env.PUBLIC_CF_INVISIBLE_SITEKEY}
                  onError={handleVerifyError}
                  onVerify={turnstileVerify}
                />
              )}
              {failedVerifyAttempts.value > 0 &&
                failedVerifyAttempts.value < 3 && (
                  <Turnstile
                    sitekey={import.meta.env.PUBLIC_CF_MANAGED_SITEKEY}
                    onError={handleVerifyError}
                    onVerify={turnstileVerify}
                    class="mt-3"
                  />
                )}
            </div>
          </>
        )}
        {action.value?.failed === false && (
          <div
            role="alert"
            class="alert mt-3 border-success/10 bg-success/5 text-sm"
          >
            <SuccessIcon class="h-6 w-6 shrink-0 stroke-success" />
            <span>Message sent! I'll get back to you as soon as I can.</span>
          </div>
        )}

        <div
          role="alert"
          class={clsx(
            "alert mt-3 border-error/10 bg-error/5 text-sm",
            action.value?.failed || "hidden",
          )}
        >
          <ErrorIcon class="h-6 w-6 shrink-0 stroke-error" />
          <span>
            {action.value?.failed && (
              <>
                <p class="text-sm font-semibold">Failed to send message.</p>
                {!!action.value.fieldErrors || (
                  <p class="text-sm">Please send me an e-mail instead.</p>
                )}
                {[
                  action.value.fieldErrors?.message,
                  action.value.fieldErrors?.email,
                  action.value.fieldErrors?.["cf-turnstile-response"],
                ]
                  .filter((e) => e)
                  .map((fieldError) => (
                    <p class="mt-1 text-sm" key={fieldError![0]}>
                      {fieldError![0]}
                    </p>
                  ))}
                {action.value.formErrors?.map((error) => (
                  <p class="mt-1 text-sm" key={error}>
                    {error}
                  </p>
                ))}
                {action.value.message && (
                  <p class="mt-1 text-sm">{action.value.message}</p>
                )}
              </>
            )}
          </span>
        </div>
      </Form>
    )
  },
)

export default ContactForm
