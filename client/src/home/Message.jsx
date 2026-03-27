import { useEffect, useRef, useState } from 'react'
import userConversation from '../zustand/userConversation'
import { useAuth } from "../context/authContext";
import { useSocketContext } from '../context/socketContext';
import notify from "../assets/sound/mixkit-software-interface-start-2574.wav";


const Message = () => {
  const token = localStorage.getItem("token");
  const { user } = useAuth();
  const messagesEndRef = useRef(null);

  const { messagesMap, selectedConversation, setSelectedConversation, setMessages, addMessage } = userConversation();
  const messages = selectedConversation?._id ? messagesMap[selectedConversation._id] || [] : [];

  const [logingMessages, setLodingMessages] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendData, setSendData] = useState("");

  const { socket } = useSocketContext();

  // ✅ SOCKET FIX (FILTER + NO DUPLICATE)
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      const sound = new Audio(notify);
      sound.play().catch(() => { });

      const isRelevant =
        (newMessage.senderId === user._id &&
          newMessage.reciverId === selectedConversation?._id) ||
        (newMessage.senderId === selectedConversation?._id &&
          newMessage.reciverId === user._id);



      if (isRelevant) {
        addMessage(selectedConversation._id, newMessage);

      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => socket.off("newMessage", handleNewMessage);
  }, [socket, selectedConversation?._id]);

  // ✅ GET MESSAGES
  useEffect(() => {
    if (!selectedConversation?._id) return;

    const getMessages = async () => {
      try {
        setLodingMessages(true);

        const res = await fetch(
          `http://localhost:5500/api/message/${selectedConversation._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();

        if (Array.isArray(data)) {
          setMessages(selectedConversation._id, data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLodingMessages(false);
      }
    };

    getMessages();
  }, [selectedConversation?._id]);

  // ✅ AUTO SCROLL
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ INPUT
  const handelMessage = (e) => {
    setSendData(e.target.value);
  };

  // ✅ SEND MESSAGE FIX
  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!sendData.trim()) return;

    try {
      setSending(true);

      const res = await fetch(
        `http://localhost:5500/api/message/send/${selectedConversation?._id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: sendData }),
        }
      );

      const data = await res.json();

      // ✅ SAFE UPDATE
      addMessage(selectedConversation._id, data);

      setSendData("");
    } catch (error) {
      console.log(error);
    } finally {
      setSending(false);
    }
  };

  // ✅ FILTER MESSAGES
  const filteredMessages = messages.filter(msg =>
    (msg.senderId === user._id && msg.reciverId === selectedConversation?._id) ||
    (msg.senderId === selectedConversation?._id && msg.reciverId === user._id)
  );

  // DELETE MESSAGE 
  const { removeMessage } = userConversation();

  const handleDeleteMessage = async (messageId) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;

    try {
      const res = await fetch(
        `http://localhost:5500/api/message/delete/${messageId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        // ✅ Remove message from state
        removeMessage(selectedConversation._id, messageId);
      } else {
        alert(data.error || "Failed to delete message");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {selectedConversation === null ? (
        <div
          className='d-flex flex-column justify-content-center align-items-center text-center flex-grow-1'
        >
          <p className='fw-bolder fs-2'>Hii! 👋 {user?.username} 🥰</p>
          <p className='fw-bolder fs-2'>Select user to start chat</p>
          <i className="far fa-comments fs-1 text-dark"></i>
        </div>
      ) : (
        <div className="w-100 h-100">
          {/* ===== Chat Header / User Profile ===== */}
          <div
            className="bg-primary text-white d-flex align-items-center gap-3 rounded-3 mt-4"
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
            </div>
          </div>

          {/* ===== Messages Area (next step) ===== */}
          <div
            className="p-3"
            style={{
              height: "calc(100vh - 130px)",
              overflowY: "auto",
              flex: 1,
            }}
          >
            {logingMessages ? (
              <div className="d-flex justify-content-center align-items-center h-100">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : filteredMessages.length === 0 ? (
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

              filteredMessages.map((msg) => {
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
                      style={{ maxWidth: "70%",position:"relative" }}
                    >
                      <p className="mb-1">{msg.message}</p>

                      <div className={`text-end small ${isMyMessage ? "text-white-50" : "text-muted"}`}>
                        {new Date(msg.createdAt).toLocaleString([], {
                          year: "numeric",
                          month: "numeric",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                      {/* Delete Button only for my messages */}
                      {isMyMessage && (
                        <button
                          onClick={() => handleDeleteMessage(msg._id)}
                          style={{
                            position: "absolute",
                            top: "5px",
                            right: "5px",
                            border: "none",
                            background: "transparent",
                            color: isMyMessage ? "white" : "black",
                            cursor: "pointer",
                          }}
                          title="Delete Message"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      )}
                    </div>

                  </div>

                );
              })
            )}
            <div ref={messagesEndRef} />

          </div>
          <form onSubmit={handelSubmit} className=" border-top">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Type a message..."
                value={sendData}
                onChange={handelMessage}
                disabled={sending}
                required
              />

              <button
                className="btn btn-primary"
                type="submit"
                disabled={sending}
              >
                {sending ? (
                  <span className="spinner-border spinner-border-sm"></span>
                ) : (
                  <i className="far fa-paper-plane"></i>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Message;
