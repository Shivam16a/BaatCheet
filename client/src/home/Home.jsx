import { useEffect } from "react";
import { useAuth } from "../context/authContext";
import "./Home.css";
import Sidebar from "./Sidebar";
import Message from "./Message";
import { useNavigate } from "react-router-dom";
import userConversation from "../zustand/userConversation";

const Home = () => {
    const { user, loading, isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const { selectedConversation } = userConversation();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn, navigate]);

    if (loading) {
        return <h2 className="text-dark fw-bold d-flex">Loading...</h2>;
    }

    if (!user) return null;

    return (
        <section className="container-fluid vh-100 p-0">
            <div className="row h-100 m-0 glass">

                {/* ===== Sidebar ===== */}
                <div
                    className={`
            col-12 col-md-4 col-lg-3 p-0 left
            ${selectedConversation ? "d-none d-md-block" : ""}
          `}
                >
                    <Sidebar />
                </div>
                {/* ===== Messages ===== */}
                <div
                    className={`
            col-12 col-md-8 col-lg-9 p-0
            ${!selectedConversation ? "d-none d-md-block" : ""}
          `}
                >
                    <Message />
                </div>

            </div>
        </section>
    );
};

export default Home;
