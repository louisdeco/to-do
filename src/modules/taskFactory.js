import taskModel from "./taskModel";
import tabInteractivity from "./tabInteractivity";
import { v4 as uuidv4 } from "uuid";

const taskFactory = (function () {

    const createTask = (title, description, dueDate, priority, isDone = false) => {
        const taskId = uuidv4();
        const currentProject = tabInteractivity.getCurrentTab();
        const task = taskModel(title, description, dueDate, priority, taskId, currentProject, isDone);

       return task;
    }
    
    return {createTask};
})();

export default taskFactory;