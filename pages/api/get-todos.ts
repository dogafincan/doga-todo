import type { NextApiHandler } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getXataClient } from "@/utils/xata";

const handler: NextApiHandler = async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    const xata = getXataClient();

    const todos = await xata.db.todos
      .filter("createdBy", session.user!.email!)
      .sort("createdAt", "desc")
      .getAll();

    res.status(200).json(todos);
  } else {
    res.status(204);
    res.end();
  }
};

export default handler;
