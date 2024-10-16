"use client";

import { useState } from "react";
import headerImg1 from "../assets/imgs/banner_1.jpg";
import headerImg2 from "../assets/imgs/banner_2.jpg";
import headerImg3 from "../assets/imgs/banner_3.jpg";
import Image from "next/image";
import { GrNext, GrPrevious } from "react-icons/gr";

const ImageGallery = () => {
  const headerImgs = [headerImg1, headerImg2, headerImg3];
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImg = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    else setCurrentIndex(headerImgs.length - 1);
  };
  const nextImg = () => {
    if (currentIndex < headerImgs.length - 1) setCurrentIndex(currentIndex + 1);
    else setCurrentIndex(0);
  };

  return (
    <div>
      <div className="min-h-[100px] overflow-hidden">
        <Image
          width={100}
          height={40}
          layout="responsive"
          alt="배너 이미지"
          src={headerImgs[currentIndex]}
          className=""
        />
      </div>
      <button onClick={prevImg}>
        <GrPrevious />
      </button>
      <button onClick={nextImg}>
        <GrNext />
      </button>
    </div>
  );
};

export default ImageGallery;
