import React from 'react';

export const TodoForm = ({ todo = {}, isEdit = false }) => {
  return (
    <form method="POST" className="todo-form slide-down">
      <div className="form-group">
        <label htmlFor="text">Todo Text:</label>
        <textarea 
          id="text" 
          name="text" 
          required 
          defaultValue={todo.text || ''}
          rows="3"
          className="fade-in"
        ></textarea>
      </div>
      
      {isEdit && (
        <div className="form-group fade-in">
          <label>
            <input 
              type="checkbox" 
              name="completed" 
              defaultChecked={todo.completed}
              className="pulse"
            />
            Completed
          </label>
        </div>
      )}
      
      <div className="form-actions fade-in">
        <button type="submit" className="btn btn-primary pulse">
          {isEdit ? 'Update Todo' : 'Create Todo'}
        </button>
        <a href="/todos" className="btn btn-secondary pulse">Cancel</a>
      </div>
    </form>
  );
};
