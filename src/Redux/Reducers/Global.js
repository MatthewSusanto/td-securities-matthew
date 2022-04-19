import { SET_VIEW_EDIT_TYPE } from '../Constants/CtxMenuConstants';

const initialStateValue = {
    viewEditType: 'view'
};

export default function globalReducer(state = initialStateValue, action) {
    switch (action.type) {
        case SET_VIEW_EDIT_TYPE: {
            return {
                ...state, viewEditType: action.payload
            };
        }
        default:
            return state;
    }
}
