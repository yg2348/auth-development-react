import React, { useRef, useState } from "react";
import { Form, Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  //   const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("check your inbox");
      //   navigate("/dashboard");
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4"> Password Reset</h2>
          {error && <Alert variant="danger"> {error} </Alert>}
          {message && <Alert variant="success"> {message} </Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label> Email </Form.Label>
              <Form.Control type="email" ref={emailRef}></Form.Control>
            </Form.Group>

            <Button disabled={loading} className="w-100 mt-3" type="submit">
              Reset password
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login"> Login </Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup"> Sign up </Link>
      </div>
    </>
  );
}
