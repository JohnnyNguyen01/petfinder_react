/* eslint-disable import/no-anonymous-default-export */
import {ADD_GEOFENCE_POINT, SET_CAN_SET_GEOGENCE, SET_GEOFENCE_POINTS, SET_LATEST_MARKER} from "../types";

export default (state, action) => {
    switch(action.type){
        case SET_LATEST_MARKER:
            return {
                ...state,
                marker: action.payload
            }
        case SET_GEOFENCE_POINTS:
            return{
                ...state,
                geofencePoints: action.payload
            }
        case SET_CAN_SET_GEOGENCE:
            return{
                ...state,
                canSetGeofence: action.payload
            }
        case ADD_GEOFENCE_POINT:
            return {
                ...state,
                geofencePoints: action.payload
            }
        default:
            return state;
    }
}
