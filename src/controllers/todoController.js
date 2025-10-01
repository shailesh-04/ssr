import { TodoModel } from '../models/todoModel.js';

export const todoController = {
  getTodos(req, res) {
    res.json(TodoModel.getAll());
  },

  getTodo(req, res) {
    const todo = TodoModel.getById(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
  },

  createTodo(req, res) {
    const { text } = req.body;
    if (!text || text.trim() === '') {
      return res.status(400).json({ error: 'Text is required' });
    }
    
    const newTodo = TodoModel.create(text);
    res.status(201).json(newTodo);
  },

  updateTodo(req, res) {
    const todo = TodoModel.update(req.params.id, req.body);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
  },

  deleteTodo(req, res) {
    const todo = TodoModel.delete(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted successfully' });
  }
};
