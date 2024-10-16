"use client";

import { Item } from "@/types/itemTypes";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchResult = () => {
  const { keyword } = useParams<{ keyword: string }>();
  const decodedKeyword = decodeURIComponent(keyword as string);
  const [data, setData] = useState<Item[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/naver/shop`, {
          params: {
            query: decodedKeyword,
          },
        });
        setData(res.data.items);
      } catch (error) {
        throw error;
      }
    };
    fetchData();
  }, [decodedKeyword]);

  const removeHtmlTags = (text: string) => {
    return text.replace(/<\/?[^>]+(>|$)/g, "");
  };

  return (
    <div className="mx-16">
      <div className="flex gap-2 mt-8 mb-4">
        <p className="font-bold">{`"${decodedKeyword}"`}</p>
        <p>검색 결과입니다.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl-grid-cols-4 gap-10 gap-y-12">
        {data.map((items: Item, index: number) => (
          <Link href={`/detail/${keyword}/${items.productId}`}>
            <div
              key={index}
              className="flex flex-col rounded-b-[10px] shadow-lg hover:scale-105 duration-300 cursor-pointer"
            >
              <div className="w-full h-full">
                <Image
                  width={500}
                  height={500}
                  alt="제품 이미지"
                  src={items.image}
                  className="rounded-t-[10px]"
                />
              </div>
              <div className="flex flex-col gap-2 p-4 w-full h-full">
                <p className="text-xl font-bold">
                  {removeHtmlTags(items.title)}
                </p>
                <p className="text-l font-bold">{items.lprice}₩</p>
                <p>{items.mallName}</p>
                <p>{items.maker}</p>
                <div className="flex gap-2">
                  <p>{items.category1}</p>
                  <p>{items.category2}</p>
                  <p>{items.category3}</p>
                  <p>{items.category4}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
