import express from "express";
import { TodoModel } from "../models/todoModel.js";
import { todoController } from "../controllers/todoController.js";
import { sendPage } from "../views/utils/render.js";
import {
    ListPage,
    CreatePage,
    EditPage,
    IndexPage,
} from "../views/pages/index.js";

const router = express.Router();

// API Routes
router.get("/api", todoController.getTodos);
router.get("/api/:id", todoController.getTodo);
router.post("/api", todoController.createTodo);
router.put("/api/:id", todoController.updateTodo);
router.delete("/api/:id", todoController.deleteTodo);

// SSR Pages
router.get("/", (req, res) => {
    const todos = TodoModel.getAll();
    const recentTodos = todos.slice(-3).reverse();
    const initialData = { todos: recentTodos };
    sendPage(res, IndexPage, { recentTodos, initialData });
});

router.get("/list", (req, res) => {
    const todos = TodoModel.getAll();
    const initialData = { todos };
    sendPage(res, ListPage, { todos, initialData });
});

router.get("/create", (req, res) => {
    const initialData = {};
    sendPage(res, CreatePage, { initialData });
});

router.post("/create", express.urlencoded({ extended: true }), (req, res) => {
    const { text } = req.body;
    if (text && text.trim() !== "") {
        TodoModel.create(text.trim());
    }
    res.redirect("/todos/list");
});

router.get("/edit/:id", (req, res) => {
    const todo = TodoModel.getById(req.params.id);
    const initialData = { todo };
    sendPage(res, EditPage, { todo, initialData });
});

router.post("/edit/:id", express.urlencoded({ extended: true }), (req, res) => {
    const { text, completed } = req.body;
    const updates = {
        text: text.trim(),
        completed: completed === "on",
    };

    TodoModel.update(req.params.id, updates);
    res.redirect("/todos/list");
});

router.post("/delete/:id", (req, res) => {
    TodoModel.delete(req.params.id);
    res.redirect("/todos/list");
});

export default router;
