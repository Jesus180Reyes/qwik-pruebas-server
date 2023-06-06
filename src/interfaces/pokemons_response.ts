export interface PokemonsResponse {
  ok: boolean;
  pokemons: Pokemon[];
}

export interface Pokemon {
  id: number;
  name: string;
  front_default_img: string;
  back_default_img: string;
}
