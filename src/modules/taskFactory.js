import taskModel from "./taskModel";
import { v4 as uuidv4 } from "uuid";

const taskFactory = (function () {

    const createTask = (title, description, dueDate, priority, isDone = false) => {
        const taskId = uuidv4();
        const task = taskModel(title, description, dueDate, priority, taskId, isDone);
       return task;
    }
    
    return {createTask};
})();

export default taskFactory;