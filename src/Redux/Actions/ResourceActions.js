import { EDIT_RESOURCE, EDIT_SELECTED_ID } from '../Constants/ResourceConstants';

//update the resource globally, takes resources that is to be updated
export const editResource = (resources) => async (dispatch, getState) => {
    dispatch({
        type: EDIT_RESOURCE,
        payload: resources,
    });
};

//updates the selected resource ID, to determine which resource you should currently display
export const updateSelectedResourceID = (id) => async (dispatch, getState) => {
    dispatch({
        type: EDIT_SELECTED_ID,
        payload: {
            id: id,
        },
    });
};