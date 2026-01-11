import React from 'react'
import { Link } from 'react-router-dom'
import "./Register.css"

const Register = () => {

    const handlechange = (e) => {

    }

    const handlesubmit = async (e) => {

    }

    return <>
        <div className="login-page d-flex justify-content-center align-items-center">
            <div className="login-card">
                <h2 className="login-title">Login <span style={{ color: "#121111ff" }}>BaatCheet</span></h2>

                <form className="login-form" onSubmit={handlesubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Use Name</label>
                        <input
                            type="username"
                            id="texts"
                            name="username"
                            placeholder="Enter username"
                            required={true}
                            autoComplete="off"
                            className="fs-5 fw-bolder"
                            // value={user.username}
                            onChange={handlechange}
                        />
                    </div>

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
                            // value={user.email}
                            onChange={handlechange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Email address</label>
                        <input
                            type="number"
                            id="phone"
                            name="phone"
                            placeholder="Enter phone number"
                            required={true}
                            autoComplete="off"
                            className="fs-5 fw-bolder"
                            // value={user.phone}
                            onChange={handlechange}
                        />
                    </div>

                    <div className="form-group">
                        <label className="mb-2 d-block">Gender</label>
                        <div className="d-flex gap-4">
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    onChange={handlechange}
                                    required
                                />{" "}
                                Male
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    onChange={handlechange}
                                />{" "}
                                Female
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="other"
                                    onChange={handlechange}
                                />{" "}
                                Other
                            </label>
                        </div>
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
                            // value={user.password}
                            onChange={handlechange}
                        />
                    </div>

                    <button type="submit" className="login-button fs-5 fw-bolder">
                        Sign Up
                    </button>
                </form>

                <p className="text-center dont-have-account">
                    Don't have an account?{" "}
                    <Link to="/login" className="signup-link">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    </>
}

export default Register