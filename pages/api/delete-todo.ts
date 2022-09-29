import type { NextApiHandler } from "next";
import { getXataClient } from "../../utils/xata";

const handler: NextApiHandler = async (req, res) => {
  const { id } = req.body;
  const xata = getXataClient();
  const todo = await xata.db.todos.delete(id);
  res.status(200).json(todo);
};

export default handler;
