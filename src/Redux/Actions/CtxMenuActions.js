import { SET_VIEW_EDIT_TYPE } from '../Constants/CtxMenuConstants';

// determine whether you are trying to view or edit a resource
// the input can either be "view" or "edit"
export const setViewEditType = (type) => async (dispatch, getState) => {
    dispatch({
        type: SET_VIEW_EDIT_TYPE,
        payload: type,
    });
};
