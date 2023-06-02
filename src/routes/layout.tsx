import { component$, Slot } from "@builder.io/qwik";
import "../global.css";
import { useDocumentHead } from "@builder.io/qwik-city";
export default component$(() => {
  const head = useDocumentHead();

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="./public/favicon.svg" />
      <title>{head.title}</title>

      {head.meta.map((m) => {
        return <meta {...m} key={m.key} />;
      })}
      {head.links.map((l) => (
        <link {...l} key={l.key} />
      ))}
      <main>
        <Slot />
      </main>
    </>
  );
});
