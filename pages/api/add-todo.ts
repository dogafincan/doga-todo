import type { NextApiHandler } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "@pages/api/auth/[...nextauth]";
import { getXataClient } from "@utils/xata";

const handler: NextApiHandler = async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    const { id, title } = req.body;
    const xata = getXataClient();

    const user = await xata.db.nextauth_users
      .filter({ email: session.user!.email! })
      .getFirst();

    const todo = await xata.db.todos.create(id, {
      title,
      createdAt: new Date(),
      user: { id: user!.id },
    });

    res.status(200).json(todo);
  } else {
    res.status(204);
    res.end();
  }
};

export default handler;
