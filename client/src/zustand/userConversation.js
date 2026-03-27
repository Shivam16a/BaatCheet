import { create } from "zustand";

const userConversation = create((set, get) => ({
    selectedConversation: null,
    setSelectedConversation: (conversation) => set({ selectedConversation: conversation }),

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

    // ✅ REMOVE MESSAGE
    removeMessage: (conversationId, messageId) =>
        set((state) => ({
            messagesMap: {
                ...state.messagesMap,
                [conversationId]: state.messagesMap[conversationId].filter(
                    (msg) => msg._id !== messageId
                ),
            },
        })),
}));

export default userConversation;