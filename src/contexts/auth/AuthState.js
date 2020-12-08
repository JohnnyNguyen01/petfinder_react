import React, { useReducer } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./AuthReducer";
import {
  SIGNUP_USER,
  LOGIN,
  SET_USER,
  SET_AUTH_ERROR,
  SET_LOADING,
  SET_IS_SIGNED_IN,
} from "../types";
import { auth } from "../../firebase";

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
    console.log(user);
    dispatch({ type: SET_USER, payload: user });
  };

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
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
