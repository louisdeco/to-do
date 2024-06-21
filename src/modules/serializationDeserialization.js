import taskModel from "./taskModel";

const serializatorDeserializator = (function (task) {

    const serialize = (task) => ({
        title: task.getTitle(),
        description: task.getDescription(),
        dueDate: task.getDueDate(),
        priority: task.getPriority(),
        isDone: task.getIsDone(),
    })

    const deserialize = (taskSerialized) => {
        return taskModel(
            taskSerialized.title,
            taskSerialized.description,
            taskSerialized.dueDate,
            taskSerialized.priority,
            taskSerialized.isDone
        )
    };

    return {serialize, deserialize}
})();

export default serializatorDeserializator;