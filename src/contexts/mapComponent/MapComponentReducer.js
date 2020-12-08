/* eslint-disable import/no-anonymous-default-export */
import {SET_LATEST_MARKER} from "../types";

export default (state, action) => {
    switch(action.type){
        case SET_LATEST_MARKER:
            return {
                ...state,
                marker: action.payload
            }
        default:
            return state;
    }
}
