import type { NextApiRequest, NextApiResponse } from "next";

import { Submarine } from "pinata-submarine";
const fs = require("fs");

// uploads to ipfs
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const submarine = new Submarine(
      process.env.IPFS_SUB_KEY!,
      "https://patterndao.mypinata.cloud"
    );
    const { path } = req.body;
    const ipfs_res = await submarine.uploadFileOrFolder(path);
    await fs.unlinkSync(path);
    return res.status(200).json({ cid: ipfs_res.items[0].cid });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: e });
  }
}
