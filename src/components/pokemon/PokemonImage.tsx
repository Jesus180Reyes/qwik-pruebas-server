import { component$ } from "@builder.io/qwik";
import type { PokemonSingleResponse } from "~/interfaces";

interface Props {
  pokemon: PokemonSingleResponse;
}
export const PokemonImage = component$(({ pokemon }: Props) => {
  return (
    <>
      <h3>
        {pokemon
          ? pokemon?.name[0].toUpperCase() + pokemon?.name.slice(1)
          : "No existe"}
      </h3>
      <img
        src={pokemon?.sprites.front_default}
        alt={pokemon?.name}
        width={200}
        height={200}
      />
    </>
  );
});
