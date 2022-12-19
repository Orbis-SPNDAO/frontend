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

    return res.status(200).json({
      encryptedString: encryptedString,
      encryptedSymmetricKey: encryptedSymmetricKey,
    });
  } 
  else if (req.method == "GET") {
    const client = new LitJsSdk.LitNodeClient();
    const lit = await client.connect();
    let { encryptedString, encryptedSymmetricKey } = req.query;

    const decrypted = await lit.decryptText(
      encryptedString,
      encryptedSymmetricKey
    );

    return res.status(200).json({data: decrypted});
  } else {
    return res.status(400);
  }
}
