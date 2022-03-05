import multer from "multer";
import nc from "next-connect";
import fileController from "../../controller/file.controller";
import uploadFile from "../../middleware/upload-file";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = nc();

export default handler
  .use(uploadFile)
  .patch(multer().single("file"), fileController.updateFile);
