import React from "react";
import { Form, Button, Card, Container } from "react-bootstrap";

const Login = ({ emailRef, passwordRef }) => {
  return (
    <>
      <Container
        className="d-flex align-items justify-content-center"
        style={{ marginTop: "10%", minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Log in</h2>
              <Form>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Button className="text-center mt-3" type="submit">
                  Log in
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w100 text-center mt-2">Click here to sign up</div>
        </div>
      </Container>
    </>
  );
};

export default Login;
