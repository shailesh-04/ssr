import React from 'react';
import { Layout } from '../components/Layout.jsx';
import { TodoForm } from '../components/TodoForm.jsx';

export const EditPage = ({ todo, initialData = {} }) => {
  if (!todo) {
    return (
      <Layout title="Todo Not Found" initialData={initialData}>
        <div className="error-page">
          <h1>Todo Not Found</h1>
          <p>The requested todo could not be found.</p>
          <a href="/todos" className="btn btn-primary">Back to Todos</a>
        </div>
      </Layout>
    );
  }
  return (
    <Layout title="Edit Todo" initialData={initialData}>
      <div className="page-header">
        <h1>Edit Todo</h1>
        <a href="/todos" className="btn btn-secondary">Back to List</a>
      </div>
      <TodoForm todo={todo} isEdit={true} />
    </Layout>
  );
};
