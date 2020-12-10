import React, { useContext, useRef, useEffect } from "react";
import { Container, Form, Card, Button, Alert } from "react-bootstrap";
import AuthContext from "../../contexts/auth/authContext";
import { Link, useHistory } from "react-router-dom";
import petLoverAnimation from "../../assets/animations/petLoverAnimation.json";
import Lottie from "lottie-react";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const authContext = useContext(AuthContext);
  let history = useHistory();

  useEffect(() => {
    if (authContext.isSignedIn) {
      history.push("/");
    }
    //eslint-disable-next-line
  }, [authContext.isSignedIn]);

  const handleSubmit = (e) => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    e.preventDefault();
    if (email === null || email === "" || email === " ") {
      authContext.setAuthError("Please enter a valid email");
    } else if (password === null || password === "") {
      authContext.setAuthError("Password cannot be empty");
    } else {
      try {
        authContext.loginUser(email, password);
      } catch (e) {
        //   authContext.setAuthError(e.message);
        console.log(e.message);
      }
    }
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Lottie animationData={petLoverAnimation} style={{height: "20vh"}} />
        <h2 className="text-center">Pet Finder</h2>
        <Card>
          <Card.Body>
            {authContext.error && (
              <Alert variant="danger">{authContext.error}</Alert>
            )}
            <h2 className="text-center mb-4">Sign In</h2>
            <Form>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Button
                disabled={authContext.loading}
                className="w-100"
                type="submit"
                onClick={handleSubmit}
              >
                Log In
              </Button>
            </Form>
          </Card.Body>
        </Card>

        <div className="w-100 text-center mt-2">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </Container>
  );
};

export default Login;
