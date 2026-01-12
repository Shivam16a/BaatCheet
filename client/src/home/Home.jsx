import React from "react";
import { useAuth } from "../context/authContext";

const Home = () => {
  const { user, loading, isLoggedIn } = useAuth();

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!isLoggedIn || !user) {
    return <h2>Please login</h2>;
  }

  return (
    <div>
      <h1>Home</h1>
      <p>Hi {user.username}</p>
    </div>
  );
};

export default Home;
