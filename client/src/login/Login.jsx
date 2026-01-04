import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
    return (
        <div className="login-page d-flex justify-content-center align-items-center">
            <div className="login-card">
                <h2 className="login-title">Login <span style={{ color: "#121111ff" }}>BaatCheet</span></h2>

                <form className="login-form">
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
                        />
                    </div>

                    <button type="submit" className="login-button fs-5 fw-bolder">
                        Login
                    </button>
                </form>

                <p className="text-center dont-have-account">
                    Don't have an account?{" "}
                    <Link to="/signup" className="signup-link">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
