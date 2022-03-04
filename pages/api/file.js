import nc from "next-connect";
import fileController from "../../controller.js/file.controller";

const handler = nc();

export default handler.patch(fileController.updateFile);
