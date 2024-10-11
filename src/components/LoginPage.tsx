"use client";

import { USER_DATA_QUERY_KEY } from "@/query/user/userQueryKey";
import { userStore } from "@/store/userStore";
import { clientSupabase } from "@/utils/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const queryClient = useQueryClient();
  const { setIsLoggedIn } = userStore((state) => state);

  const LoginHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const {
        data: { session },
        error,
      } = await clientSupabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (session) {
        setIsLoggedIn(true);
        queryClient.invalidateQueries({
          queryKey: [USER_DATA_QUERY_KEY],
        });
        alert("로그인 되었습니다.");
        router.push("/");
      } else if (error) throw error;
    } catch (error: any) {
      if (error.message.includes("Invalid login")) {
        console.log(error.message);
      }
    }
    setEmail("");
    setPassword("");
  };

  const router = useRouter();
  const goJoinHandler = () => {
    router.push("/join");
  };

  return (
    <div>
      <form onSubmit={LoginHandler}>
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
        <button type="submit">로그인</button>
      </form>
      <div>
        <p>아직 회원이 아니신가요?</p>
        <button onClick={goJoinHandler}>회원가입 하기</button>
      </div>
    </div>
  );
};

export default LoginPage;
