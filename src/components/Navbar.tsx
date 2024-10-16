"use client";

import { useGetUserDataQuery } from "@/hooks/useQueries/useUserQuery";
import Link from "next/link";
import logoImage from "../assets/imgs/cartlogo.png";
import Image from "next/image";
import SearchBar from "./SearchBar";
import { MdOutlineLogin } from "react-icons/md";
import UserDropdown from "./UserDropdown";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const { isLoggedIn } = useGetUserDataQuery();

  return (
    <div className="flex justify-between items-center bg-white px-16 py-2 shrink-0 sticky z-50 top-0 inset-x-0 bg-opacity-70 backdrop-blur-lg h-auto shadow-lg">
      <Link href="/">
        <div className="flex items-center gap-2">
          <Image width={60} height={60} alt="로고 이미지" src={logoImage} />
          <div className="text-2xl font-bold">moremall</div>
        </div>
      </Link>
      <div className="flex items-center gap-8">
        <SearchBar />
        {isLoggedIn ? (
          <div className="flex items-center gap-8">
            <Link href="/shoppingcart">
              <FaShoppingCart className="w-[30px] h-[30px]" />
            </Link>
            <UserDropdown />
          </div>
        ) : (
          <div>
            <Link href="/login">
              <MdOutlineLogin className="w-[30px] h-[30px]" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
