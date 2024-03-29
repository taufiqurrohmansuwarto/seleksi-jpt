import multer from "multer";
import nc from "next-connect";
import fileController from "../../controller/file.controller";
import auth from "../../middleware/auth";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = nc();

export default handler.use(auth).patch(
  multer({
    limits: 5048576,
  }).single("file"),
  fileController.updateFile
);
