import stateActions from "./stateActions";
import render from "./render";
import switchForm from "./switchForm";

const formHandler = (function () {
    const form = document.querySelector(".add-element")
    const addButton = document.querySelector(".add");
    const dialog = document.querySelector(".dialog-form")

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
            dialog.close();
        }

        else if (projectForm && projectForm.style.display !== "none"){
            const title = formData.get("project-title");

            stateActions.addProject(title);
            render.renderProjects();
            dialog.close()       }
    }

    const init = () => {
        form.addEventListener("submit", handleFormSubmission);
        addButton.addEventListener("click", () => {
            switchForm.init();
            form.reset();
            dialog.showModal();
        });
    }

    return {init}
})();

export default formHandler;