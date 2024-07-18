import stateActions from "./stateActions";
import {format} from "date-fns";

const render = (function () {
    const content = document.querySelector(".content");
    const projectContainer = document.querySelector(".projects");

    const createTaskElement = (task) => {
        const taskDiv = document.createElement("div");
        taskDiv.className = `task ${task.getPriority()}`;
        taskDiv.innerHTML = `
            <div class="left">
                <input type="checkbox" name="check-task">
                <div class="title">${task.getTitle()}</div>
            </div>
            <div class="right">
                <button class="button-details">DETAILS</button>
                <div class="date">${format(task.getDueDate(), "MMM do")}</div>
                <div class="edit"></div>
                <div class="delete"></div>
            </div>
        `;
        return taskDiv;
    };

    const createProjectElement = (project) => {
        const projectParagraph = document.createElement("p");
        projectParagraph.textContent = project.getName();
        return projectParagraph;
    };

    const renderTasks = () => {
        const tasks = stateActions.getTasks();
        content.innerHTML = "";
        tasks.forEach(task => {
            const taskElement = createTaskElement(task);
            content.appendChild(taskElement);
        });
    };

    const renderProjects = () => {
        const projects = stateActions.getProjects();
        projectContainer.innerHTML="";
        projects.forEach(project => {
            const projectElement = createProjectElement(project);
            projectContainer.appendChild(projectElement);
        });
    };

    return {
        renderTasks,
        renderProjects
    }
})();

export default render;