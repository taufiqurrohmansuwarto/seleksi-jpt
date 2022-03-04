import nc from "next-connect";
import profileController from "../../../controller.js/profile.controller";

const handler = nc();

export default handler.post(profileController.submit);
