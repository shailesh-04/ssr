import React, { useState } from 'react'

export const TodoForm = ({ todo, isEdit, onSubmit, onCancel }) => {
  const [text, setText] = useState(todo?.text || '')
  const [completed, setCompleted] = useState(todo?.completed || false)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(text, completed)
  }

  return (
    <div className="page-header">
      <h1>{isEdit ? 'Edit Todo' : 'Create Todo'}</h1>
      
      <form onSubmit={handleSubmit} className="todo-form">
        <div className="form-group">
          <label>Todo Text:</label>
          <textarea 
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            rows="3"
          />
        </div>
        
        {isEdit && (
          <div className="form-group">
            <label>
              <input 
                type="checkbox" 
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
              />
              Completed
            </label>
          </div>
        )}
        
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {isEdit ? 'Update' : 'Create'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
