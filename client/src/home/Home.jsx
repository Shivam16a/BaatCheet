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
        <section className="container" style={{ border: "1px solid transparent" }}>
            <div className="container glass row row-cols-2 ">
                <div className="left">
                    <div className="container-fluid">
                        <form className="d-flex searchbtn">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                        <hr style={{ color: "#fff" }} />
                        <div className="avtar">
                            <div className="profipic">
                                <img src={user.profilePic} alt="imge.png" height={70} width={70} />
                                <p>{user.username}</p>
                            </div>

                        </div>
                    </div>

                </div>
                <div className="right">
                    <h1>message</h1>
                </div>
            </div>
        </section>
    );
};

export default Home;
