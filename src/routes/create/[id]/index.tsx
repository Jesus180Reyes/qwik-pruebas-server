import { component$ } from "@builder.io/qwik";
import { routeLoader$, useLocation } from "@builder.io/qwik-city";
import { PrismaClient } from "@prisma/client";

export const useGetUser = routeLoader$(async ({ params, status }) => {
  const prisma = new PrismaClient();
  console.log(status());
  const user = await prisma.user.findUnique({
    where: { id: Number(params.id) },
  });
  //   if (!user) redirect(301, "/");

  return user;
});
export default component$(() => {
  const user = useGetUser();
  const location = useLocation();
  return (
    <>
      {user.value ? (
        <code>{JSON.stringify(user.value, undefined, 2)}</code>
      ) : (
        <p>El Usuario con el Id: {location.params.id} no existe</p>
      )}
    </>
  );
});
