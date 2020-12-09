import React, { useReducer } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./AuthReducer";
import { auth } from "../../firebase";
import {
  SIGNUP_USER,
  LOGIN,
  LOGOUT,
  SET_USER,
  SET_AUTH_ERROR,
  SET_LOADING,
  SET_IS_SIGNED_IN,
} from "../types";

const AuthState = (props) => {
  const initialState = {
    user: {},
    error: "",
    loading: false,
    isSignedIn: false,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const setIsSignedIn = () =>
    dispatch({ type: SET_IS_SIGNED_IN, payload: !state.isSignedIn });

  /**
   * Sign up a new user via email and password, and set the {state.user} object
   * upon a successful signup
   * @param {String} email
   * @param {String} password
   */
  const signUp = async (email, password) => {
    await auth.createUserWithEmailAndPassword(email, password);
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsSignedIn();
    });
  };

  /**
   * Login a user with their email and passsword via firebase auth
   * @param {String} email
   * @param {String} password
   */
  const loginUser = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      auth.onAuthStateChanged((user) => setUser(user));
      setIsSignedIn();
    } catch (e) {
      setAuthError(e);
    }
  };

  /**
   * Signs out the currently logged in user
   */
  const logoutUser = async () => {
    try {
      await auth.signOut();
      dispatch({type: LOGOUT});
      return "Sign out successful";
    } catch (e) {
      return `Sign out error: ${e.message}`;
    }
  };

  /**
   * Set the error for if a login or a signup attempt fails
   * @param {*} error
   */
  const setAuthError = (error) => {
    dispatch({ type: SET_AUTH_ERROR, payload: error });
  };

  /**
   * Set the user state object
   * @param {object} user
   */
  const setUser = (user) => {
    dispatch({ type: SET_USER, payload: user });
  };

  /**
   * Used to indicate whether auth is in a loading state after logging in/out
   */
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        error: state.error,
        loading: state.loading,
        isSignedIn: state.isSignedIn,
        setAuthError,
        setLoading,
        signUp,
        setUser,
        loginUser,
        logoutUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
