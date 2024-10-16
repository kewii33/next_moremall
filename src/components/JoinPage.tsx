"use client";

import { USER_DATA_QUERY_KEY } from "@/query/user/userQueryKey";
import { clientSupabase } from "@/utils/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const JoinPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const queryClient = useQueryClient();

  const joinHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("닉네임:", nickname);
    if (password.length < 4) {
      alert("비밀번호는 4자 이상이어야 합니다.");
      return;
    }
    if (nickname.length < 4 || nickname.length > 10) {
      alert("닉네임은 4 ~ 10자로 작성해주세요.");
      return;
    }
    // try {
    //   const { data: nicknameData, error: nicknameError } = await clientSupabase
    //     .from("users")
    //     .select("nickname")
    //     .eq("nickname", nickname)
    //     .single();
    //   if (nicknameData) {
    //     alert("이미 사용중인 닉네임입니다. 다른 닉네임을 입력해주세요.");
    //     return;
    //   }
    // } catch (error) {
    //   console.error("닉네임 중복 검사 중 오류 발생", error);
    //   alert("닉네임 중복 검사 중 예상치 못한 오류가 발생했습니다.");
    //   return;
    // }
    try {
      const {
        data: { session },
        error,
      } = await clientSupabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: { nickname: nickname },
        },
      });
      if (session) {
        queryClient.invalidateQueries({
          queryKey: [USER_DATA_QUERY_KEY],
        });
      } else if (error) {
        console.log("회원가입 오류: ", error.message);

        throw error;
      }
    } catch (error: any) {
      if (error.message.includes("already registered")) {
        alert("이미 존재하는 계정입니다.");
      } else {
        alert("회원가입 중 오류가 발생했습니다.");
      }
    }
    setEmail("");
    setPassword("");
    setNickname("");
  };

  const router = useRouter();
  const goLoginHandler = () => {
    router.push("/login");
  };

  return (
    <div>
      <form onSubmit={joinHandler}>
        <div>
          <label>이메일 :</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력해주세요."
            required
          />
        </div>
        <div>
          <label>비밀번호 :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력해주세요."
            required
          />
        </div>
        <div>
          <label>닉네임 :</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임을 입력해주세요."
          />
        </div>
        <button type="submit">가입하기</button>
      </form>
      <div>
        <p>이미 회원이신가요?</p>
        <button onClick={goLoginHandler}>로그인 하기</button>
      </div>
    </div>
  );
};

export default JoinPage;
