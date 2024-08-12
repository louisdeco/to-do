import stateActions from "./stateActions";
import render from "./render";
import switchForm from "./switchForm";

const formHandler = (function () {
    const addForm = document.querySelector(".add-element");
    const addButton = document.querySelector(".add");
    const addDialog = document.querySelector(".dialog-form");
    const editForm = document.querySelector(".edit-element");
    const editDialog = document.querySelector(".dialog-edit");

    const handleFormSubmission = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const taskForm = e.target.querySelector(".task-form");
        const projectForm = e.target.querySelector(".project-form");

        if (taskForm && taskForm.style.display !== "none") {
            const title = formData.get("task-title");
            const description = formData.get("task-details");
            const dueDate = formData.get("task-date");
            const priority = formData.get("task-priority");

            stateActions.addTask(title, description, dueDate, priority);
            render.renderTasks();
            addDialog.close();
        }

        else if (projectForm && projectForm.style.display !== "none"){
            const title = formData.get("project-title");

            stateActions.addProject(title);
            render.renderProjects();
            addDialog.close()       }
    }

    const handleEditSubmission = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const taskId = e.target.dataset.taskId;

        const newTitle = formData.get("edit-title");
        const newDetails = formData.get("edit-details");
        const newDueDate = formData.get("edit-date");
        const newPriority = formData.get("edit-priority");

        editTask(taskId, newTitle, newDetails, newDueDate, newPriority);
        
        stateActions.saveTasks();
        render.renderTasks();
        editDialog.close();
    }

    const editTask = (taskId, newTitle, newDetails, newDueDate, newPriority) => {
        const task = stateActions.getTask(taskId);

        task.setTitle(newTitle);
        task.setDescription(newDetails);
        task.setDueDate(newDueDate);
        task.setPriority(newPriority);
    }

    const init = () => {
        addForm.addEventListener("submit", handleFormSubmission);

        addButton.addEventListener("click", () => {
            switchForm.init();
            addForm.reset();
            addDialog.showModal();
        });
        
        editForm.addEventListener("submit", handleEditSubmission)
    }

    return {init}

})();

export default formHandler;