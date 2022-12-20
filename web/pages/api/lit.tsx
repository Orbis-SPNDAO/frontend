import type { NextApiRequest, NextApiResponse } from "next";

import fs from "fs";
import LitJsSdk from "@lit-protocol/sdk-nodejs";

// const blobToBase64 = (blob: Blob) => {
//   const reader = new FileReader();
//   reader.readAsDataURL(blob);
//   return new Promise((resolve) => {
//     reader.onloadend = () => {
//       resolve(reader.result);
//     };
//   });
// };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const client = new LitJsSdk.LitNodeClient({
      alertWhenUnauthorized: false,
      debug: true,
    });
    await client.connect();

    try {
      const fileData = await fs.readFileSync(req.body);
      // const fileData64 = await fs.readFileSync(req.body, 'base64');
      const { encryptedString, encryptedSymmetricKey } =
        await LitJsSdk.encryptString(new String(fileData));

      // const encryptedDescriptionString = encryptedString.toString('base64');

      return res
        .status(200)
        .json({ encryptedString, encryptedSymmetricKey });
      
    } catch (err) {
      console.log(err);
      return res.status(400);
    }
  } else if (req.method == "GET") {
    const client = new LitJsSdk.LitNodeClient();
    const lit = await client.connect();
    let { encryptedString, encryptedSymmetricKey } = req.query;

    const decrypted = await lit.decryptText(
      encryptedString,
      encryptedSymmetricKey
    );

    return res.status(200).json({ data: decrypted });
  } else {
    return res.status(400);
  }
}
