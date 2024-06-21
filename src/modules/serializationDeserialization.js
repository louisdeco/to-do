import taskModel from "./taskModel";
import projectModel from "./projectModel";

const serializatorDeserializator = (function (task) {

    const serializeTask = (task) => ({
        title: task.getTitle(),
        description: task.getDescription(),
        dueDate: task.getDueDate(),
        priority: task.getPriority(),
        isDone: task.getIsDone(),
    })

    const deserializeTask = (taskSerialized) => {
        return taskModel(
            taskSerialized.title,
            taskSerialized.description,
            taskSerialized.dueDate,
            taskSerialized.priority,
            taskSerialized.isDone
        )
    };

    const serializeProject = (project) => ({
        name: project.getName()
    })

    const deserializeProject = (projectSerialized) => {
        return projectModel(
            projectSerialized.name
        )
    }

    return {serializeTask, deserializeTask, serializeProject, deserializeProject};
})();

export default serializatorDeserializator;