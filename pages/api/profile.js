import nc from "next-connect";
import profileController from "../../controller.js/profile.controller";
import auth from "../../middleware/auth";

const handler = nc();

export default handler
  .use(auth)
  .get(profileController.get)
  .post(profileController.create)
  .patch(profileController.update);
