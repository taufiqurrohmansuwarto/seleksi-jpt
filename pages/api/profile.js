import nc from "next-connect";
import profileController from "../../controller.js/profile.controller";

const handler = nc();

export default handler
  .get(profileController.get)
  .post(profileController.create)
  .patch(profileController.update);
