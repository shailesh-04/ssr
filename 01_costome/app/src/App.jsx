import React, { useState, useEffect } from "react";
import { TodoList } from "./components/TodoList";
import { TodoForm } from "./components/TodoForm";
import "./styles/style.css";
const App = ({ initialData = {} }) => {
    const [todos, setTodos] = useState(initialData.todos || []);
    const [currentPage, setCurrentPage] = useState("list");
    const [editingTodo, setEditingTodo] = useState(null);

    useEffect(() => {
        if (currentPage === "list") {
            fetchTodos();
        }
    }, [currentPage]);

    const fetchTodos = async () => {
        try {
            const response = await fetch("/todos/api");
            const todosData = await response.json();
            setTodos(todosData);
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    };

    const handleCreateTodo = async (text) => {
        try {
            const response = await fetch("/todos/api", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text }),
            });
            const newTodo = await response.json();
            setTodos((prev) => [...prev, newTodo]);
            setCurrentPage("list");
        } catch (error) {
            console.error("Error creating todo:", error);
        }
    };

    const handleUpdateTodo = async (id, updates) => {
        try {
            const response = await fetch(`/todos/api/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updates),
            });
            const updatedTodo = await response.json();
            setTodos((prev) =>
                prev.map((todo) => (todo.id === id ? updatedTodo : todo))
            );
            setCurrentPage("list");
            setEditingTodo(null);
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    };

    const handleDeleteTodo = async (id) => {
        try {
            await fetch(`/todos/api/${id}`, { method: "DELETE" });
            setTodos((prev) => prev.filter((todo) => todo.id !== id));
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    const renderPage = () => {
        switch (currentPage) {
            case "create":
                return (
                    <TodoForm
                        onSubmit={handleCreateTodo}
                        onCancel={() => setCurrentPage("list")}
                    />
                );
            case "edit":
                return (
                    <TodoForm
                        todo={editingTodo}
                        isEdit={true}
                        onSubmit={(text, completed) =>
                            handleUpdateTodo(editingTodo.id, {
                                text,
                                completed,
                            })
                        }
                        onCancel={() => setCurrentPage("list")}
                    />
                );
            default:
                return (
                    <TodoList
                        todos={todos}
                        onEdit={(todo) => {
                            setEditingTodo(todo);
                            setCurrentPage("edit");
                        }}
                        onDelete={handleDeleteTodo}
                        onToggle={(id, completed) =>
                            handleUpdateTodo(id, { completed })
                        }
                        onCreate={() => setCurrentPage("create")}
                    />
                );
        }
    };

    return (
        <div>
            <nav className="navbar">
                <div className="nav-container">
                    <h1>Todo SSR App Hellow Shilesh</h1>
                    <ul className="nav-menu">
                        <li>
                            <button
                                className="nav-link"
                                onClick={() => setCurrentPage("list")}
                            >
                                All Todos
                            </button>
                        </li>
                        <li>
                            <button
                                className="nav-link"
                                onClick={() => setCurrentPage("create")}
                            >
                                Create Todo
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>

            <main className="container">{renderPage()}</main>
        </div>
    );
};

export default App;
