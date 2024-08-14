import stateActions from "./stateActions";
import taskInteractivity from "./taskInteractivy";
import tabInteractivity from "./tabInteractivity";
import {format} from "date-fns";

const render = (function () {
    const content = document.querySelector(".content");
    const projectContainer = document.querySelector(".projects");

    const createTaskElement = (task) => {
        const taskDiv = document.createElement("div");
        taskDiv.dataset.taskId = task.getId();
        taskDiv.className = `task ${task.getPriority().toLowerCase()}`;
        taskDiv.innerHTML = `
            <div class="left">
                <input type="checkbox" name="check-task" ${task.getIsDone() ? 'checked' : ''}>
                <div class="title">${task.getTitle()}</div>
            </div>
            <div class="right">
                <button class="button-details">DETAILS</button>
                <div class="date">${format(task.getDueDate(), "MMM do")}</div>
                <div class="edit"></div>
                <div class="delete"></div>
            </div>
        `;
        if (task.getIsDone()) {
            taskDiv.innerHTML += '<div class="done"></div>';
        }
        return taskDiv;
    };

    const createProjectElement = (project) => {
        const projectDiv = document.createElement("div");
        projectDiv.dataset.projectId = project.getId();
        projectDiv.className = "project-element";
        projectDiv.innerHTML = `
            <p>${project.getName()}</p>
            <div class="delete"></div>
        `
        return projectDiv;
    };

    const renderTasks = () => {
        const tasks = stateActions.getTasks();
        content.innerHTML = "";
        tasks.forEach(task => {
            const taskElement = createTaskElement(task);
            content.appendChild(taskElement);
        });
        taskInteractivity.init();
    };

    const renderProjects = () => {
        const projects = stateActions.getProjects();
        projectContainer.innerHTML="";
        projects.forEach(project => {
            const projectElement = createProjectElement(project);
            projectContainer.appendChild(projectElement);
        });
        tabInteractivity.init();
    };

    return {
        renderTasks,
        renderProjects
    }
})();

export default render;