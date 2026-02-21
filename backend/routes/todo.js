const router = require("express").Router();
const Todo = require("../models/Todo");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  res.json(await Todo.find({ userId: req.user.id }));
});

router.post("/", auth, async (req, res) => {
  res.json(await Todo.create({ title: req.body.title, userId: req.user.id }));
});

router.put("/:id", auth, async (req, res) => {
  const todo = await Todo.findOne({ _id: req.params.id, userId: req.user.id });
  todo.completed = !todo.completed;
  await todo.save();
  res.json(todo);
});

router.delete("/:id", auth, async (req, res) => {
  await Todo.deleteOne({ _id: req.params.id, userId: req.user.id });
  res.json("Deleted");
});

module.exports = router;
