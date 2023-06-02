import { Slot, component$ } from "@builder.io/qwik";
import { Navbar } from "~/components/shared/Navbar";

export default component$(() => {
  return (
    <>
      <Navbar />
      <Slot />
    </>
  );
});
