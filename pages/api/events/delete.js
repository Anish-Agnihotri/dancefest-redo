import prisma from "@prisma/index";
import { getSession } from "next-auth/client";

export default async (req, res) => {
  const session = await getSession({ req });

  if (session && session.isAdmin) {
    const { id } = req.body;

    if (id) {
      const deletedEvent = await prisma.events.delete({
        where: {
          id: id,
        },
      });

      res.send(deletedEvent);
    }
  }

  res.status(401);
};
