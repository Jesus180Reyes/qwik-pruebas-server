import type { RequestHandler } from "@builder.io/qwik-city";
import { PrismaClient } from "@prisma/client";
import type { PokemonSingleResponse } from "~/interfaces";

export const onPost: RequestHandler = async (req) => {
  const body = await req.request.json();
  const prisma = new PrismaClient();
  if (isNaN(body.id)) {
    req.json(400, { ok: false, msg: "You have to add a number value" });
    return;
  }
  const pokemonExists = await prisma.pokemon.findUnique({
    where: { id: Number(body.id) },
  });
  if (pokemonExists) {
    req.json(400, { ok: false, msg: "This pokemon already Exists" });
    return;
  }
  const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${body.id}`);
  const data: PokemonSingleResponse = await resp.json();

  const pokemon = await prisma.pokemon.create({
    data: {
      id: data.id,
      name: data.name,
      front_default_img: data.sprites.front_default,
      back_default_img: data.sprites.back_default,
    },
  });

  req.json(200, { ok: true, msg: "Pokemon Created succesfullys", pokemon });
};
export const onGet: RequestHandler = async (request) => {
  const primsa = new PrismaClient();

  const pokemons = await primsa.pokemon.findMany();

  request.json(200, { ok: true, pokemons });
};
