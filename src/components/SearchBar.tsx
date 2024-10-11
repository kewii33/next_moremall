"use client";

import { FormEvent, useState } from "react";

const SearchBar = () => {
  const [keyword, setKeyword] = useState("");
  const searchHandler = (e: FormEvent) => {
    e.preventDefault();
    setKeyword("");
  };

  return (
    <div>
      <form onSubmit={searchHandler}>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="검색어를 입력해주세요."
        />
        <button type="submit"></button>
      </form>
    </div>
  );
};

export default SearchBar;
