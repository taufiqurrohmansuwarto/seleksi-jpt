import prisma from "../lib/prisma";

const create = async (req, res) => {
  const { user } = req.currentUser;
  try {
    await prisma.profiles.create({
      data: {
        user_id: user?.id,
        documents: {
          create: {},
        },
      },
    });
    res.json({ code: 200, message: "created" });
  } catch (error) {
    console.log(error);
  }
};

const get = async (req, res) => {
  const { user } = req.currentUser;
  try {
    const result = await prisma.profiles.findUnique({
      where: {
        user_id: user?.id,
      },
      include: {
        documents: true,
      },
    });
    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

const submit = async (req, res) => {
  const { user } = req.currentUser;
  try {
  } catch (error) {}
};

const update = async (req, res) => {
  const { user } = req.currentUser;
  try {
    const { body } = req;
    await prisma.profiles.update({
      data: body,
      where: {
        user_id: user?.id,
      },
    });
    res.json({ code: 200, message: "success" });
  } catch (error) {
    console.log(error);
  }
};

export default {
  create,
  submit,
  get,
  update,
};
