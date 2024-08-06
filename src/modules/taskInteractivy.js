import render from "./render";
import stateActions from "./stateActions";


const taskInteractivity = (function () {

    const init = () => {
        const tasks = document.querySelectorAll(".task");
        tasks.forEach(task => {

            deleteTask(task);
            
            showDetails(task);

            showModification(task);

            taskStatusInteraction(task);
        });
    };
    
    const deleteTask = (task) => {
        const title = task.querySelector(".title").textContent;
        const deleteButton = task.querySelector(".delete");

        deleteButton.addEventListener("click", () => {
            stateActions.deleteTask(title);
            render.renderTasks();
        });
    };

    const showDetails = (task) => {
        const detailsDialog = document.querySelector(".dialog-details");
        const detailsButton = task.querySelector(".button-details");
        const title = task.querySelector(".title").textContent;

        detailsButton.addEventListener("click", () => {
            editDetailsDialog(title, detailsDialog);
            detailsDialog.showModal();
        })
    };

    const editDetailsDialog = (title, detailsDialog) => {
        const taskInformation = getTaskInformation(title)

        detailsDialog.querySelector(".title").textContent = title;
        detailsDialog.querySelector(".project-input").textContent = taskInformation.project;
        detailsDialog.querySelector(".priority-input").textContent = taskInformation.priority;
        detailsDialog.querySelector(".date-input").textContent = taskInformation.dueDate;
        detailsDialog.querySelector(".information-input").textContent = taskInformation.details;
    };

    const showModification = (task) => {
        const editDialog = document.querySelector(".dialog-edit");
        const editIcon = task.querySelector(".edit");
        const title = task.querySelector(".title").textContent;

        editIcon.addEventListener("click", () => {
            editModificationDialog(title, editDialog);
            editDialog.showModal();
        })

    };

    const editModificationDialog = (title, editDialog) => {
        const taskInformation = getTaskInformation(title);

        editDialog.querySelector("#new-title").value = title;
        editDialog.querySelector("#new-details").value = taskInformation.details;
        editDialog.querySelector("#new-details").value = taskInformation.details;
        editDialog.querySelector("#date-row").value = taskInformation.dueDate;
        editDialog.querySelector(`#priority-${taskInformation.priority.toLowerCase()}-edit`).checked = true;
    };

    const getTaskInformation = (title) => {
        const task = stateActions.getTask(title);

        const project = "None";
        const priority = task.getPriority();
        const dueDate = task.getDueDate();
        const details = task.getDescription();
        const status = task.getIsDone();

        return {
            project,
            priority,
            dueDate,
            details,
            status
        };
    }

    const taskStatusInteraction = (task) => {
        const checkbox = task.querySelector("input[name='check-task']");

        checkbox.addEventListener("change", () => {
            changeTaskStatus(checkbox.checked, task);
        })
    }

    const changeTaskStatus = (isChecked, taskDom) => {
        const title = taskDom.querySelector(".title").textContent;
        const taskBackend = stateActions.getTask(title);

        const strikethrough = document.createElement("div");
        strikethrough.classList.add("done");

        if (isChecked) {
            taskBackend.setIsDone(true);
            render.renderTasks()
        }

        else if (taskDom.querySelector(".done")) {
            taskBackend.setIsDone(false);
            render.renderTasks()
        }

        stateActions.saveTasks()
    }

    return  {init};

})();

export default taskInteractivity;