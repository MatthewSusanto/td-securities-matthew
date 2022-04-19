//helper function to rename the keys
export const renameKey = (obj, oldKey, newKey) => {
    let temp = { ...obj, [oldKey]: undefined, [newKey]: obj[oldKey] };
    delete temp[oldKey];
    return temp;
};

// will format the input of resources to a resource/tree form, formatTo input is ('resourceform' or 'treeform')
export const formatTreeInput = (resources, formatTo) => {
    //initial values for the keys, will determine what will the input be formatted to
    let oldName = {
        key: (formatTo === 'treeform') ? 'id' : 'key',
        title: (formatTo === 'treeform') ? 'name' : 'title',
        children: (formatTo === 'treeform') ? 'resourceList' : 'children'
    };
    let newName = {
        key: (formatTo === 'treeform') ? 'key' : 'id',
        title: (formatTo === 'treeform') ? 'title' : 'name',
        children: (formatTo === 'treeform') ? 'children' : 'resourceList'
    };
    return resources.map((element) => {
        let renamedElement;
        let toReturn;
        renamedElement = renameKey(renameKey(renameKey(element, oldName.key, newName.key), oldName.title, newName.title), oldName.children, newName.children);
        toReturn = { ...renamedElement };
        if (renamedElement[newName.children]) {
            toReturn = { ...toReturn, [newName.children]: formatTreeInput(renamedElement[newName.children], formatTo) };
        } else {
            delete toReturn[newName.children];
        }
        return toReturn;
    });
};

//update sepcific resource
export const updateResource = (resources, id, selectedResourceState) => {
    const toEdit = resources;
    for (let i = 0; i < toEdit.length; i++) {
        if (toEdit[i].id === id) {
            toEdit[i] = selectedResourceState;
            return toEdit;
        }
        if (toEdit[i].resourceList != null && toEdit[i].resourceList.length > 0) {
            updateResource(toEdit[i].resourceList, id, selectedResourceState);
        }
    }
    return toEdit;
};

//find a specific resource and return it
export const getResource = (resources, id) => {
    let result = {};
    const getResourceHelper = (resources, id) => {
        const toEdit = resources;
        for (let i = 0; i < toEdit.length; i++) {
            if (toEdit[i].id === id) {
                result = toEdit[i];
                return;
            }
            if (toEdit[i].resourceList != null && toEdit[i].resourceList.length > 0) {
                getResourceHelper(toEdit[i].resourceList, id);
            }
        }
    };
    getResourceHelper(resources, id);
    return result;
};

//remove a specific tree node
export const removeResource = (compareId, arr) => {
    return arr.filter(res => {
        const keep = res['id'] !== compareId;
        if (keep && res['resourceList']) {
            res['resourceList'] = removeResource(compareId, res['resourceList']);
        }
        return keep;
    });
};

//add a resource of empty value
export const addResource = (resources, id) => {
    const tempResources = JSON.parse(JSON.stringify(resources));
    const random = Math.floor(Math.random() * 10000);
    const toAdd = {
        id: random,
        name: `New #${random}`,
        type: '',
        description: '',
        clientId: '',
        users: [],
        resourceList: [],
    };
    if (id === 0) {
        return [...tempResources, toAdd];
    }
    const toEdit = tempResources.map((res) => {
        return ({
            ...res,
            resourceList: (res.id === id) ? res.resourceList ? [...res.resourceList, toAdd] : [toAdd] : (res.resourceList != null && res.resourceList.length > 0) ? addResource(res.resourceList, id) : null
        });
    });
    return toEdit;
};
