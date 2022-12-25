import type { NextApiRequest, NextApiResponse } from "next";

import { Submarine } from "pinata-submarine";

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
    const { cids } = req.body;
    const contentIds: string[] = [];
    for (let i = 0; i < cids.length; i++) {
      const { items } = await submarine.getSubmarinedContentByCid(cids[i]);
      contentIds.push(items[0].id);
    }
    console.log({ contentIds });

    const ipfs_res = await fetch(
      "https://managed.mypinata.cloud/api/v1/auth/content/jwt",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.IPFS_SUB_KEY!,
        },
        body: JSON.stringify({ timeoutSeconds: 60, contentIds }),
      }
    );
    const accessToken = await ipfs_res.json();
    console.log({ accessToken });
    return res.status(200).json({ accessToken });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: e });
  }
}
