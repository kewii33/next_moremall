export type Item = {
  title: string;
  link: string;
  image: string;
  lprice: number;
  hprice: number;
  mallName: string;
  brand: string;
  maker: string;
  productId: string;
  productType: string;
  category1: string;
  category2: string;
  category3: string;
  category4: string;
};

export type Category = {
  title: string;
  category: string;
  data: {
    period: string;
    ratio: number;
  };
};
