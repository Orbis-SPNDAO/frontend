import type { NextApiRequest, NextApiResponse } from "next";

import LitJsSdk from "@lit-protocol/sdk-browser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const client = new LitJsSdk.LitNodeClient();
    const lit = await client.connect();
    
    const { encryptedString, encryptedSymmetricKey } = await lit.encryptText(
      req.body.data
    );

    return res.status(200);
  }

  else if (req.method == "GET") {
    const client = new LitJsSdk.LitNodeClient();
    const lit = await client.connect();

    const decrypted = await lit.decryptText(
      req.body.encryptedString,
      req.body.encryptedSymmetricKey
    );

    return res.status(200);
  }

  else {
    return res.status(400);
  }

}
