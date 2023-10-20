import express from 'express';
const router = express.Router();

// Import the relevant controller functions
import { createTask, getTask, updateTask, deleteTask } from '../controllers/taskController.js';

// Define the API endpoints
router.post('/', createTask);
router.get('/tasks/:id', getTask);
router.patch('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

export default router;