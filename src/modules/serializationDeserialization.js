import taskModel from "./taskModel";
import projectModel from "./projectModel";

const serializatorDeserializator = (function (task) {

    const serializeTask = (task) => ({
        title: task.getTitle(),
        description: task.getDescription(),
        dueDate: task.getDueDate(),
        priority: task.getPriority(),
        id : task.getId(),
        isDone: task.getIsDone(),
    })

    const deserializeTask = (taskSerialized) => {
        return taskModel(
            taskSerialized.title,
            taskSerialized.description,
            taskSerialized.dueDate,
            taskSerialized.priority,
            taskSerialized.id,
            taskSerialized.isDone
        )
    };

    const serializeProject = (project) => ({
        name: project.getName(),
        id: project.getId()
    })

    const deserializeProject = (projectSerialized) => {
        return projectModel(
            projectSerialized.name,
            projectSerialized.id
        )
    }

    return {serializeTask, deserializeTask, serializeProject, deserializeProject};
})();

export default serializatorDeserializator;