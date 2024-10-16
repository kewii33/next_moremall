"use client";

import { Item } from "@/types/itemTypes";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import ReviewComponent from "./ReviewComponent";

const ProductDetailPage = () => {
  const { keyword } = useParams();
  const { productId } = useParams();
  const decodedKeyword = decodeURIComponent(keyword as string);
  const [productDetail, setProductDetail] = useState<Item | null>(null);
  const [options, setOptions] = useState<string[]>();
  const [selected, setSelected] = useState(options && options[0]);
  const [amount, setAmount] = useState(0);

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

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
  };

  useEffect(() => {
    if (productDetail?.category1 === "패션의류") {
      setOptions(["XS", "S", "M", "L", "XL"]);
    }
  }, [productDetail]);

  const handleMinusAmount = () => {
    if (amount > 0) {
      setAmount(amount - 1);
    } else if (amount === 0) {
      setAmount(0);
    }
  };

  const handlePlusAmount = () => {
    if (amount < 99) {
      setAmount(amount + 1);
    } else if (amount === 99) {
      alert("99개 이상 구매하실 수 없습니다.");
    }
  };

  const handleAddCart = () => {};

  return (
    <div className="flex flex-col items-center mx-32">
      <div className="flex w-full gap-2 mt-8 mb-4 pl-4 opacity-70 bg-green-300">
        <p>{`${productDetail?.category1}`}</p>
        <p>{`> ${productDetail?.category2}`}</p>
        <p>{`> ${productDetail?.category3}`}</p>
        <p>{`> ${productDetail?.category4}`}</p>
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-center w-full h-full bg-red-100">
        <Image
          width={500}
          height={500}
          alt="제품 상세 이미지"
          src={productDetail?.image as string}
        />
        <div className="flex flex-col justify-start bg-green-200 h-[500px] m-4">
          <div className="flex flex-col gap-2 p-4 mb-2 border-b-2 border-gray-200">
            <p className="text-2xl font-semibold">
              {removeHtmlTags(productDetail?.title ?? "")}
            </p>
            <p className="text-2xl font-semibold">{productDetail?.lprice}₩</p>
          </div>
          <div className="flex flex-col p-4 gap-2 justify-between h-full bg-red-300">
            <p>{productDetail?.mallName}</p>
            <p>{productDetail?.maker}</p>
            <p>{productDetail?.brand}</p>
            <div className="flex flex-col gap-4 bg-gray-300">
              <div>
                {productDetail?.category1 === "패션의류" ? (
                  <div>
                    <label className="p-2" htmlFor="select">
                      옵션 :{" "}
                    </label>
                    <select
                      value={selected}
                      onChange={handleSelect}
                      className="p-2 m-2 outline-none border-2 border-dashed"
                    >
                      {options &&
                        options.map((option) => {
                          {
                            return (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            );
                          }
                        })}
                    </select>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="flex gap-2">
                <label className="p-2">수량 : </label>
                <button onClick={handleMinusAmount} className="p-2 bg-white">
                  -
                </button>
                <div className="p-2">{amount}</div>
                <button onClick={handlePlusAmount} className="p-2 bg-white">
                  +
                </button>
              </div>
              <button onClick={handleAddCart} className="bg-red-200 p-4">
                장바구니에 추가
              </button>
            </div>
          </div>
        </div>
      </div>
      <ReviewComponent />
    </div>
  );
};

export default ProductDetailPage;
