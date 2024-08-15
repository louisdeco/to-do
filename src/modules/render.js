import stateActions from "./stateActions";
import taskInteractivity from "./taskInteractivy";
import tabInteractivity from "./tabInteractivity";
import {format, isToday, isThisWeek, parseISO} from "date-fns";

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
            <p class="navigation">${project.getName()}</p>
            <div class="delete"></div>
        `
        return projectDiv;
    };

    const renderTasks = () => {
        const tasks = stateActions.getTasks();
        const filteredTasks = selectRelevantTasks(tasks)
        content.innerHTML = "";
        filteredTasks.forEach(task => {
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

    const selectRelevantTasks = (tasks) => {
        const currentTab = tabInteractivity.getCurrentTab();
     
        const taskFiltered = tasks.filter(task => {
            const project = task.getProject();
            const dueDate = parseISO(task.getDueDate());

            if (currentTab === "All") {
                return true
            }

            else if (currentTab === "Today" & (project === "Today" || project === "Week")) {
                return isToday(dueDate);
            }

            else if (currentTab === "Week" & (project === "Today" || project === "Week")) {
                return isThisWeek(dueDate, {weekStartsOn: 1});
            }
            
            else
            return currentTab === project;
        })

        return taskFiltered;
    };

    return {
        renderTasks,
        renderProjects
    }
})();

export default render;