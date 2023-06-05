import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { PrismaClient } from "@prisma/client";

export const useUsersLoader = routeLoader$(async () => {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();
  console.log({ users });
  return users;
});
export default component$(() => {
  const users = useUsersLoader();
  return (
    <>
      {users.value.map((user, i) => {
        return <h1 key={i}>{user.name}</h1>;
      })}
      <code>{JSON.stringify(users.value, undefined, 2)}</code>
    </>
  );
});
