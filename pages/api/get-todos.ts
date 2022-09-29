import type { NextApiHandler } from "next";
import { getXataClient } from "../../utils/xata";

const handler: NextApiHandler = async (_req, res) => {
  const xata = getXataClient();
  const todos = await xata.db.todos.getAll();
  res.status(200).json(todos);
};

export default handler;
