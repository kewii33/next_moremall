"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { IoIosSearch } from "react-icons/io";

const SearchBar = () => {
  const [text, setText] = useState("");
  const router = useRouter();
  const searchHandler = (e: FormEvent) => {
    e.preventDefault();
    router.push(`/search/${text}`);
    setText("");
  };

  return (
    <div>
      <form onSubmit={searchHandler} className="flex items-center">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="검색어를 입력해주세요."
          className="outline-none border-b-2 p-2 mr-2 border-gray-300"
          autoFocus
        />
        <button type="submit">
          <IoIosSearch className="w-[30px] h-[30px]" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
