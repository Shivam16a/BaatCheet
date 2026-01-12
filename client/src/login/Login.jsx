import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { toast } from 'react-toastify';
import { useAuth } from "../context/authContext";

const url = "http://localhost:5500/api/auth/login";

const Login = () => {
    const navigate = useNavigate();
    const { storeTokenInLS } = useAuth();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const handlechange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUser({
            ...user,
            [name]: value
        })
    };
    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
                credentials: "include",
            });
            const res_data = await response.json();
            console.log(response);
            if (response.ok) {
                setUser({
                    email: "",
                    password: "",
                })
                console.log(res_data);
                storeTokenInLS(res_data.token);
                toast.success(res_data.msg);
                navigate("/");
            } else {
                toast.error(res_data.msg);
            }

        } catch (error) {
            console.log(error);
            toast.error(error);
        }
    }
    return (
        <div className="login-page d-flex justify-content-center align-items-center">
            <div className="login-card">
                <h2 className="login-title">Login <span style={{ color: "#121111ff" }}>BaatCheet</span></h2>

                <form className="login-form" onSubmit={handlesubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter email"
                            required={true}
                            autoComplete="off"
                            className="fs-5 fw-bolder"
                            value={user.email}
                            onChange={handlechange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            required={true}
                            autoComplete="off"
                            className="fs-5 fw-bolder"
                            value={user.password}
                            onChange={handlechange}
                        />
                    </div>

                    <button type="submit" className="login-button fs-5 fw-bolder">
                        Login
                    </button>
                </form>

                <p className="text-center dont-have-account">
                    Don't have an account?{" "}
                    <Link to="/register" className="signup-link">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
