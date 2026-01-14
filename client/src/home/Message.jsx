import React from 'react'
import userConversation from '../zustand/userConversation'
import { useAuth } from "../context/authContext";
const Message = () => {
  const { user } = useAuth();
  const { messages, selectedConversation, setSelectedConversation } = userConversation();


  return <>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "97vh" }}>
      {selectedConversation === null ? (
        <>
          <div className='d-flex' style={{flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            <p className='fw-bolder fs-2'>Hii! 👋 {user.username} 🥰</p>
            <p className='fw-bolder fs-2'>Select user to start chat</p>
            <i className="far fa-comments fs-1" style={{color:"black"}}></i>
          </div>
        </>
      ) : (
        <>
          <div>

          </div>
        </>
      )}
    </div>
  </>
}

export default Message