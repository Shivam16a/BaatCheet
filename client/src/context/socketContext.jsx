import { createContext, useContext, useEffect, useState } from "react"
import io from "socket.io-client"
import { useAuth } from "./authContext"

/* eslint-disable react-refresh/only-export-components */

const SocketContext = createContext();
export const useSocketContext = () => {
    return useContext(SocketContext);
}

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUser, setOnlineUser] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            const newSocket = io("http://localhost:5500", {
                query: {
                    userId: user?._id,
                }
            });

            newSocket.on("getOnlineUsers", (users) => {
                setOnlineUser(users);
            });

            setTimeout(() => setSocket(newSocket), 0);

            return () => newSocket.close();
        } else {
            if (socket) {
                socket.close();
                setTimeout(() => setSocket(null), 0);
            }
        }
    }, [user, socket]);

    return (
        <SocketContext.Provider value={{ socket, onlineUser }}>
            {children}
        </SocketContext.Provider>
    );
}
