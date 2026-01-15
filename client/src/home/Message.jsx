import { useEffect, useRef, useState } from 'react'
import userConversation from '../zustand/userConversation'
import { useAuth } from "../context/authContext";
import { useSocketContext } from '../context/socketContext';
import notify from "../assets/sound/mixkit-software-interface-start-2574.wav";
const token = localStorage.getItem("token");


const Message = () => {
  const { user } = useAuth();
  const messagesEndRef = useRef(null);
  const { messages, selectedConversation, setSelectedConversation, setMessages } = userConversation();
  const [logingMessages, setLodingMessages] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendData, setSendData] = useState("");
  const {socket} = useSocketContext();


  useEffect(()=>{
    socket?.on("newMessage",(newMessage)=>{
      const sound = new Audio(notify);
      sound.play();
      setMessages([...messages,newMessage])
    })

    return ()=>socket?.off("newMessage");
  },[socket,setMessages,messages])

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  const handelMessage = (e) => {
    setSendData(e.target.value);
  }

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!sendData.trim()) return;

    try {
      setSending(true);

      const response = await fetch(
        `http://localhost:5500/api/message/send/${selectedConversation?._id}`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: sendData,
          }),
        }
      );

      const data = await response.json();

      // message list update
      setMessages([...messages,data]);

      setSendData("");
      setSending(false);

    } catch (error) {
      console.log(error);
    } finally {
      setSending(false);
    }
  };


  return (
    <div
      style={{
        height: "97vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
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
            className="bg-primary text-white d-flex align-items-center px-2 gap-3 rounded-3 mt-4"
            style={{ margin: "8px" }}
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
              height: "calc(97vh - 95px)",
              overflowY: "auto",
              flex: 1,
              padding: "1rem",
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

              Array.isArray(messages) &&
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
            <div ref={messagesEndRef} />

          </div>
          <form onSubmit={handelSubmit} className="p-2 border-top">
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
