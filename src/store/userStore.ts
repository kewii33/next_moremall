import { UsersType } from "@/types/userTypes";
import { create } from "zustand";

type UserState = {
  user: UsersType | null;
  isLoggedIn: boolean;

  setUser: (data: UsersType | null) => void;
  clearUser: () => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

export const userStore = create<UserState>()((set) => ({
  user: null,
  isLoggedIn: false,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
}));
