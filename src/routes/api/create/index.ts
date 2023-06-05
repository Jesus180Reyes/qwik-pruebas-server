import type { RequestHandler } from "@builder.io/qwik-city";
import { PrismaClient } from "@prisma/client";

export const onGet: RequestHandler = async (requestEvent) => {
  // Respond with a JSON object/
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();

  requestEvent.json(200, { ok: true, users });
};

export const onPost: RequestHandler = async (requestEvent) => {
  try {
    const prisma = new PrismaClient();
    const data = await requestEvent.request.json();
    const existUser = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existUser) {
      requestEvent.json(400, {
        ok: false,
        msg: "User already exist",
      });
      return;
    }
    const user = await prisma.user.create({ data });
    requestEvent.json(201, { ok: true, msg: "User created Succesfully", user });
  } catch (error) {
    console.log(`Hable con el admnistrado:: ${error}`);
    requestEvent.json(500, {
      ok: false,
      msg: `Hable con el administrador ${error}`,
    });
  }
};

// export const onPost: RequestHandler = async (requestEvent) => {
//   const prisma = new PrismaClient();
//   const data = await requestEvent.request.json();
//   const users = await prisma.user.create({
//     data,
//   });
//   requestEvent.json(201, { ok: true, users });
// };
export const onPut: RequestHandler = async (requestEvent) => {
  const prisma = new PrismaClient();
  const data = await requestEvent.request.json();
  const user = await prisma.user.update({
    where: { email: data.email },
    data: { name: data.name },
  });
  requestEvent.json(200, { ok: true, user });
};

export const onDelete: RequestHandler = async (requestEvent) => {
  try {
    const prisma = new PrismaClient();
    const { email } = await requestEvent.request.json();
    const userExists = await prisma.user.findUnique({
      where: { email: email },
    });
    if (!userExists) {
      requestEvent.json(200, { ok: false, msg: "This user is Already Exists" });
      return;
    }
    const user = await prisma.user.delete({ where: { email: email } });

    requestEvent.json(200, { ok: true, user });
  } catch (error) {
    console.log(error);
    requestEvent.json(500, {
      ok: false,
      msg: `Hable con el administrador:: ${error}`,
    });
    return;
  }
};
