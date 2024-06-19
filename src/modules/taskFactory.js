import taskModel from "./taskModel";

const taskFactory = (function () {
    const _taskArray = [];

    const createTask = (title, description, dueDate, priority, isDone = false) => {
       const task = taskModel(title, description, dueDate, priority, isDone);
        _taskArray.push(task);
    }

    const getTasks = () => _taskArray;
    return {createTask, getTasks};
})();

export default taskFactory;