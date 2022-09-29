import type { NextApiHandler } from "next";
import { getXataClient } from "../../utils/xata";

const handler: NextApiHandler = async (req, res) => {
  const { id, title } = req.body;
  const xata = getXataClient();
  const todo = await xata.db.todos.update(id, {
    title,
  });
  res.status(200).json(todo);
};

export default handler;
