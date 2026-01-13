import { useEffect } from "react";
import { useAuth } from "../context/authContext";
import "./Home.css"
import Sidebar from "./Sidebar";
import Message from "./Message";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const { user, loading, isLoggedIn } = useAuth();
    const navigate = useNavigate();

    // console.log(user);
    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn, navigate]);

    if (loading) {
        return <h2 className="text-dark fw-bold d-flex">Loading...</h2>;
    }

    // Optional: render nothing if user is null
    if (!user) return null;

    return (
        <section className="container" style={{ border: "1px solid red" }}>
            <div className="container glass row row-cols-2 ">
                <div className="left">
                    <Sidebar />

                </div>
                <div className="right">
                    <Message />
                </div>
            </div>
        </section>
    );
};

export default Home;
