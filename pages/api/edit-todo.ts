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

    const todo = await xata.db.todos.filter({ user: user!, id }).getFirst();
    const editedTodo = await todo!.update({ title });

    res.status(200).json(editedTodo);
  } else {
    res.status(204);
    res.end();
  }
};

export default handler;
