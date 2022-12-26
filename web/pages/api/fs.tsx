import type { NextApiRequest, NextApiResponse } from "next";
// @ts-ignore
import { IncomingForm } from "formidable-serverless";
var fs = require("fs");
import path from "path";

export const config = {
  api: {
      bodyParser: {
          sizeLimit: '4mb' // Set desired value here
      }
  }
}

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
      // console.log("file path", data.files.file.path);
      // console.log('file', data.files.file)
      const filedata = fs.readFileSync(data.files.file.path, "utf8");
      // console.log({ filedata });
      fs.writeFileSync(
        data.fields.fields,
        filedata
      );
      await fs.unlinkSync(data.files.file.path);
      return res.status(200).json({ success: "true" });
    } catch (err) {
      console.log({ err });
      return res.status(400).json({ success: "false" });
    }
  } else if (req.method == "GET") {
    let { path } = req.query;
    const data = await fs.readFileSync(path, "utf8");
    return res.status(200).json({ data: data });
  }
}
