import { component$, Slot } from "@builder.io/qwik";
import type {
  DocumentHead,
  DocumentMeta,
  RequestHandler,
} from "@builder.io/qwik-city";

import "@fontsource/fira-sans";

import Header from "../components/Header";
import Footer from "../components/Footer";

export const head: DocumentHead = ({ head }) => {
  const title = head.title
    ? head.title + " - Nhật Minh"
    : "Nhật Minh - Software Engineer";
  const defaultMeta: Array<DocumentMeta> = [
    {
      name: "description",
      content: "I am Nhật Minh, a software engineer based in England.",
    },
    { name: "author", content: "Nhật Minh Đinh Huy" },
    {
      name: "keywords",
      content: "personal website, portfolio, software engineer, developer",
    },
  ];

  const meta: Array<DocumentMeta> = [];

  defaultMeta.forEach((dm) => {
    const index = head.meta.findIndex((m) => m.name === dm.name);
    if (index === -1) {
      meta.push(dm);
    }
  });

  return {
    title,
    meta,
  };
};

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export default component$(() => {
  return (
    <>
      <div class="flex w-full">
        <div class="fixed inset-0 flex justify-center sm:px-8">
          <div class="flex w-full max-w-7xl lg:px-8">
            <div class="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
          </div>
        </div>
        <div class="relative flex w-full flex-col">
          <Header />
          <main class="flex-auto">
            <Slot />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
});
