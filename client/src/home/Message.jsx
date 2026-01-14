import React, { useEffect, useState } from 'react'
import userConversation from '../zustand/userConversation'
import { useAuth } from "../context/authContext";
const token = localStorage.getItem("token");


const Message = () => {
  const { user } = useAuth();
  const { messages, selectedConversation, setSelectedConversation, setMessages } = userConversation();
  const [logingMessages, setLodingMessages] = useState(false);

  useEffect(() => {
    if (!selectedConversation?._id) return;
    const getMessages = async () => {
      try {
        setLodingMessages(true);
        const message = await fetch(`http://localhost:5500/api/message/${selectedConversation._id}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        });
        const data = await message.json();
        setMessages(data);
        setLodingMessages(false);
      } catch (error) {
        console.log(error);
        setLodingMessages(false);
      }
    }

    if (selectedConversation?._id) {
      getMessages();
    }
  }, [selectedConversation, setMessages])
  console.log(messages);
  return (
    <div
      style={{
        height: "97vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      {selectedConversation === null ? (
        <div
          className='d-flex flex-column justify-content-center align-items-center text-center'
        >
          <p className='fw-bolder fs-2'>Hii! 👋 {user?.username} 🥰</p>
          <p className='fw-bolder fs-2'>Select user to start chat</p>
          <i className="far fa-comments fs-1 text-dark"></i>
        </div>
      ) : (
        <div className="w-100 h-100">
          {/* ===== Chat Header / User Profile ===== */}
          <div
            className="bg-primary text-white d-flex align-items-center px-2 gap-3 rounded-3"
            style={{ margin: "5px" }}
          >
            <i
              className="fas fa-arrow-left fs-4"
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedConversation(null)}
            ></i>
            <img
              src={selectedConversation?.profilePic || "/default-profile.png"}
              alt={selectedConversation?.username}
              className="rounded-circle"
              width={55}
              height={55}
              style={{ objectFit: "cover" }}
            />

            <div className="d-flex flex-column">
              <span className="fw-bold fs-5">
                {selectedConversation?.username}
              </span>
              <small className="text-light">
                Online
              </small>
            </div>
          </div>

          {/* ===== Messages Area (next step) ===== */}
          <div
            className="p-3"
            style={{
              height: "calc(97vh - 80px)",
              overflowY: "auto",
            }}
          >
            {logingMessages ? (
              <div className="d-flex justify-content-center align-items-center h-100">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : messages.length === 0 ? (
              <div className="d-flex flex-column justify-content-center align-items-center h-100 text-muted">
                <i className="far fa-comment-dots fs-1 mb-3 text-primary opacity-75"></i>


                <h5 className="fw-semibold mb-1">
                  No messages yet
                </h5>

                <p className="small text-center px-4">
                  Send a message to start this conversation
                </p>
              </div>
            ) : (
              messages.map((msg) => {
                const isMyMessage = msg.senderId === user._id;

                return (
                  <div
                    key={msg._id}
                    className={`d-flex mb-2 ${isMyMessage ? "justify-content-end" : "justify-content-start"
                      }`}
                  >
                    <div
                      className={`p-2 px-3 rounded-3 shadow-sm ${isMyMessage
                        ? "bg-primary text-white"
                        : "bg-light text-dark"
                        }`}
                      style={{ maxWidth: "70%" }}
                    >
                      <p className="mb-1">{msg.message}</p>

                      <div
                        className={`text-end small ${isMyMessage ? "text-white-50" : "text-muted"
                          }`}
                      >
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                );
              })

            )}

          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
