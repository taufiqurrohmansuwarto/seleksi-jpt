import { uploadFileMinio } from "../utils/upload-file";
const path = require("path");

const updateFile = async (req, res) => {
  try {
    const { buffer, originalname, size } = req.file;
    const { properti } = req.body;

    const userId = "1231513434";
    const extFile = path.extname(originalname);
    const currentFilename = `${userId}_${properti}${extFile}`;

    const mc = req.minio;
    await uploadFileMinio(mc, buffer, currentFilename, size);
    // await prisma.documents.update({
    //   data: {
    //     [properti]: currentFilename,
    //   },
    //   where: {
    //     user_id: userId,
    //   },
    // });
    res.json({ code: 200, message: "success", data: properti });
  } catch (error) {
    console.log(error);
    res.statu(400).json({ code: 400, message: "Internal Server Error" });
  }
};

export default {
  updateFile,
};
