import { $, useComputed$, useSignal } from "@builder.io/qwik";
import type { PokemonSingleResponse } from "~/interfaces";

export const usePokemon = () => {
  const pokemon = useSignal<PokemonSingleResponse>();
  const isLoading = useSignal<boolean>(false);

  const getPokemons = $(
    async (index: number): Promise<PokemonSingleResponse> => {
      isLoading.value = true;
      const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`);
      const data = await resp.json();
      pokemon.value = data;
      isLoading.value = false;
      localStorage.setItem("index", JSON.stringify(index));

      return data;
    }
  );

  return {
    // * Propiedades
    pokemon: useComputed$(() => pokemon.value),
    isLoading,
    // * Metodos
    getPokemons,
  };
};
