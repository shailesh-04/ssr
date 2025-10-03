import React from 'react'
import { Link } from 'react-router-dom'

interface Block {
  id: string
  name: string
  description: string
}

const PopularBlock: React.FC = () => {
  // Mock data - in real app, this would come from API
  const popularBlocks: Block[] = [
    {
      id: '1',
      name: 'Introduction to React',
      description: 'Learn the basics of React programming'
    },
    {
      id: '2',
      name: 'Advanced TypeScript',
      description: 'Deep dive into TypeScript features'
    },
    {
      id: '3',
      name: 'Node.js Fundamentals',
      description: 'Understanding server-side JavaScript'
    }
  ]

  return (
    <div className="card">
      <h1>Popular Learning Blocks</h1>
      <p className="description">
        Explore our most popular learning materials and start your journey today.
      </p>
      
      <ul className="block-list">
        {popularBlocks.map(block => (
          <li key={block.id} className="block-item">
            <div className="block-info">
              <h3>{block.name}</h3>
              <p>{block.description}</p>
              <Link to={`/block/${block.id}`} className="btn btn-primary">
                View Details
              </Link>
            </div>
          </li>
        ))}
      </ul>
      
      <div className="cta-section">
        <h2>Ready to create your own?</h2>
        <p>Join our platform and start building your learning path.</p>
        <Link to="/dashboard" className="btn btn-success">
          Go to Dashboard
        </Link>
      </div>
    </div>
  )
}

export default PopularBlock