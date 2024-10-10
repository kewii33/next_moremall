import { clientSupabase } from "../supabase/client";

export const getUserId = async () => {
  const {
    data: { user },
    error,
  } = await clientSupabase.auth.getUser();
  if (error) {
    return { status: "fail", result: error } as const;
  }
  return { status: "success", result: user!.id } as const;
};

export const getUserNickname = async () => {
  const {
    data: { user },
    error,
  } = await clientSupabase.auth.getUser();
  if (error) {
    return { status: "fail", result: error } as const;
  }
  return { status: "success", result: user?.user_metadata.nickname } as const;
};

export const googleLogin = async () => {
  const { data, error } = await clientSupabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
      redirectTo: "/",
    },
  });
  if (data) {
    console.log("구글 로그인 성공");
  }
  if (error) {
    console.log("구글 로그인 에러: ", error);
  }
};
