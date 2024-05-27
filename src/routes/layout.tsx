import { $, component$, Slot, useOnWindow, useSignal } from "@builder.io/qwik"
import type {
  DocumentHead,
  DocumentMeta,
  RequestHandler,
} from "@builder.io/qwik-city"

import * as THREE from "three"

import Header from "../components/Header"
import Footer from "../components/Footer"
import clsx from "clsx"

export const head: DocumentHead = ({ head }) => {
  const title = head.title
    ? head.title + " - Nhật Minh"
    : "Nhật Minh - Software & People"
  const defaultMeta: Array<DocumentMeta> = [
    {
      name: "description",
      content:
        "Hey there! I'm all about turning code into something amazing and getting machines to learn new tricks. Let's craft some beautiful and efficient software experiences.",
    },
    { name: "author", content: "Nhật Minh Đinh Huy" },
    {
      name: "keywords",
      content:
        "personal website, portfolio, software engineer, developer, react, javascript, machine learning, artificial intelligence, apps, iOS, app developer",
    },
  ]

  const meta: Array<DocumentMeta> = []

  defaultMeta.forEach((dm) => {
    const index = head.meta.findIndex((m) => m.name === dm.name)
    if (index === -1) {
      meta.push(dm)
    }
  })

  return {
    title,
    meta,
  }
}

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  })
}

const Background = component$(
  ({
    theme = "light",
    class: className,
  }: {
    theme?: "dark" | "light"
    class: string
  }) => {
    const canvas = useSignal<HTMLCanvasElement>()

    useOnWindow(
      "load",
      $(() => {
        const renderer = new THREE.WebGLRenderer({
          canvas: canvas.value,
          antialias: true,
        })
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000,
        )
        const mouse = new THREE.Vector2()

        renderer.setSize(window.innerWidth, window.innerHeight)
        camera.position.z = 1

        const geometry = new THREE.PlaneGeometry(2, 2)
        const material = new THREE.ShaderMaterial({
          uniforms: {
            u_time: { value: 1.0 },
            u_mouse: { value: new THREE.Vector2() },
            u_resolution: {
              value: new THREE.Vector2(window.innerWidth, window.innerHeight),
            },
          },
          vertexShader: `
            varying vec2 v_uv;
            void main() {
                v_uv = uv;
                gl_Position = vec4(position, 1.0);
            }
        `,
          fragmentShader: `
            uniform vec2 u_resolution;
            uniform vec2 u_mouse;
            uniform float u_time;
            varying vec2 v_uv;

            // 2D Simplex Noise
            vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
            float snoise(vec2 v)
            {
              const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
              vec2 i = floor(v + dot(v, C.yy) );
              vec2 x0 = v - i + dot(i, C.xx);
              vec2 i1;
              i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
              vec4 x12 = x0.xyxy + C.xxzz;
              x12.xy -= i1;
              i = mod289(i);
              vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
              vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
              m = m * m;
              m = m * m;
              vec3 x = 2.0 * fract(p * C.www) - 1.0;
              vec3 h = abs(x) - 0.5;
              vec3 ox = floor(x + 0.5);
              vec3 a0 = x - ox;
              m *= 1.79284291400159 - 0.85373472095314 * ( a0 * a0 + h * h );
              vec3 g;
              g.x = a0.x  * x0.x  + h.x  * x0.y;
              g.yz = a0.yz * x12.xz + h.yz * x12.yw;
              return 130.0 * dot(m, g);
            }

            void main() {
                vec2 uv = gl_FragCoord.xy / u_resolution;
                vec2 pos = uv + u_mouse * 0.1;
                float n = snoise(pos + u_time * 0.1);

                ${
                  theme === "light"
                    ? `
                vec3 deepWater = vec3(0.942, 0.976, 0.999); // sky-50
                vec3 shallowWater = vec3(0.6, 0.965, 0.894); // teal-100

                float depthFactor = smoothstep(0.0, 0.0, uv.y);

                float lightEffect = 1.0 + 0.3 * (0.5 + 0.5 * sin(u_time * 0.5 + uv.y * 5.0));
                `
                    : `
                vec3 deepWater = vec3(0.032, 0.184, 0.286); // sky-950
                vec3 shallowWater = vec3(0.047, 0.580, 0.533); // teal-600
                float depthFactor = smoothstep(0.0, 1.0, uv.y);

                float lightEffect = 0.8 + 0.3 * sin(u_time * 0.5 + uv.y * 5.0);
                `
                }

                vec3 color = mix(deepWater, shallowWater, depthFactor * (n * 0.5 + 0.5)) * lightEffect;
                gl_FragColor = vec4(color, 1.0);
            }
        `,
        })

        const plane = new THREE.Mesh(geometry, material)
        scene.add(plane)

        function animate() {
          material.uniforms.u_time.value += 0.01
          renderer.render(scene, camera)
          requestAnimationFrame(animate)
        }

        window.addEventListener("mousemove", (event) => {
          mouse.x = (event.clientX / window.innerWidth) * 2 - 1
          mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
          material.uniforms.u_mouse.value = mouse
        })

        window.addEventListener("resize", () => {
          renderer.setSize(window.innerWidth, window.innerHeight)
          material.uniforms.u_resolution.value.set(
            window.innerWidth,
            window.innerHeight,
          )
        })

        animate()
      }),
    )

    return (
      <canvas
        ref={canvas}
        class={clsx("fixed inset-0 h-full w-full", className)}
      ></canvas>
    )
  },
)

export default component$(() => {
  return (
    <>
      <div class="flex w-full">
        <Background class="dark:hidden" />
        <Background theme="dark" class="hidden dark:block" />
        <div class="relative flex w-full flex-col">
          <Header />
          <main class="flex-auto">
            <Slot />
          </main>
          <Footer />
        </div>
      </div>
    </>
  )
})
