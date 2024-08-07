import { component$, type PropsOf } from "@builder.io/qwik"

export const DocumentIcon = component$((props: PropsOf<"svg">) => {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill-rule="evenodd"
      clip-rule="evenodd"
      stroke-linejoin="round"
      stroke-miterlimit="2"
      {...props}
    >
      <path
        d="M22,8.5L22,21C22,21.55 21.55,22 21,22L3,22C2.45,22 2,21.55 2,21L2,3C2,2.45 2.45,2 3,2L15.5,2L15.5,8C15.5,8.276 15.724,8.5 16,8.5L22,8.5ZM16.5,2L16.59,2C16.85,2 17.11,2.11 17.29,2.29L21.7,6.7C21.89,6.89 22,7.15 22,7.41L22,7.5L16.5,7.5L16.5,2ZM7,17.5L17,17.5C17.276,17.5 17.5,17.276 17.5,17C17.5,16.724 17.276,16.5 17,16.5L7,16.5C6.724,16.5 6.5,16.724 6.5,17C6.5,17.276 6.724,17.5 7,17.5ZM7,12.5L17,12.5C17.276,12.5 17.5,12.276 17.5,12C17.5,11.724 17.276,11.5 17,11.5L7,11.5C6.724,11.5 6.5,11.724 6.5,12C6.5,12.276 6.724,12.5 7,12.5ZM7,7.5L12,7.5C12.276,7.5 12.5,7.276 12.5,7C12.5,6.724 12.276,6.5 12,6.5L7,6.5C6.724,6.5 6.5,6.724 6.5,7C6.5,7.276 6.724,7.5 7,7.5Z"
        fill-rule="nonzero"
      />
      <path
        d="M16,2L16,8L22,8L22,7.41C22,7.15 21.89,6.89 21.71,6.71L17.29,2.29C17.11,2.11 16.85,2 16.59,2L16,2Z"
        fill-rule="nonzero"
      />
    </svg>
  )
})

export function CloseIcon(props: PropsOf<"svg">) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M22.7071 1.29289C23.0976 1.68342 23.0976 2.31658 22.7071 2.70711L2.70711 22.7071C2.31658 23.0976 1.68342 23.0976 1.29289 22.7071C0.902369 22.3166 0.902369 21.6834 1.29289 21.2929L21.2929 1.29289C21.6834 0.902369 22.3166 0.902369 22.7071 1.29289Z"
        clip-rule="evenodd"
        fill-rule="evenodd"
      />
      <path
        d="M1.29289 1.29289C1.68342 0.902369 2.31658 0.902369 2.70711 1.29289L22.7071 21.2929C23.0976 21.6834 23.0976 22.3166 22.7071 22.7071C22.3166 23.0976 21.6834 23.0976 21.2929 22.7071L1.29289 2.70711C0.902369 2.31658 0.902369 1.68342 1.29289 1.29289Z"
        clip-rule="evenodd"
        fill-rule="evenodd"
      />
    </svg>
  )
}

export function ChevronDownIcon(props: PropsOf<"svg">) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M3.29289 7.29289C3.68342 6.90237 4.31658 6.90237 4.70711 7.29289L12 14.5858L19.2929 7.29289C19.6834 6.90237 20.3166 6.90237 20.7071 7.29289C21.0976 7.68342 21.0976 8.31658 20.7071 8.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L3.29289 8.70711C2.90237 8.31658 2.90237 7.68342 3.29289 7.29289Z"
        clip-rule="evenodd"
        fill-rule="evenodd"
      ></path>
    </svg>
  )
}

export function LinkedInIcon(props: PropsOf<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill-rule="evenodd"
      clip-rule="evenodd"
      stroke-linejoin="round"
      stroke-miterlimit="2"
      {...props}
    >
      <path
        d="M19.34,22L4.66,22C3.19,22 2,20.81 2,19.34L2,4.66C2,3.19 3.19,2 4.66,2L19.33,2C20.81,2 22,3.19 22,4.66L22,19.33C22,20.81 20.81,22 19.34,22ZM11.5,11.558L11.5,10.01C11.5,9.734 11.276,9.51 11,9.51C10.724,9.51 10.5,9.734 10.5,10.01L10.5,17C10.5,17.276 10.724,17.5 11,17.5C11.276,17.5 11.5,17.276 11.5,17L11.5,12.874C11.537,12.84 11.574,12.807 11.61,12.776C12.345,12.138 13.117,11.518 13.967,11.035L13.97,11.033C14.344,10.817 14.879,10.572 15.388,10.516C15.759,10.475 16.122,10.539 16.314,10.917L16.316,10.92C16.55,11.371 16.5,11.946 16.5,12.44L16.5,17C16.5,17.276 16.724,17.5 17,17.5C17.276,17.5 17.5,17.276 17.5,17L17.5,12.44C17.5,11.794 17.51,11.051 17.205,10.461C16.871,9.807 16.321,9.541 15.702,9.508C14.941,9.468 14.053,9.831 13.473,10.166C12.773,10.563 12.121,11.046 11.5,11.558ZM7,7.5C7.552,7.5 8,7.052 8,6.5C8,5.948 7.552,5.5 7,5.5C6.448,5.5 6,5.948 6,6.5C6,7.052 6.448,7.5 7,7.5ZM6.5,10L6.5,17C6.5,17.276 6.724,17.5 7,17.5C7.276,17.5 7.5,17.276 7.5,17L7.5,10C7.5,9.724 7.276,9.5 7,9.5C6.724,9.5 6.5,9.724 6.5,10Z"
        fill-rule="nonzero"
      />
    </svg>
  )
}

