import type { NextApiRequest, NextApiResponse } from "next";
// @ts-ignore
import { IncomingForm } from "formidable-serverless";
var fs = require("fs");
import path from "path";
import { Submarine } from "pinata-submarine";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const form = new IncomingForm();

    const data: { files: any; fields: any } = await new Promise(
      (resolve, reject) => {
        form.parse(req, (err: any, fields: any, files: any) => {
          resolve({ fields, files });
        });
      }
    );

    try {
      const submarine = new Submarine(
        process.env.IPFS_SUB_KEY!,
        "https://patterndao.mypinata.cloud"
      );
      const ipfs_res = await submarine.uploadFileOrFolder(
        path.resolve(data.files.file.path)
      );
      await fs.unlinkSync(data.files.file.path);
      return res.status(200).json({ cid: ipfs_res.items[0].cid });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ error: e });
    }
  } else if (req.method == "GET") {
    let { path } = req.query;
    const data = await fs.readFileSync(path, "utf8");
    return res.status(200).json({ data: data });
  }
}
