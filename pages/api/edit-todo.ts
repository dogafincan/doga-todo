import type { NextApiHandler } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getXataClient } from "@/utils/xata";

const handler: NextApiHandler = async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    const { id, title, isCompleted } = req.body;
    const xata = getXataClient();
    const editedTodo = await xata.db.todos.update(id, { title, isCompleted });
    res.status(200).json(editedTodo);
  } else {
    res.status(204);
    res.end();
  }
};

export default handler;