export function GitHubIcon(props: PropsOf<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill-rule="evenodd"
      clip-rule="evenodd"
      stroke-linejoin="round"
      stroke-miterlimit="2"
      {...props}
    >
      <path
        d="M20.88,6.72C22.76,5 21.7,2 21.7,2C21.7,2 18.7,2 17.65,3.87C17.05,3.65 16.41,3.51 15.74,3.51L12.77,3.51C12.12,3.51 11.5,3.64 10.92,3.85C9.87,2 6.89,2 6.89,2C6.89,2 5.84,5 7.71,6.72C7.71,6.72 7.22,8.19 7.22,9.07C7.22,11.73 9.11,13.96 11.61,14.5C11.43,14.88 11.33,15.29 11.33,15.73L11.33,18.61C10.64,18.77 8.97,19.39 8.41,17.68C7.96,16.31 5.98,13.74 3.34,14C2.53,14.07 1.93,14.79 2.01,15.6C2.09,16.41 2.8,17.02 3.61,16.93C3.97,16.89 5.12,17.39 5.67,18.77C6.01,19.61 6.32,20.4 6.95,20.93C7.62,21.51 8.5,21.69 9.36,21.69C9.86,21.69 11.21,21.62 11.64,21.54C12.12,22.51 17.19,21.86 17.19,20.25L17.19,15.72C17.19,15.28 17.08,14.86 16.91,14.49C19.41,13.95 21.3,11.72 21.3,9.06C21.3,8.14 20.88,6.72 20.88,6.72Z"
        fill-rule="nonzero"
      />
    </svg>
  )
}

export function MailIcon(props: PropsOf<"svg">) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" {...props}>
      <path
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke-miterlimit="10"
        stroke-width="1.5"
        d="M20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20Z"
      ></path>
      <path
        stroke-linecap="round"
        stroke-miterlimit="10"
        stroke-width="1.5"
        d="M20 4H4C2.9 4 2 4.9 2 6L12 13L22 6C22 4.9 21.1 4 20 4Z"
      ></path>
    </svg>
  )
}

export function ErrorIcon(props: PropsOf<"svg">) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" {...props}>
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
}

export function SuccessIcon(props: PropsOf<"svg">) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" {...props}>
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
}

export function PlayIcon(props: PropsOf<"svg">) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M18.51 11.14L6.51 4.13998C5.84 3.74998 5 4.22998 5 4.99998V19C5 19.77 5.84 20.25 6.5 19.86L18.5 12.86C19.17 12.48 19.17 11.52 18.51 11.14Z"
        mask="url(#mask_playicon)"
      ></path>
      <mask id="mask_playicon">
        <rect width="100%" height="100%" fill="white"></rect>
      </mask>
    </svg>
  )
}

export function ChevronRightIcon(props: PropsOf<"svg">) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.29289 3.29289C7.68342 2.90237 8.31658 2.90237 8.70711 3.29289L16.7071 11.2929C17.0976 11.6834 17.0976 12.3166 16.7071 12.7071L8.70711 20.7071C8.31658 21.0976 7.68342 21.0976 7.29289 20.7071C6.90237 20.3166 6.90237 19.6834 7.29289 19.2929L14.5858 12L7.29289 4.70711C6.90237 4.31658 6.90237 3.68342 7.29289 3.29289Z"
        mask="url(#mask_chevronrighticon)"
      ></path>
      <mask id="mask_chevronrighticon">
        <rect width="100%" height="100%" fill="white"></rect>
      </mask>
    </svg>
  )
}

export function CodeIcon(props: PropsOf<"svg">) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16.7929 6.79289C17.1834 6.40237 17.8166 6.40237 18.2071 6.79289L22.7071 11.2929C23.0976 11.6834 23.0976 12.3166 22.7071 12.7071L18.2071 17.2071C17.8166 17.5976 17.1834 17.5976 16.7929 17.2071C16.4024 16.8166 16.4024 16.1834 16.7929 15.7929L20.5858 12L16.7929 8.20711C16.4024 7.81658 16.4024 7.18342 16.7929 6.79289Z"
        mask="url(#mask_codeicon)"
      ></path>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.20711 6.79289C7.59763 7.18342 7.59763 7.81658 7.20711 8.20711L3.41421 12L7.20711 15.7929C7.59763 16.1834 7.59763 16.8166 7.20711 17.2071C6.81658 17.5976 6.18342 17.5976 5.79289 17.2071L1.29289 12.7071C0.902369 12.3166 0.902369 11.6834 1.29289 11.2929L5.79289 6.79289C6.18342 6.40237 6.81658 6.40237 7.20711 6.79289Z"
        mask="url(#mask_codeicon)"
      ></path>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15.4282 3.06638C15.9439 3.26425 16.2014 3.84265 16.0036 4.35827L9.86357 20.3583C9.6657 20.8739 9.0873 21.1315 8.57168 20.9336C8.05606 20.7357 7.79847 20.1573 7.99634 19.6417L14.1363 3.64172C14.3342 3.1261 14.9126 2.86851 15.4282 3.06638Z"
        mask="url(#mask_codeicon)"
      ></path>
      <mask id="mask_codeicon">
        <rect width="100%" height="100%" fill="white"></rect>
      </mask>
    </svg>
  )
}
