"use client";

import { Item } from "@/types/itemTypes";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ProductDetailPage = () => {
  const { keyword } = useParams();
  const { productId } = useParams();
  const decodedKeyword = decodeURIComponent(keyword as string);
  const [productDetail, setProductDetail] = useState<Item | null>(null);
  const [options, setOptions] = useState<string[]>();
  const [selected, setSelected] = useState(options && options[0]);

  //   useEffect(() => {
  //     if ()
  //   },[])

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const res = await axios.get(`http://localhost:5002/api/naver/shop`, {
          params: {
            query: decodedKeyword,
          },
        });
        const foundProductDetail = res.data.items.find(
          (item: Item) => item.productId === productId
        );
        if (foundProductDetail) {
          setProductDetail(foundProductDetail);
        }
      } catch (error) {
        throw error;
      }
    };
    fetchProductDetail();
  }, [decodedKeyword]);

  const removeHtmlTags = (text: string) => {
    return text.replace(/<\/?[^>]+(>|$)/g, "");
  };

  return (
    <div className="flex flex-col items-center mx-32">
      <div className="flex w-full gap-2 mt-8 mb-4 pl-4 opacity-70 bg-green-300">
        <p>{`${productDetail?.category1}`}</p>
        <p>{`> ${productDetail?.category2}`}</p>
        <p>{`> ${productDetail?.category3}`}</p>
        <p>{`> ${productDetail?.category4}`}</p>
      </div>
      <div className="flex flex-col lg:flex-row items-center w-full bg-red-100">
        <Image
          width={500}
          height={500}
          alt="제품 상세 이미지"
          src={productDetail?.image as string}
        />
        <div className="flex flex-col bg-green-200">
          <div className="flex flex-col gap-2 p-4 mb-4 border-b-2 border-gray-200">
            <p className="text-2xl font-semibold">
              {removeHtmlTags(productDetail?.title as string)}
            </p>
            <p className="text-2xl font-semibold">{productDetail?.lprice}₩</p>
          </div>

          <p>{productDetail?.mallName}</p>
          <p>{productDetail?.maker}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
