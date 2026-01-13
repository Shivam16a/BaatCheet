import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify"
import "./Home.css"


// const url = `http://localhost:5500/api/user/search?search=${searchInput}`;

const Sidebar = () => {
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState('');
    const [searchUser, setSearchUser] = useState([]);
    const [chatUser, setChatUser] = useState([]);
    const token = localStorage.getItem("token");


    useEffect(() => {
        const chaUserHandler = async () => {
            try {
                const chatters = await fetch(`http://localhost:5500/api/user/correntChatters`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                });

                const data = await chatters.json();
                setChatUser(data);
            } catch (error) {
                console.log(error)
            }
        }
        chaUserHandler();
    }, []);
    console.log(chatUser);

    const handleSearchSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5500/api/user/search?search=${searchInput}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            setSearchUser(data);
            if (data.length === 0) {
                console.log(data);
                toast.info("No users found" || data.msg);
            } else {
                toast.success("Users found");
            }

        } catch (error) {
            console.log(error);
            toast.info(error);
        }
    }
    // console.log(searchUser);
    const { user } = useAuth();
    return <>
        <div className="container-fluid">
            <form className="d-flex searchbtn" onSubmit={handleSearchSubmit}>
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <button className="btn btn-outline-success" type="submit">Search</button>
                <img
                    src={user.profilePic}
                    alt="user"
                    height={50}
                    width={50}
                    className='border border-rounded'
                    style={{ margin: "5px", display: "flex", alignItems: "center", cursor: "pointer" }}
                    onClick={() => navigate(`/profile/${user?._id}`)}
                />
            </form>
            <hr style={{ color: "#fff" }} />
            <div>
                {searchUser?.length > 0 ? (
                    <>
                        <div>

                        </div>
                    </>
                ) : (
                    <>
                        <div className='searchuserprofile'>
                            <div className='userprofile'>
                                {chatUser.length === 0 ? (
                                    <>
                                        <div className='emptymessage'>
                                            <h1>Why aru alone!!🤭</h1>
                                            <h1>search username to chat</h1>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {chatUser.map((user, index) => {
                                            <div key={user._id}>
                                                <div className='userschatprofile'
                                                onClick={()=>handeluserchick(user)}
                                                >

                                                </div>
                                            </div>
                                        })}
                                    </>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    </>
}

export default Sidebar