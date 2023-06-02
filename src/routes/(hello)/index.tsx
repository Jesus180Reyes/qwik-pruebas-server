import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <h1>Hola mundo</h1>
    </>
  );
});

export const head: DocumentHead = {
  title: "Hello World",
  meta: [
    {
      name: "Pokemon Client",
      content: "This is a simple Qwik Pokemon App",
    },
    {
      name: "Pokemons",
      content: "Pokemons",
    },
  ],
};
