const create = async (req, res) => {};

const get = async (req, res) => {
  try {
    const { userId } = req.query;
    res.json({ code: 200, message: "success", data: userId });
  } catch (error) {}
};

const submit = async (req, res) => {};
const update = async (req, res) => {};

export default {
  create,
  submit,
  get,
  update,
};
