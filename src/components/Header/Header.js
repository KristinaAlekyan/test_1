import React from 'react';
import { useNavigate } from "react-router-dom";
import '../Header/header.css';
import { Link } from 'react-router-dom';

const Header = ({ logedin, setLogedin, user }) => {
    const navigate = useNavigate();

    const logout = () => {
        setLogedin(false);
        navigate('/login');
        localStorage.removeItem('accessToken');
    }

    return (
        <div className="d-flex flex-row justify-content-between ">
            <div>
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link active " aria-current="page" to="/home">Home</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/about"> About </Link>
                    </li>

                    {logedin ?
                        (<>
                            <li className="nav-item">
                                <Link className="nav-link" to="/add">Add Client </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/clients">Clients</Link>
                            </li>
                        </>) :
                        (<></>)
                    }
                </ul>
            </div>
            <div>
                <ul className="nav">
                    {!logedin ?
                        (<>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login"> Login </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register"> Register </Link>
                            </li>
                        </>) :
                        (<>
                            <li className="nav-item">
                                <Link className="nav-link" to="/profile"> Hi      {user.email} </Link>

                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login" onClick={logout}> Logout </Link>
                            </li>
                        </>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}

export default Header