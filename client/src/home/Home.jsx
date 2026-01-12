import React from "react";
import { useAuth } from "../context/authContext";
import "./Home.css"

const Home = () => {
    const { user, loading, isLoggedIn } = useAuth();

    console.log(user);
    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (!isLoggedIn || !user) {
        return <h2>Please login</h2>;
    }

    return (
        <section className="container">
            <div className="container glass row row-cols-2 ">
                <div className="left">
                    <h1>sidebar</h1>
                    <p>Hi {user.username}</p>
                </div>
                <div className="right">
                    <h1>message</h1>
                </div>
            </div>
        </section>
    );
};

export default Home;
