import { create } from "zustand";

const userConversation = create((set, get) => ({
    selectedConversation: null,
    setSelectedConversation: (conversation) => set({ selectedConversation: conversation }),

    // object to store messages per conversation
    messagesMap: {},

    setMessages: (conversationId, messages) =>
        set((state) => ({
            messagesMap: { ...state.messagesMap, [conversationId]: messages },
        })),

    addMessage: (conversationId, message) =>
        set((state) => ({
            messagesMap: {
                ...state.messagesMap,
                [conversationId]: [
                    ...(state.messagesMap[conversationId] || []),
                    message,
                ],
            },
        })),
}));

export default userConversation;