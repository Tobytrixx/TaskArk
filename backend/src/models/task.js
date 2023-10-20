import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // Additional properties for a task
});
taskSchema.methods.toJSON = function () {
  const task = this.toObject();
  delete task.__v;
  return task;
};
const Task = mongoose.model('Task', taskSchema);

export default Task;