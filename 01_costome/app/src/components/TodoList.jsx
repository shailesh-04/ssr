import React from 'react'
import { TodoItem } from './TodoItem'

export const TodoList = ({ todos, onEdit, onDelete, onToggle, onCreate }) => {
  return (
    <div className="page-header">
      <h1>All Todos</h1>
      <button className="btn btn-primary" onClick={onCreate}>
        Add New Todo
      </button>
      
      <div className="todos-list">
        {todos.length === 0 ? (
          <div className="empty-state">
            <p>No todos found.</p>
          </div>
        ) : (
          todos.map(todo => (
            <TodoItem 
              key={todo.id} 
              todo={todo} 
              onEdit={onEdit}
              onDelete={onDelete}
              onToggle={onToggle}
            />
          ))
        )}
      </div>
    </div>
  )
}
