import React, { useRef, useContext } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import AuthContext from "../../contexts/auth/authContext";
import petLoverAnimation from "../../assets/animations/petLoverAnimation.json";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const authContext = useContext(AuthContext);

  const handleSubmit = async (e) => {
    const emailText = emailRef.current.value;
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      authContext.setAuthError("Passwords do not match");
    } else if (emailText === null || emailText === "") {
      authContext.setAuthError("Please enter a valid email address");
    } else
      try {
        authContext.setLoading();
        await authContext.signUp(
          emailRef.current.value,
          passwordRef.current.value
        );
      } catch (e) {
        authContext.setAuthError(e);
      }
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Lottie animationData={petLoverAnimation} style={{ height: "20vh" }} />
        <h2 className="text-center">Pet Finder</h2>
        <Card>
          <Card.Body>
            {authContext.error && (
              <Alert variant="danger">{authContext.error}</Alert>
            )}
            <h2 className="text-center mb-4">Sign Up</h2>
            <Form>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordConfirmRef}
                  required
                />
              </Form.Group>
              <Button
                disabled={authContext.loading}
                className="w-100"
                type="submit"
                onClick={handleSubmit}
              >
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>

        <div className="w-100 text-center mt-2">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </div>
    </Container>
  );
};

export default SignUp;
