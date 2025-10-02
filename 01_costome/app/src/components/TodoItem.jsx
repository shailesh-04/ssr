import React from 'react'

export const TodoItem = ({ todo, onEdit, onDelete, onToggle }) => {
  return (
    <div className="todo-item">
      <div className="todo-content">
        <input 
          type="checkbox" 
          checked={todo.completed} 
          onChange={() => onToggle(todo.id, !todo.completed)}
          className="pulse"
        />
        <span className={todo.completed ? 'completed' : ''}>
          {todo.text}
        </span>
        <small>Created: {new Date(todo.createdAt).toLocaleDateString()}</small>
      </div>
      <div className="todo-actions">
        <button className="btn btn-edit" onClick={() => onEdit(todo)}>
          Edit
        </button>
        <button className="btn btn-delete" onClick={() => onDelete(todo.id)}>
          Delete
        </button>
      </div>
    </div>
  )
}
