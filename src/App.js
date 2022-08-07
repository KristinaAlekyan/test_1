import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Login from "./components/Login/Login.js";
import Register from "./components/Register/Register.js";
import AddClient from "./components/AddClient/AddClient.js";
import Clients from "./components/Clients/Clients";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";


const App = () => {
    const [logedin, setLogedin] = useState(false);
    const [user, setUser] = useState({ email: "", password: "" })

    return (
        <Router>
            <Header logedin={logedin} setLogedin={setLogedin} user={user} />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route exact path="/home" element={<Main />} />
                <Route exact path="/about" element={<Main />} />
                <Route path="/login" element={<Login setLogedin={setLogedin} user={user} setUser={setUser} />} />
                <Route path="/register" element={<Register />} />
                <Route exact path="/add" element={<ProtectedRoute><AddClient /> </ProtectedRoute>} />
                <Route exact path="/clients" element={<ProtectedRoute><Clients /> </ProtectedRoute>} />
            </Routes>
        </Router>
    );
}

export default App;
