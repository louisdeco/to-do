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
        })
    }

    const switchForm = (formType) => {
        taskForm.style.display = (formType === "task") ? "flex" : "none";
        projectForm.style.display = (formType === "project") ? "flex" : "none";
        noteForm.style.display = (formType === "note") ? "flex" : "none";
    }

    return {init};
})();

export default switchForm;