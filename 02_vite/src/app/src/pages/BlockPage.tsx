import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

interface Block {
  id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

const BlockPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [block, setBlock] = useState<Block | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBlock = async () => {
      try {
        // In real app, this would be an API call
        setTimeout(() => {
          setBlock({
            id: id || '',
            name: `Block ${id}`,
            description: `This is a detailed description for block ${id}. Learn amazing things here!`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          })
          setIsLoading(false)
        }, 500)
      } catch (error) {
        console.error('Error fetching block:', error)
        setIsLoading(false)
      }
    }

    fetchBlock()
  }, [id])

  if (isLoading) {
    return (
      <div className="card">
        <div style={{ textAlign: 'center' }}>
          <p>Loading block details...</p>
        </div>
      </div>
    )
  }

  if (!block) {
    return (
      <div className="card">
        <h1>Block Not Found</h1>
        <p>The requested block could not be found.</p>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="card">
      <div style={{ marginBottom: '2rem' }}>
        <Link to="/" className="btn btn-primary" style={{ marginBottom: '1rem' }}>
          ← Back to Home
        </Link>
        <h1>{block.name}</h1>
        <p className="description">{block.description}</p>
      </div>
      
      <div className="block-content">
        <h2>About This Block</h2>
        <p>
          This learning block contains comprehensive materials to help you master 
          the topic. You'll find interactive examples, exercises, and real-world 
          applications.
        </p>
        
        <h3>What You'll Learn</h3>
        <ul style={{ marginLeft: '2rem', marginBottom: '2rem' }}>
          <li>Fundamental concepts and principles</li>
          <li>Practical examples and use cases</li>
          <li>Best practices and patterns</li>
          <li>Advanced techniques and tips</li>
        </ul>
        
        <div className="block-meta" style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '1.5rem', 
          borderRadius: '6px',
          borderLeft: '4px solid #3498db'
        }}>
          <p><strong>Created:</strong> {new Date(block.createdAt).toLocaleDateString()}</p>
          <p><strong>Last Updated:</strong> {new Date(block.updatedAt).toLocaleDateString()}</p>
        </div>
      </div>
      
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <Link to="/dashboard" className="btn btn-success">
          Start Learning
        </Link>
      </div>
    </div>
  )
}

export default BlockPage