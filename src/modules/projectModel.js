function projectModel (name, id) {
    let _name = name;
    let _id = id;

    const getName = () => _name;
    const setName = (newName) => {_name = newName;}

    const getId = () => _id;

    return {getName, setName, getId};
}

export default projectModel;