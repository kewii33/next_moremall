import { LoginData } from "@/types/userTypes";
import { create } from "zustand";

type AuthState = {
  user: LoginData | null;
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  setUser: (data: LoginData | null) => void;
  ClearUser: () => void;
};

export const AuthStore = create<AuthState>()((set) => ({
  user: null,
  accessToken: localStorage.getItem("accessToken"),
  setAccessToken: (token: string | null) =>
    set({
      accessToken: token,
    }),
  setUser: (user) => set({ user }),
  ClearUser: () => set({ user: null }),
}));
