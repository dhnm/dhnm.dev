import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import {
  routeLoader$,
  Form,
  routeAction$,
  zod$,
  z,
  server$,
} from "@builder.io/qwik-city";

export const useDadJoke = routeLoader$(async () => {
  const response = await fetch("https://icanhazdadjoke.com", {
    headers: { Accept: "application/json" },
  });
  return (await response.json()) as {
    id: string;
    status: number;
    joke: string;
  };
});

export const useJokeVoteAction = routeAction$(
  (props) => {
    console.log("VOTE", props);
  },
  zod$({ jokeID: z.string().max(5), vote: z.string().min(5) }),
);

const ThreeDButton = (props) => {
  return (
    <button
      {...props}
      class="btn h-16 w-16 select-none
border-blue-400  bg-blue-500 transition-all duration-150
[box-shadow:0_5px_0_0_#1b6ff8,0_10px_0_0_#1b70f841]
hover:border-blue-400 hover:bg-blue-500 active:translate-y-1
active:border-b-[0px] active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]
"
    >
      <span class="flex h-full flex-col items-center justify-center text-lg font-bold text-white ">
        {props.children}
      </span>
    </button>
  );
};

export default component$(() => {
  const dadJokeSignal = useDadJoke();
  const favoriteJokeAction = useJokeVoteAction();
  const isFavoriteSignal = useSignal(false);

  useTask$(({ track }) => {
    track(() => isFavoriteSignal.value);
    console.log("FAVORITE (isomorphic)", isFavoriteSignal.value);
    server$(() => {
      console.log("FAVORITE (server)", isFavoriteSignal.value);
    })();
  });

  return (
    <section class="bg-base-200 p-16 text-center text-xl font-bold">
      <p>{dadJokeSignal.value.joke}</p>
      <Form action={favoriteJokeAction}>
        <input type="hidden" name="jokeID" value={dadJokeSignal.value.id} />
        {favoriteJokeAction.value?.failed && (
          <p>{favoriteJokeAction.value.fieldErrors?.jokeID}</p>
        )}
        {favoriteJokeAction.value?.failed && (
          <p>{favoriteJokeAction.value.fieldErrors?.vote}</p>
        )}
        <ThreeDButton name="vote" value="up">
          👍
        </ThreeDButton>{" "}
        <ThreeDButton name="vote" value="down">
          👎
        </ThreeDButton>
      </Form>
      <span class="-mt-4 block">&nbsp;</span>
      <ThreeDButton
        onClick$={() => {
          isFavoriteSignal.value = !isFavoriteSignal.value;
        }}
      >
        {isFavoriteSignal.value ? "❤️" : "🤍"}
      </ThreeDButton>
      <div class="skeleton h-32 w-64">Hello</div>
    </section>
  );
});
