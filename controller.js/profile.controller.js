import prisma from "../lib/prisma";

const create = async (req, res) => {
  try {
    await prisma.profiles.create({
      data: {
        user_id: "13",
        documents: {
          create: {},
        },
      },
    });
    res.json({ code: 200, message: "created" });
  } catch (error) {
    console.log("error");
  }
};

const get = async (req, res) => {
  try {
    const result = await prisma.profiles.findMany({
      where: {
        user_id: "13",
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

const submit = async (req, res) => {};

const update = async (req, res) => {};

export default {
  create,
  submit,
  get,
  update,
};
