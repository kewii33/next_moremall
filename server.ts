import dotenv from "dotenv";
import express from "express";
import axios, { AxiosError } from "axios";
import cors from "cors";
import { Item } from "@/types/itemTypes";

dotenv.config({ path: ".env.local" });

const app = express();
const port1 = 5000;
const port2 = 5001;
const port3 = 5002;

app.use(cors());

app.use(express.json());

// 네이버 검색 api
app.get("/api/naver/shop", async (req, res) => {
  const query = req.query.query || "default";

  try {
    const response = await axios.get(
      "https://openapi.naver.com/v1/search/shop.json",
      {
        params: {
          query: query,
          display: 10,
          start: 1,
        },
        headers: {
          "X-Naver-Client-Id": process.env.NAVER_API_CLIENTID,
          "X-Naver-Client-Secret": process.env.NAVER_API_CLIENTSECRET,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      res.status(axiosError.response.status).json({
        error: "검색 api data 불러오기 실패",
        details: axiosError.response.data,
      });
    } else {
      res.status(500).json({ error: "검색 api data 불러오기 실패" });
    }
  }
});

app.listen(port1, () => {
  console.log(`Server running on http://localhost:${port1}`);
});

//네이버 쇼핑 api
app.post("/api/naver/categories", async (req, res) => {
  // console.log("Received request:", req.body);
  try {
    const response = await axios.post(
      "https://openapi.naver.com/v1/datalab/shopping/categories",
      {
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        timeUnit: req.body.timeUnit,
        category: req.body.category,
        device: req.body.device,
        gender: req.body.gender,
        ages: req.body.ages,
      },
      {
        headers: {
          "X-Naver-Client-Id": process.env.NAVER_API_CLIENTID,
          "X-Naver-Client-Secret": process.env.NAVER_API_CLIENTSECRET,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Naver API response:", response.data);
    res.json(response.data);
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      res.status(axiosError.response.status).json({
        error: "쇼핑 api data 불러오기 실패",
        datails: axiosError.response.data,
      });
    } else {
      res.status(500).json({
        error: "쇼핑 api data 불러오기 실패",
      });
    }
  }
});

app.listen(port2, () => {
  console.log(`Server running on http://localhost:${port2}`);
});

//productId를 이용한 상품 정보 불러오기

app.get("/api/naver/shop/:keyword", async (req, res) => {
  const keyword = req.params.keyword;
  console.log("요청된 productId:", keyword);

  try {
    const response = await axios.get(
      `https://openapi.naver.com/v1/search/shop.json`,
      {
        params: {
          query: keyword,
        },
        headers: {
          "X-Naver-Client-Id": process.env.NAVER_API_CLIENTID,
          "X-Naver-Client-Secret": process.env.NAVER_API_CLIENTSECRET,
        },
      }
    );
    console.log("Naver API 응답:", response.data);
    const product = response.data.items.find(
      (item: Item) => item.productId === keyword
    );
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({
        error: "해당 상품을 찾을 수 없습니다.",
      });
    }
  } catch (error) {
    console.error("상품 정보를 가져오는 데 실패:", error);
    res.status(500).json({
      error: "상품 정보를 가져오는 데 실패했습니다.",
    });
  }
});

app.listen(port3, () => {
  console.log(`Server running on http://localhost:${port3}`);
});

// // 유저 정보 확인
// app.get("/users", async (req, res) => {
//   const users = await User.find();
//   res.json(users);
// });
