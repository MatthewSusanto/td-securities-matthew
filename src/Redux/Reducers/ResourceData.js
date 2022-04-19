import { EDIT_RESOURCE, EDIT_SELECTED_ID } from '../Constants/ResourceConstants';

const initialStateValue = {
    resourceData: [],
    selectedResourceID: 0
};

export default function resourceReducer(state = initialStateValue, action) {
    switch (action.type) {
        case EDIT_RESOURCE: {
            return {
                ...state, resourceData: action.payload
            };
        }
        case EDIT_SELECTED_ID: {
            return {
                ...state, selectedResourceID: action.payload.id
            };
        }
        default:
            return state;
    }
}
