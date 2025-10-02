import React from 'react';
import { Layout } from '../components/Layout.jsx';
import { TodoItem } from '../components/TodoItem.jsx';

export const IndexPage = ({ recentTodos = [], initialData = {} }) => {
  return (
    <Layout title="Home" initialData={initialData}>
      <div className="hero">
        <h1>Welcome to Todo SSR App</h1>
        <p>A server-side rendered React application built with Express.js</p>
        <div className="hero-actions">
          <a href="/todos/create" className="btn btn-primary">Create New Todo</a>
          <a href="/todos" className="btn btn-secondary">View All Todos</a>
        </div>
      </div>
      {recentTodos.length > 0 && (
        <section className="recent-todos">
          <h2>Recent Todos</h2>
          <div className="todos-grid">
            {recentTodos.map(todo => (
              <TodoItem key={todo.id} todo={todo} showActions={false} />
            ))}
          </div>
        </section>
      )}
    </Layout>
  );
};
