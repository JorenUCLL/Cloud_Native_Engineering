import path from "path";
import fs from "fs";
import formidable, { Fields, Files } from "formidable";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), "public", "pictures");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm({
      uploadDir,
      keepExtensions: true,
    });

    form.parse(req, (err: Error | null, fields: Fields, files: Files) => {
      if (err) {
        return res.status(500).json({ error: "File upload failed." });
      }

      const file = files.file as formidable.File | formidable.File[];
      if (!file) {
        return res.status(400).json({ error: "No file uploaded." });
      }

      console.log(file);

      const filePath = Array.isArray(file)
        ? `/pictures/${path.basename(file[0].filepath)}`
        : `/pictures/${path.basename(file.filepath)}`;

      return res.status(200).json({ filename: filePath });
    });
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
