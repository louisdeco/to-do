function taskModel(title, description, dueDate, priority, id, isDone = false) {
    let _title = title;
    let _description = description;
    let _dueDate = dueDate;
    let _priority = priority;
    let _id = id;
    let _isDone = isDone;

    const getTitle = () => _title;
    const setTitle = (newTitle) => {_title = newTitle};

    const getDescription = () => _description;
    const setDescription = (newDescription) => {_description = newDescription};

    const getDueDate = () => _dueDate;
    const setDueDate = (newDueDate) => {_dueDate = newDueDate};

    const getPriority = () => _priority;
    const setPriority = (newPriority) => {_priority = newPriority};

    const getId = () => _id;

    const getIsDone = () => _isDone;
    const setIsDone = (newIsDone) => {_isDone = newIsDone}

    return {getTitle, setTitle, getDescription, setDescription, getDueDate, setDueDate, getPriority, setPriority, getIsDone, getId, setIsDone};
}

export default taskModel;