import type { NextApiHandler } from "next";
import { getXataClient } from "../../utils/xata";

const handler: NextApiHandler = async (req, res) => {
  const { title } = req.body;
  const xata = getXataClient();
  const todo = await xata.db.todos.create({ title });
  res.status(200).json(todo);
};

export default handler;
