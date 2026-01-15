import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify"
import userConversation from "../zustand/userConversation";
import "./Home.css"
import { useSocketContext } from '../context/socketContext';


// const url = `http://localhost:5500/api/user/search?search=${searchInput}`;

const Sidebar = () => {
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState('');
    const [searchUser, setSearchUser] = useState([]);
    const [chatUser, setChatUser] = useState([]);
    const [selestedUserId, setSelectedUserId] = useState(null);
    const [newMessage, setNewMessage] = useState();
    const { messages, setMessages, setSelectedConversation } = userConversation();
    const { onlineUser, socket } = useSocketContext();
    const token = localStorage.getItem("token");
    const { user: authUser, logoutUser } = useAuth();

    const nowOnline = chatUser.map((user) => (user._id));

    const isOnline = nowOnline.map(userId => onlineUser.includes(userId));

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            setNewMessage(newMessage)
        })
        return () => socket?.off("newMessage")
    }, [socket, messages])


    useEffect(() => {
        const chaUserHandler = async () => {
            try {
                const chatters = await fetch(`http://localhost:5500/api/user/correntChatters`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
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
    // console.log(chatUser);

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        if (!searchInput.trim()) {
            toast.warning("Please enter a username to search");
            return;
        }
        try {
            const response = await fetch(`http://localhost:5500/api/user/search?search=${encodeURIComponent(searchInput)}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();
            console.log(data);
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

    const handeluserchick = (user) => {
        setSelectedConversation(user);
        setSelectedUserId(user._id);
        setNewMessage('')
    }

    const handelclickback = () => {
        setSearchUser([]);
        setSearchInput('');
    }
    const handleLogout = () => {
        const confirmlogout = window.prompt(`Type "${authUser.username}" To Logout`);
        if (confirmlogout === authUser.username) {
            logoutUser();
            toast.success("you logout successfully");
        } else if (confirmlogout !== user.username) {
            toast.warning("Enter wright user name");
        } else {
            toast.info("Logout Cancel")
        }
    }
    return <>
        <div className="container-fluid" style={{ marginTop: "1rem" }}>
            <form className="d-flex searchbtn align-items-center p-2" onSubmit={handleSearchSubmit}>
                <input
                    className="form-control me-2 search-input"
                    type="search"
                    placeholder="Search users"
                    aria-label="Search"
                    value={searchInput}
                    onChange={(e) => {
                        setSearchInput(e.target.value);

                        // If input is cleared, reset searchUser
                        if (e.target.value.trim() === "") {
                            setSearchUser([]);
                        }
                    }}
                />
                <button className="btn btn-primary search-btn" type="submit">Search</button>
                <img
                    src={authUser.profilePic || "/default-profile.png"}
                    alt="user"
                    className="rounded-circle profile-pic ms-3"
                    onClick={() => navigate(`/profile/${user?._id}`)}
                />
            </form>
            <hr style={{ color: "#fff" }} />
            <div>
                {searchUser?.length > 0 ? (
                    <>
                        <div className="sidebar-container d-flex flex-column"   >

                            {/* Users list */}
                            <div className="list-group flex-grow-1 overflow-auto">
                                {searchUser.map((user, index) => (
                                    <div
                                        key={user._id}
                                        className={`list-group-item list-group-item-action user-row ${selestedUserId === user._id ? "active" : ""}`}
                                        onClick={() => handeluserchick(user)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <div className="avatar d-flex align-items-center gap-3">
                                            <div className={`avatar-img ${isOnline[index] ? 'online' : ''}`}>
                                                <img
                                                    src={user.profilePic || "/default-profile.png"}
                                                    alt={user.username}
                                                    className="rounded-circle"
                                                    width={45}
                                                    height={45}
                                                />
                                            </div>
                                            <div className="avatar-name">
                                                <span>{user.username}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Bottom fixed icon */}
                            <div className="logout-btn d-flex align-items-center gap-2" onClick={handelclickback}>
                                <i className="fas fa-arrow-circle-left"></i>
                                <span>Back search</span>
                            </div>
                            {/* <div className="sidebar-bottom-icon" onClick={handelclickback}>
                                <i className="fas fa-arrow-circle-left"></i>
                            </div> */}
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
                                        <div className="list-group">
                                            {chatUser.map((user, index) => (
                                                <React.Fragment key={user._id}>
                                                    <div
                                                        className={`list-group-item list-group-item-action user-row ${selestedUserId === user._id ? "active" : ""
                                                            }`}
                                                        onClick={() => handeluserchick(user)}
                                                    >
                                                        <div className="avatar d-flex align-items-center gap-3" style={{ cursor: "pointer" }}>
                                                            <div className={`avatar-img ${isOnline[index] ? 'online' : ''}`}>
                                                                <img
                                                                    src={user.profilePic}
                                                                    alt={user.username}
                                                                    className="rounded-circle"
                                                                    width={45}
                                                                    height={45}
                                                                />
                                                            </div>
                                                            <div className="avatar-name d-flex align-items-center">
                                                                <span>{user.username}</span>
                                                            </div>
                                                            <div>
                                                                {newMessage &&
                                                                    newMessage.senderId === user._id &&        // sidebar user
                                                                    newMessage.reciverId === authUser._id ? (  // logged-in user
                                                                    <div className='badge bg-success rounded-pill ms-2'>+1</div>
                                                                ) : null}


                                                            </div>

                                                        </div>
                                                    </div>

                                                    {/* Divider line */}
                                                    {index !== chatUser.length - 1 && (
                                                        <hr style={{ color: "red" }} />
                                                    )}
                                                </React.Fragment>
                                            ))}


                                        </div>
                                        <div className="logout-btn d-flex align-items-center gap-2" onClick={handleLogout}>
                                            <i className="fas fa-sign-out-alt fa-flip-horizontal"></i>
                                            <span>Logout</span>
                                        </div>

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