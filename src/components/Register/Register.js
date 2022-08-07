import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Error from "../Error/Error"
import "./register.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatpassword, setRepeatpassword] = useState("");

    const [error, setError] = useState({ emailErr: "", passwordErr: "", repeatpasswordErr: "" });

    const validateForm = () => {
        return email.length > 0 && password.length > 0;
    }
    const navigate = useNavigate();

    const register = async (event) => {
        event.preventDefault();
        if (password === repeatpassword) {
            try {
                const user = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                console.log(user);
                navigate('/login');

            } catch (error) {
                console.log(error.message);
                setError({ ...error, emailErr: "Incorrect Email" })
            }
        } else {
            setError({ ...error, repeatpasswordErr: "Repeatpassword and password are not same" })
        }

    };

    return (
        <div className="register">
            <Form onSubmit={register}>
                <Form.Group size="lg" controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        autoFocus
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        //autoFocus
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        //autoFocus
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {error.emailErr ? <Error message={error.emailErr} /> : <></>}
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="repeatPassword">
                    <Form.Label>Repeat Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={repeatpassword}
                        onChange={(e) => setRepeatpassword(e.target.value)}
                    />
                    {error.repeatpasswordErr ? <Error message={error.repeatpasswordErr} /> : <></>}
                </Form.Group>

                <Button size="lg" type="submit" disabled={!validateForm()}>
                    Register
                </Button>
            </Form>
        </div>
    );
}
export default Register