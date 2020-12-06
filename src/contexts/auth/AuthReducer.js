/* eslint-disable import/no-anonymous-default-export */
import { SET_AUTH_ERROR, SET_LOADING, SET_USER, SIGNUP_USER } from "../types";

export default (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SIGNUP_USER:
      return {
        ...state,
        loading: false,
      };
    case SET_AUTH_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
