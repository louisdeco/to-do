import projectModel from "./projectModel";
import { v4 as uuidv4 } from "uuid";

const projectFactory = (function () {
    
    const createProject = (name) => {
        const projectId = uuidv4(); 
        const project = projectModel(name, projectId);
        return project;
    }

    const getProject = () => _projectArray;
    
    return {createProject, getProject};
})();

export default projectFactory;