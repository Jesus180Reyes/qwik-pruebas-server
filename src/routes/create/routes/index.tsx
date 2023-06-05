import type { RequestHandler } from "@builder.io/qwik-city";
import { PrismaClient } from "@prisma/client";

export const onGet: RequestHandler = async (requestEvent) => {
  // Respond with a JSON object
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();

  requestEvent.json(200, { ok: true, msg: "User created succesfully", users });
};
export const onPut: RequestHandler = async (requestEvent) => {
  const prisma = new PrismaClient();
  const data = await requestEvent.request.json();
  const user = await prisma.user.create(data);
  requestEvent.json(201, { ok: true, user });
};
