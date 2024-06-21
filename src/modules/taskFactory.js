import taskModel from "./taskModel";

const taskFactory = (function () {

    const createTask = (title, description, dueDate, priority, isDone = false) => {
       const task = taskModel(title, description, dueDate, priority, isDone);
       return task;
    }
    
    return {createTask};
})();

export default taskFactory;