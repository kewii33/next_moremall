"use clinet";

import { useGetUserDataQuery } from "@/hooks/useQueries/useUserQuery";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import UserAvatar from "./UserAvatar";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { clientSupabase } from "@/utils/supabase/client";
import { USER_DATA_QUERY_KEY } from "@/query/user/userQueryKey";

export default function UserDropdown() {
  const userData = useGetUserDataQuery();
  const queryClient = useQueryClient();
  const router = useRouter();
  const avatarUrl = userData.data?.avatar_url;
  const userRole = userData.data?.user_status;
  const userStatus = () => {
    if (userRole === "customer") {
      return "구매자";
    } else if (userRole === "seller") {
      return "판매자";
    }
  };
  const logoutHandler = async () => {
    await clientSupabase.auth.signOut();
    queryClient.invalidateQueries({
      queryKey: [USER_DATA_QUERY_KEY],
    });
    alert("로그아웃 성공");
    await router.replace("/");
  };
  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <div>
            {avatarUrl ? (
              <div>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  src={avatarUrl}
                />
              </div>
            ) : (
              <div>
                <UserAvatar />
              </div>
            )}
          </div>
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="greet" className="h-14 gap-2">
            <p className="font-semibold">
              {userData.data?.nickname}님, 안녕하세요!
            </p>
          </DropdownItem>
          <DropdownItem key="settings">
            <Link href="/mypage">
              <p className="flex">
                회원님은
                <span className="font-semibold ml-1">{`${userStatus()}`}</span>
                입니다.
              </p>
            </Link>
          </DropdownItem>
          <DropdownItem key="point">
            <Link href="/mypage">
              <p>사용가능 포인트 : {userData.data?.point}P</p>
            </Link>
          </DropdownItem>
          <DropdownItem key="my_page">
            <Link href="/mypage">마이페이지</Link>
          </DropdownItem>
          <DropdownItem key="logout" color="danger" onClick={logoutHandler}>
            로그아웃
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
