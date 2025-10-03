import React, { useEffect, useState } from 'react'
import axios from 'axios'

interface Block {
  id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

interface FormData {
  id: string
  name: string
  description: string
}

const UserDashboard: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([])
  const [formData, setFormData] = useState<FormData>({
    id: '',
    name: '',
    description: ''
  })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchBlocks = async () => {
    try {
      const response = await axios.get('/api/blocks')
      setBlocks(response.data.data || [])
    } catch (error) {
      console.error('Error fetching blocks:', error)
      alert('Failed to fetch blocks')
    }
  }

  useEffect(() => {
    fetchBlocks()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const resetForm = () => {
    setFormData({ id: '', name: '', description: '' })
    setEditingId(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.id || !formData.name) {
      alert('ID and Name are required')
      return
    }

    setIsLoading(true)
    try {
      if (editingId) {
        await axios.put(`/api/blocks/${editingId}`, formData)
      } else {
        await axios.post('/api/blocks', formData)
      }
      resetForm()
      fetchBlocks()
    } catch (error: any) {
      alert(error.response?.data?.error || 'Operation failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (block: Block) => {
    setFormData({
      id: block.id,
      name: block.name,
      description: block.description
    })
    setEditingId(block.id)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this block?')) return

    try {
      await axios.delete(`/api/blocks/${id}`)
      fetchBlocks()
      if (editingId === id) {
        resetForm()
      }
    } catch (error: any) {
      alert(error.response?.data?.error || 'Delete failed')
    }
  }

  return (
    <div>
      <div className="card">
        <div className="dashboard-header">
          <h1>Block Management Dashboard</h1>
          <button 
            onClick={resetForm}
            className="btn btn-primary"
            disabled={isLoading}
          >
            Add New Block
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="id" className="form-label">Block ID</label>
              <input
                type="text"
                id="id"
                name="id"
                className="form-input"
                value={formData.id}
                onChange={handleInputChange}
                placeholder="Enter unique ID"
                disabled={!!editingId}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="name" className="form-label">Block Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter block name"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              id="description"
              name="description"
              className="form-input"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter block description"
              rows={3}
            />
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="btn btn-success"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : editingId ? 'Update Block' : 'Create Block'}
            </button>
            
            {editingId && (
              <button 
                type="button" 
                onClick={resetForm}
                className="btn btn-primary"
                disabled={isLoading}
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="card">
        <h2>Your Learning Blocks ({blocks.length})</h2>
        
        {blocks.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>
            No blocks created yet. Start by creating your first learning block!
          </p>
        ) : (
          <ul className="block-list">
            {blocks.map(block => (
              <li key={block.id} className="block-item">
                <div className="block-info">
                  <h3>{block.name}</h3>
                  <p>{block.description || 'No description provided'}</p>
                  <small style={{ color: '#666' }}>
                    Created: {new Date(block.createdAt).toLocaleDateString()}
                  </small>
                </div>
                
                <div className="block-actions">
                  <button 
                    onClick={() => handleEdit(block)}
                    className="btn btn-warning"
                    disabled={isLoading}
                  >
                    Edit
                  </button>
                  
                  <button 
                    onClick={() => handleDelete(block.id)}
                    className="btn btn-danger"
                    disabled={isLoading}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default UserDashboard