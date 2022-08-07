import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Error from "../Error/Error"
import "../Login/login.css";

import { signInWithEmailAndPassword, /*onAuthStateChanged*/ } from "firebase/auth";
import { auth } from "../../firebase-config";

const Login = ({ setLogedin, user, setUser }) => {
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const validateForm = () => {
        return user.email.length > 0 && user.password.length > 0;
    }

    const login = async (event) => {
        event.preventDefault();
        try {
            const userData = await signInWithEmailAndPassword(
                auth,
                user.email,
                user.password
            );
            console.log(userData);

            setLogedin(true);

            navigate('/home');
            localStorage.setItem('accessToken', userData.user.stsTokenManager.accessToken);

        } catch (error) {
            setError('Invalid Username or Password')
        }
    };

    return (
        <div className="login">
            <Form onSubmit={login}>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                    {error ? <Error message={error} /> : <></>}
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                    />
                    {error ? <Error message={error} /> : <></>}
                </Form.Group>
                <Button size="lg" type="submit" disabled={!validateForm()}>
                    Login
                </Button>
            </Form>
        </div>
    );
}

export default Login


