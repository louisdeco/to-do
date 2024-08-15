import render from "./render";
import stateActions from "./stateActions";

const tabInteractivity = (function () {
    let _currentTab = null;

    const init = () => {
        const projects = document.querySelectorAll(".project-element");
        const tabs = document.querySelectorAll(".navigation");

        projects.forEach(project => {

            deleteProject(project);
        })

        tabs.forEach(tabElement => {

            selectCurrentTab(tabs, tabElement);
        })
    }

    const deleteProject = (project) => {
        const projectId = project.dataset.projectId;
        const projectButton = project.querySelector(".delete");

        projectButton.addEventListener("click", () => {
            stateActions.deleteProject(projectId);
            render.renderProjects();
        });
    };

    const selectCurrentTab = (tabs, tabElement) => {
        const tabName = tabElement.textContent;
        tabElement.addEventListener("click", () => {
            setCurrentTab(tabName);
            tabs.forEach(tab => tab.classList.remove("current-tab"));
            tabElement.classList.add("current-tab");
        });
    };

    const initDefaultTab = () => {
        const defaultTab = document.querySelector(".default");
        const tabName = defaultTab.textContent;
        setCurrentTab(tabName);
        defaultTab.classList.add("current-tab");
    };

    const getCurrentTab = () => _currentTab;

    const setCurrentTab = (newTab) => {_currentTab = newTab};

    return {init, getCurrentTab, initDefaultTab};

})();

export default tabInteractivity;