import { component$, useSignal, $, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemon/PokemonImage";
import { usePokemon } from "~/hooks/usePokemon";

// export const usePokemonAction = routeAction$((data) => {
//   const { pokemon } = data;
//   console.log(pokemon);
//   return {
//     ok: true,
//     pokemon: pokemon,
//   };
// });
export default component$(() => {
  const { isLoading, getPokemons, pokemon } = usePokemon();
  const pokemonInput = useSignal<number>(1);
  //   const onSubmit = $(() => {
  //     getPokemons(pokemonInput.value);
  //   });
  useVisibleTask$(async ({ track }) => {
    track(() => (isLoading.value = true));
    const index = localStorage.getItem("index");
    pokemonInput.value = JSON.parse(index!);
    await getPokemons(pokemonInput.value);
    console.log("Desde el cliente");
  });
  const onHandlerNextPokemon = $(async () => {
    await getPokemons((pokemonInput.value += 1));
  });
  const onHandlerPreviewPokemon = $(async () => {
    if (pokemonInput.value <= 1) return;
    await getPokemons((pokemonInput.value -= 1));
  });
  return (
    <>
      <div class="pokemon-container">
        <div class="pokemon-id">
          <h1>{pokemon.value?.id}</h1>
        </div>
        <h1>Pokemon Page</h1>
        {/* <form onSubmit$={onSubmit} preventdefault:submit>
          <input
            type="text"
            id="pokemon"
            name="pokemon"
            placeholder="ingresa un pokemon"
            onInput$={(e) =>
              (pokemonInput.value = (e.target as HTMLInputElement).value)
            }
          />
          <button type="submit">Submit</button>
        </form> */}
        <div class="btn-pokemon">
          <button
            class="btn"
            disabled={isLoading.value}
            onClick$={onHandlerPreviewPokemon}
          >
            Anterior
          </button>
          <button
            disabled={isLoading.value}
            class="btn"
            onClick$={onHandlerNextPokemon}
          >
            Siguiente
          </button>
        </div>
        {isLoading.value && <p>Cargando....</p>}
        <PokemonImage pokemon={pokemon.value!} />
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Pokemon Client Page",
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
  links: [
    {
      rel: "icon",
      type: "image/svg+xml",
      href: "./public/favicon.svg",
    },
  ],
};
