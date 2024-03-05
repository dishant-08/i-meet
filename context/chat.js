import { create } from "zustand";
import { produce } from "immer";

export const useChat = create((set) => ({
  chat: [],
  addtoChat: (newChat) =>
    set(
      produce((state) => {
        state.chat.push(newChat);
      })
    ),
}));
