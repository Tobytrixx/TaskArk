import Task from '../models/task.js';


// Get all task
export const getAllTasks = async (req, res) => {
  try {
    let tasks = await Task.find();

    if (tasks.length === 0) {
      return res.status(200).json({
        message: "You currently have no tasks",
        status: "success",
      });
    }

    return res.status(200).json({
      message: "operation successful",
      status: "success",
      data: tasks,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal service error, could not fetch data",
      status: "failed",
    });
  }
};


// Create a new task
export const createTask = async (req, res) => {
  console.log("hi")
    try {
        const { title, description, completed } = req.body;
        // Create a new instance of the Task model
        const task = new Task({
          title,
          description,
          completed,
        });
    
        // Save the task to the database
      await task.save();
    
        return res.status(201).json({
          message: "Task created successfully",
          taskId: task._id
        });
      } catch (error) {
        res.status(500).json({ error: 'Unable to create task' });
      }
};

// Get a task by ID
export const getTask = async (req, res) => {
    try {
      const taskId = req.params.id;
  
      // Find the task by ID in the database
      const task = await Task.findById(taskId);
  
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ error: 'Unable to get task' });
    }
  };

// Update a task by ID
export const updateTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const { title, description, completed } = req.body;
    
        // Find the task by ID in the database
        const task = await Task.findByIdAndUpdate(
          taskId,
          { title, description, completed },
          { new: true }
        );
    
        if (!task) {
          return res.status(404).json({ error: 'Task not found' });
        }
    
        res.status(200).json(task);
      } catch (error) {
        res.status(500).json({ error: 'Unable to update task' });
      }
};

// Delete a task by ID
export const deleteTask = async (req, res) => {
    try {
      const taskId = req.params.id;
  
      // Find the task by ID in the database and remove it
      const deletedTask = await Task.findByIdAndRemove(taskId);
  
      if (!deletedTask) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      res.status(200).json({ success: true, message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Unable to delete task' });
    }
  };