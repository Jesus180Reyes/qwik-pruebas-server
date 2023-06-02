import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export const Navbar = component$(() => {
  return (
    <>
      <div>
        <Link href={`/pokemon/ssr/?pokemon_index=1`}>SSR</Link>
      </div>
    </>
  );
});
