import nc from "next-connect";
import profileController from "../../controller/profile.controller";

const handler = nc();

export default handler.post(profileController.submit);
