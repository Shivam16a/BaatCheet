import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useAuth } from "./authContext";

/* eslint-disable react-refresh/only-export-components */

const SocketContext = createContext(null);

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUser, setOnlineUser] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            // User logged out → cleanup
            if (socket) {
                socket.close();
                setSocket(null);
            }
            setOnlineUser([]);
            return;
        }

        // User logged in → create socket
        const newSocket = io("http://localhost:5500", {
            query: {
                userId: user._id,
            },
        });

        newSocket.on("getOnlineUsers", (users) => {
            setOnlineUser(users);
        });

        setSocket(newSocket);

        // Cleanup on unmount or user change
        return () => {
            newSocket.close();
        };
    }, [user]); // ✅ only depend on user

    return (
        <SocketContext.Provider value={{ socket, onlineUser }}>
            {children}
        </SocketContext.Provider>
    );
};
