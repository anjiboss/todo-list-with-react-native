"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const Todo_1 = require("../entity/Todo");
const todoRouter = express_1.default.Router();
exports.todoRouter = todoRouter;
todoRouter.get("/", async (_, res) => {
    const todoRepo = typeorm_1.getRepository(Todo_1.Todo);
    const todos = await todoRepo.find({
        where: { status: false },
    });
    res.json({
        ok: true,
        todos,
    });
});
todoRouter.get("/completed", async (_, res) => {
    const todoRepo = typeorm_1.getRepository(Todo_1.Todo);
    const todos = await todoRepo.find({
        where: { status: true },
    });
    res.json({
        ok: true,
        todos,
    });
});
todoRouter.post("/", async (req, res) => {
    const { name } = req.body;
    const todoRepo = typeorm_1.getRepository(Todo_1.Todo);
    const newTodo = new Todo_1.Todo();
    newTodo.name = name;
    newTodo.status = false;
    await todoRepo.save(newTodo);
    res.json({
        ok: true,
    });
});
todoRouter.put("/", async (req, res) => {
    const { id } = req.body;
    console.log(id);
    const todoRepo = typeorm_1.getRepository(Todo_1.Todo);
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
    }
    else {
        return res.json({
            ok: false,
        });
    }
});
//# sourceMappingURL=todo.js.map