import React from 'react';

export const TodoItem = ({ todo, showActions = true }) => {
  return (
    <div className="todo-item scale-up">
      <div className="todo-content">
        <input 
          type="checkbox" 
          checked={todo.completed} 
          readOnly 
          className="pulse"
        />
        <span className={todo.completed ? 'completed' : ''}>
          {todo.text}
        </span>
        <small>Created: {new Date(todo.createdAt).toLocaleDateString()}</small>
      </div>
      {showActions && (
        <div className="todo-actions">
          <a href={`/todos/edit/${todo.id}`} className="btn btn-edit pulse">Edit</a>
          <form action={`/todos/delete/${todo.id}`} method="POST" style={{display: 'inline'}}>
            <button type="submit" className="btn btn-delete pulse">Delete</button>
          </form>
        </div>
      )}
    </div>
  );
};
