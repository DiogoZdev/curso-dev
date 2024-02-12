import { NextApiRequest, NextApiResponse } from "next";

export default function status(req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).json({ status: "ok" });
}
