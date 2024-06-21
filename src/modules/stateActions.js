import localStorageService from "./localStorageService";
import projectFactory from "./projectFactory";
import taskFactory from "./taskFactory";
import serializatorDeserializator from "./serializationDeserialization";

const stateActions = (function () {

    let _tasks = localStorageService.loadState("tasks")?.map(task => serializatorDeserializator.deserializeTask(task)) || [];
    let _projects = localStorageService.loadState("projects")?.map(project => serializatorDeserializator.deserializeProject(project)) || [];

    const addTask = (title, description, dueDate, priority, isDone = false) => {
        const task = taskFactory.createTask(title, description, dueDate, priority, isDone);
        _tasks.push(task);
        localStorageService.saveState("tasks", _tasks.map(task => serializatorDeserializator.serializeTask(task)));
    }

    const addProject = (name) => {
        const project = projectFactory.createProject(name);
        _projects.push(project);
        localStorageService.saveState("projects", _projects.map(project => serializatorDeserializator.serializeProject(project)))
    }

    const getProjects = () => _projects;

    const getTasks = () => _tasks;

    const getTask = (title) => _tasks.find(task => task.getTitle() === title);

    const getProject = (name) => _projects.find(project => project.getName() === name);

    const deleteTask = (title) => {
        _tasks = _tasks.filter(task => task.getTitle() !== title);
        localStorageService.saveState("tasks", _tasks.map(task => serializatorDeserializator.serializeTask(task)));
    };

    const deleteProject = (name) => {
        _projects = _projects.filter(project => project.getName() !== name);
        localStorageService.saveState("projects", _projects.map(project => serializatorDeserializator.serializeProject(project)));
    };

    const clearStorage = () => {
        localStorageService.deleteState();
        _tasks = []
    };

    return {addTask, addProject, getTasks, getProjects, getTask, getProject, deleteTask, deleteProject, clearStorage}
})();

export default stateActions;