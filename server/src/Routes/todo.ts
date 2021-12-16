import express from "express";
import { getRepository } from "typeorm";
import { Todo } from "../entity/Todo";

const todoRouter = express.Router();

//  ------------------------------------ get all uncompleted todos
todoRouter.get("/", async (_, res) => {
  const todoRepo = getRepository(Todo);
  const todos = await todoRepo.find({
    where: { status: false },
  });

  res.json({
    ok: true,
    todos,
  });
});

// ------------------------------------ get all completed todos
todoRouter.get("/completed", async (_, res) => {
  const todoRepo = getRepository(Todo);
  const todos = await todoRepo.find({
    where: { status: true },
  });
  res.json({
    ok: true,
    todos,
  });
});

// ------------------------------------ Add New Todo
todoRouter.post("/", async (req, res) => {
  console.log(req.body)
  const { name } = req.body;
  const todoRepo = getRepository(Todo);
  const newTodo = new Todo();
  newTodo.name = name;
  newTodo.status = false;
  await todoRepo.save(newTodo);

  res.json({
    ok: true,
    todo: newTodo
  });
});

// ------------------------------------ Update Todo
todoRouter.put("/", async (req, res) => {
  const { id } = req.body;
  console.log(id);
  const todoRepo = getRepository(Todo);
  const todo = await todoRepo.findOne({
    where: { id: id },
  });
  console.log(todo);
  if (todo) {
    todo.status = !todo.status;
    await todoRepo.save(todo);
    return res.json({
      ok: true,
    });
  } else {
    return res.json({
      ok: false,
    });
  }
});

export { todoRouter };
