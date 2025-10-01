import React from 'react';
import { Layout } from '../components/Layout.jsx';
import { TodoForm } from '../components/TodoForm.jsx';

export const CreatePage = ({ initialData = {} }) => {
  return (
    <Layout title="Create Todo" initialData={initialData}>
      <div className="page-header">
        <h1>Create New Todo</h1>
        <a href="/todos" className="btn btn-secondary">Back to List</a>
      </div>
      
      <TodoForm />
    </Layout>
  );
};
