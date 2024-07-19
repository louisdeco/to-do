const switchForm = (function () {

    const formSections = document.querySelectorAll(".side-form p");
    const taskForm = document.querySelector(".task-form");
    const projectForm = document.querySelector(".project-form");
    const noteForm = document.querySelector(".note-form");

    const init = () => {
        formSections.forEach(section => {
            section.addEventListener("click", () => {
                switchForm(section.textContent.toLowerCase());
            });
        });
        switchForm("task");
    }

    const setRequiredAttributes = (formType, isRequired) => {
        const formElements = formType.querySelectorAll("input, textarea, select");
        formElements.forEach(element => {
            if (isRequired) {
                element.setAttribute("required", "");
            }
            else {
                element.removeAttribute("required");
            }
        })
    }

    const switchForm = (formType) => {
        taskForm.style.display = (formType === "task") ? "flex" : "none";
        projectForm.style.display = (formType === "project") ? "flex" : "none";
        
        setRequiredAttributes(taskForm, formType === "task");
        setRequiredAttributes(projectForm, formType === "project")
    }

    return {init};
})();

export default switchForm;