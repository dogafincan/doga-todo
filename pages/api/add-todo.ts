import type { NextApiHandler } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { getXataClient } from "../../utils/xata";

const handler: NextApiHandler = async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    const { id, title } = req.body;
    const xata = getXataClient();

    const todo = await xata.db.todos.create(id, {
      title,
      createdAt: new Date(),
      createdBy: session.user!.email!,
    });

    res.status(200).json(todo);
  } else {
    res.status(204);
    res.end();
  }
};

export default handler;
