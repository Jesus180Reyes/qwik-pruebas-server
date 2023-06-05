import { component$ } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import { routeAction$, zod$, z, Form } from "@builder.io/qwik-city";
import { PrismaClient } from "@prisma/client";

export const onPost: RequestHandler = async (requestEvent) => {
  const prisma = new PrismaClient();
  const data = await requestEvent.request.json();
  const user = await prisma.user.create(data);
  requestEvent.json(201, { ok: true, user });
};
export const useCreateUser = routeAction$(
  async (data) => {
    const prisma = new PrismaClient();
    const user = await prisma.user.create({
      data,
    });
    console.log({ ok: true, msg: "User Created", user });

    return user;
  },
  zod$({
    name: z.string(),
    email: z.string().email(),
  })
);

export default component$(() => {
  const createUserAction = useCreateUser();
  return (
    <section>
      <h1>Create User</h1>
      <Form action={createUserAction} preventdefault:submit>
        <label>
          Name
          <input name="name" value={createUserAction.formData?.get("name")} />
        </label>
        <label>
          Email
          <input name="email" value={createUserAction.formData?.get("email")} />
        </label>
        <button type="submit">Create</button>
      </Form>
      {createUserAction.value && (
        <div>
          <h2>User created successfully!</h2>
        </div>
      )}
    </section>
  );
});
