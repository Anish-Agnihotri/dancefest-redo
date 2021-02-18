import prisma from "@prisma/index";
import { getSession } from "next-auth/client";

export default async (req, res) => {
  const session = await getSession({ req });

  if (session && session.isAdmin) {
    const { id, title, date, judges } = req.body;

    if (id && title && date && judges) {
      const updatedEvent = await prisma.events.update({
        where: {
          id: id,
        },
        data: {
          name: title,
          event_date: new Date(date),
          judges: JSON.stringify(judges),
        },
      });

      // If event creation is successful, return event
      if (updatedEvent) res.send(updatedEvent);
      // Else, return server error
      else res.status(500);
    }
  }

  res.status(401);
};
