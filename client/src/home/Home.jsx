import React from "react";
import { useAuth } from "../context/authContext";
import "./Home.css"
import Sidebar from "./Sidebar";
import Message from "./Message";

const Home = () => {
    const { user, loading, isLoggedIn } = useAuth();

    // console.log(user);
    if (loading) {
        return <h2 className="text-dark fw-bold">Loading...</h2>;
    }

    if (!isLoggedIn || !user) {
        return <h2 className="text-dark fw-bold">Please login</h2>;
    }

    return (
        <section className="container" style={{ border: "1px solid transparent" }}>
            <div className="container glass row row-cols-2 ">
                <div className="left">
                    <Sidebar />

                </div>
                <div className="right">
                    <Message/>
                </div>
            </div>
        </section>
    );
};

export default Home;
