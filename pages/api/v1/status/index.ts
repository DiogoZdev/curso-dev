import database from "../../../../infra/database";

import { NextApiRequest, NextApiResponse } from "next";

export default async function status(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await database.query("SELECT 1 + 1;");
  console.log(result);

  return res.status(200).json({ status: "ok" });
}
