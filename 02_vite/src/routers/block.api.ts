import { Router } from 'express'
import fs from 'fs'
import path from 'path'
const router = Router()
const dataFilePath = path.resolve(process.cwd(), 'src/data/blocks.json')
const readData = (): any[] => {
    try {
        const data = fs.readFileSync(dataFilePath, 'utf-8')
        return JSON.parse(data)
    } catch (error) {
        return []
    }
}

const writeData = (data: any[]): void => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2))
}
// Get all blocks
router.get('/blocks', (req, res) => {
    try {
        const data = readData()
        res.json({
            success: true,
            data,
            count: data.length
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch blocks'
        })
    }
})
router.get('/blocks/:id', (req, res) => {
    try {
        const data = readData()
        const block = data.find(b => b.id == req.params.id)

        if (!block) {
            return res.status(404).json({
                success: false,
                error: 'Block not found'
            })
        }
        res.json({
            success: true,
            data: block
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch block'
        })
    }
})
router.post('/blocks', (req, res) => {
    try {
        const { id, name, description } = req.body

        if (!id || !name) {
            return res.status(400).json({
                success: false,
                error: 'ID and name are required'
            })
        }

        const data = readData()

        // Check if block already exists
        if (data.find(b => b.id === id)) {
            return res.status(409).json({
                success: false,
                error: 'Block with this ID already exists'
            })
        }

        const newBlock = {
            id,
            name,
            description: description || '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }

        data.push(newBlock)
        writeData(data)

        res.status(201).json({
            success: true,
            data: newBlock
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to create block'
        })
    }
})
router.put('/blocks/:id', (req, res) => {
    try {
        const { name, description } = req.body
        const data = readData()
        const blockIndex = data.findIndex(b => b.id == req.params.id)

        if (blockIndex === -1) {
            return res.status(404).json({
                success: false,
                error: 'Block not found'
            })
        }
        const updatedBlock = {
            ...data[blockIndex],
            ...(name && { name }),
            ...(description !== undefined && { description }),
            updatedAt: new Date().toISOString()
        }

        data[blockIndex] = updatedBlock
        writeData(data)

        res.json({
            success: true,
            data: updatedBlock
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to update block'
        })
    }
})
router.delete('/blocks/:id', (req, res) => {
    try {
        const data = readData()
        const filteredData = data.filter(b => b.id != req.params.id)

        if (data.length === filteredData.length) {
            return res.status(404).json({
                success: false,
                error: 'Block not found'
            })
        }

        writeData(filteredData)

        res.json({
            success: true,
            message: 'Block deleted successfully'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to delete block'
        })
    }
})

export default router