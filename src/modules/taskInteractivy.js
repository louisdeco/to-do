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
        const taskId = task.getAttribute("data-task-id");
        const deleteButton = task.querySelector(".delete");

        deleteButton.addEventListener("click", () => {
            stateActions.deleteTask(taskId);
            render.renderTasks();
        });
    };

    const showDetails = (task) => {
        const detailsDialog = document.querySelector(".dialog-details");
        const detailsButton = task.querySelector(".button-details");
        const taskId = task.getAttribute("data-task-id");

        detailsButton.addEventListener("click", () => {
            editDetailsDialog(taskId, detailsDialog);
            detailsDialog.showModal();
        })
    };

    const editDetailsDialog = (id, detailsDialog) => {
        const taskInformation = getTaskInformation(id)

        detailsDialog.querySelector(".title").textContent = taskInformation.title;
        detailsDialog.querySelector(".project-input").textContent = taskInformation.project;
        detailsDialog.querySelector(".priority-input").textContent = taskInformation.priority;
        detailsDialog.querySelector(".date-input").textContent = taskInformation.dueDate;
        detailsDialog.querySelector(".information-input").textContent = taskInformation.details;
    };

    const showModification = (task) => {
        const editDialog = document.querySelector(".dialog-edit");
        const editIcon = task.querySelector(".edit");
        const taskId = task.getAttribute("data-task-id");

        const editForm = document.querySelector(".edit-element")

        editIcon.addEventListener("click", () => {
            editModificationDialog(taskId, editDialog);
            editForm.dataset.taskId = taskId;
            editDialog.showModal();
        })

    };

    const editModificationDialog = (id, editDialog) => {
        const taskInformation = getTaskInformation(id);

        editDialog.querySelector("#new-title").value = taskInformation.title;
        editDialog.querySelector("#new-details").value = taskInformation.details;
        editDialog.querySelector("#new-details").value = taskInformation.details;
        editDialog.querySelector("#date-row").value = taskInformation.dueDate;
        editDialog.querySelector(`#priority-${taskInformation.priority.toLowerCase()}-edit`).checked = true;
    };

    const getTaskInformation = (id) => {
        const task = stateActions.getTask(id);

        const title = task.getTitle();
        const project = "None";
        const priority = task.getPriority();
        const dueDate = task.getDueDate();
        const details = task.getDescription();
        const status = task.getIsDone();

        return {
            title,
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
        const taskId = taskDom.getAttribute("data-task-id");

        const taskBackend = stateActions.getTask(taskId);

        const strikethrough = document.createElement("div");
        strikethrough.classList.add("done");

        if (isChecked) {
            taskBackend.setIsDone(true);
        }

        else if (taskDom.querySelector(".done")) {
            taskBackend.setIsDone(false);
        }

        render.renderTasks()
        stateActions.saveTasks()
    }

    return  {init};

})();

export default taskInteractivity;