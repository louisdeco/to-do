import projectModel from "./projectModel";

const projectFactory = (function () {
    
    const createProject = (name) => {
        const project = projectModel(name);
        return project;
    }

    const getProject = () => _projectArray;
    
    return {createProject, getProject};
})();

export default projectFactory;