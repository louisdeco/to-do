import "./css/style.css";
import render from "./modules/render";
import formHandler from "./modules/formHandler";
import tabInteractivity from "./modules/tabInteractivity";


const index = (function () {
    const init = () => {
        tabInteractivity.initDefaultTab();
        formHandler.init();
        render.renderTasks();
        render.renderProjects();
    };

    return {init};
})();

index.init();