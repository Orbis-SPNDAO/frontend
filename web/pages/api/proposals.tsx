import type { NextApiRequest, NextApiResponse } from "next";
var fs = require("fs");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const path = "/proposals.json";

  if (req.method == "POST") {
    try {
      const filedata = fs.readFileSync(path, "utf8");
      console.log(`filedata: ${filedata}`)
      let data = JSON.parse(filedata);
      console.log(`data: ${JSON.stringify(data)}`)
      data["id"].push(req.body.id);
      console.log(`after data: ${JSON.stringify(data)}`)
      await fs.writeFileSync(path, JSON.stringify(data));
      
      return res.status(200).json({ success: "true" });
    } catch (err) {
      console.log({ err });
      return res.status(400).json({ success: "false" });
    }
  } else if (req.method == "GET") {    
    const filedata = await fs.readFileSync(path, "utf8");
    let data = JSON.parse(filedata);                    
    return res.status(200).json({ data });
  }
}
