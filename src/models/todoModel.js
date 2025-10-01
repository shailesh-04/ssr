let todos = [
  { id: 1, text: 'Learn React SSR', completed: true, createdAt: new Date().toISOString() },
  { id: 2, text: 'Build Todo App', completed: false, createdAt: new Date().toISOString() }
];
let nextId = 3;

export const TodoModel = {
  getAll() {
    return todos;
  },

  getById(id) {
    return todos.find(todo => todo.id === parseInt(id));
  },

  create(text) {
    const newTodo = {
      id: nextId++,
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };
    todos.push(newTodo);
    return newTodo;
  },

  update(id, updates) {
    const todo = this.getById(id);
    if (!todo) return null;
    
    Object.assign(todo, updates);
    return todo;
  },

  delete(id) {
    const index = todos.findIndex(todo => todo.id === parseInt(id));
    if (index === -1) return null;
    
    return todos.splice(index, 1)[0];
  }
};
