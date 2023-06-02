import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useNavigate } from "@builder.io/qwik-city";
import { useLocation } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemon/PokemonImage";
import type { PokemonSingleResponse } from "~/interfaces";

export const usePokemonLoader = routeLoader$(
  async ({ query, redirect, pathname }): Promise<PokemonSingleResponse> => {
    const pokemonQuery = Number(query.get("pokemon_index"));
    if (isNaN(pokemonQuery)) redirect(301, pathname);
    const resp = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonQuery || 1}`
    );
    const data = await resp.json();
    console.log("Desde el server");

    return data;
  }
);
export default component$(() => {
  const data = usePokemonLoader();
  const location = useLocation();
  const navigate = useNavigate();
  const index = Number(location.url.searchParams.get("pokemon_index"));
  const pokemonIndex = useSignal<number>(index);

  return (
    <>
      <div class="pokemon-container">
        <h1>Pokemon SSR</h1>

        <PokemonImage pokemon={data.value} />
        <div class="btn-pokemon">
          <button
            class="btn"
            onClick$={() =>
              navigate(
                `/pokemon/ssr/?pokemon_index=${(pokemonIndex.value -= 1)}`
              )
            }
          >
            Anterior
          </button>
          <button
            class="btn"
            onClick$={() =>
              navigate(
                `/pokemon/ssr/?pokemon_index=${(pokemonIndex.value += 1)}`
              )
            }
          >
            Siguiente
          </button>
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Pokemon SSR",
};
