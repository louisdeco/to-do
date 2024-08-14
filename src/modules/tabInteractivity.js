import render from "./render";
import stateActions from "./stateActions";

const tabInteractivity = (function () {

    const init = () => {
        const projects = document.querySelectorAll(".project-element");
        projects.forEach(project => {

            deleteProject(project);
        })
    }

    const deleteProject = (project) => {
        const projectId = project.dataset.projectId;
        const projectButton = project.querySelector(".delete");

        projectButton.addEventListener("click", () => {
            stateActions.deleteProject(projectId);
            render.renderProjects();
        })
    }

    return {init};

})();

export default tabInteractivity;