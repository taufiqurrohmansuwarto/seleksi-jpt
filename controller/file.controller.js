import prisma from "../lib/prisma";
import { uploadFileMinio } from "../utils/upload-file";
const path = require("path");

const updateFile = async (req, res) => {
  try {
    const { buffer, originalname, size } = req.file;
    const { property } = req.body;
    const { user } = req.currentUser;

    const extFile = path.extname(originalname);
    const currentFilename = `${user?.id}_${property}${extFile}`;

    const mc = req.minio;
    await uploadFileMinio(mc, buffer, currentFilename, size);
    const result = await prisma.documents.update({
      data: {
        [property]: currentFilename,
      },
      where: {
        user_id: user?.id,
      },
    });
    const data = [
      {
        id: result[property],
        name: result[property],
        status: "done",
        url: `${process.env.FILE_URL}/${result[property]}`,
      },
    ];

    res.json({ code: 200, message: "success", data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ code: 400, message: "Internal Server Error" });
  }
};

export default {
  updateFile,
};
