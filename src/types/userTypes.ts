import { Tables } from "./database.types";

export type LoginData = {
  userId: string;
  nickname: string | null;
  avatar: string | null;
};

export type UsersType = Tables<"users">;
