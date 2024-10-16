"use client";

import { useGetUserDataQuery } from "@/hooks/useQueries/useUserQuery";
import { useState } from "react";
import Link from "next/link";
import logoImage from "../assets/imgs/cartlogo.png";
import Image from "next/image";
import SearchBar from "./SearchBar";
import { MdOutlineLogin } from "react-icons/md";

const Navbar = () => {
  const { isLoggedIn } = useGetUserDataQuery();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex justify-between items-center bg-white px-8 py-2 shrink-0 sticky z-50 top-0 inset-x-0 bg-opacity-70 backdrop-blur-lg h-auto shadow-lg">
      <Link href="/">
        <div className="flex items-center gap-2">
          <Image width={60} height={60} alt="로고 이미지" src={logoImage} />
          <div className="text-2xl font-bold">shopper</div>
        </div>
      </Link>
      <div className="flex items-center gap-4">
        <SearchBar />
      </div>
      {isLoggedIn ? (
        <div>
          <button>로그아웃</button>
        </div>
      ) : (
        <div>
          <Link href="/login">
            <MdOutlineLogin />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
