import React from "react";
import { Layout } from "../components/Layout.jsx";
import { TodoItem } from "../components/TodoItem.jsx";

export const ListPage = ({ todos = [], initialData = {} }) => {
    return (
        <Layout title="All Todos" initialData={initialData}>
            <div className="page-header">
                <h1>All Todos</h1>
                <a href="/todos/create" className="btn btn-primary">
                    Add New Todo
                </a>
            </div>

            <div className="todos-list">
                {todos.length === 0 ? (
                    <div className="empty-state">
                        <p>
                            No todos found.{" "}
                            <a href="/todos/create">Create your first todo!</a>
                        </p>
                    </div>
                ) : (
                    todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
                )}
            </div>
        </Layout>
    );
};
