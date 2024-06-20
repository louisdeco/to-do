import projectModel from "./projectModel";

const projectFactory = (function () {
    const _projectArray = [];
    
    const createProject = (name) => {
        const project = projectModel(name);
        _projectArray.push(project);
    }

    const getProject = () => _projectArray;
    
    return {createProject, getProject};
})();

export default projectFactory;