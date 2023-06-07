import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { PokemonsResponse } from "~/interfaces/pokemons_response";

export default component$(() => {
  const pokemons = useSignal<PokemonsResponse>();

  useVisibleTask$(async () => {
    const resp = await fetch("/api/pokemon");
    const data = await resp.json();
    pokemons.value = data;
    console.log(data);
    return data;
  });

  return (
    <>
      <div class="pokemons-cont">
        {pokemons.value?.pokemons.map((pokemon) => {
          return (
            <div key={pokemon.id} class="pokemon-card">
              <h2>{pokemon.name}</h2>
              <img
                src={pokemon.front_default_img}
                alt={pokemon.id.toString()}
                width={100}
                height={100}
              />
            </div>
          );
        })}
      </div>
      ;
    </>
  );
});
