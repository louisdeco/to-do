const localStorageService = (function () {
        
    const saveState = (key, state) => {
        localStorage.setItem(key, JSON.stringify(state));
    };

    const loadState = (key) => {
        const state = localStorage.getItem(key);
        return state ? JSON.parse(state) : null;
    };

    return {saveState, loadState};
})();

export default localStorageService;