import axios, { AxiosResponse } from "./axios";

const baseUrl = "http://localhost:8080";

interface User {
  name: string;
  password: string;
}

let user: User = {
  name: "ceshi",
  password: "13444344",
};

// get 测试
axios({
  method: "get",
  url: baseUrl + "/get",
  params: user,
}).then((response: AxiosResponse) => {
  console.log(response, "get");
  return response.data;
});
// post 测试
axios({
  method: "post",
  url: baseUrl + "/post",
  headers: {
    "content-type": "application/json",
  },
  data: user,
}).then((response: AxiosResponse) => {
  console.log(response, "post");
  return response.data;
});

// 测试超时错误
axios({
  method: "post",
  url: baseUrl + "/post_timeout?timeout=2000",
  headers: {
    "content-type": "application/json",
  },
  timeout: 1000,
  data: user,
})
  .then((response: AxiosResponse) => {
    console.log(response, "post");
    return response.data;
  })
  .catch((err) => {
    console.log(err, "timeout");
  });

// 测试状态码错误
axios({
  method: "post",
  url: baseUrl + "/post_status?code=400",
  headers: {
    "content-type": "application/json",
  },
  data: user,
})
  .then((response: AxiosResponse) => {
    console.log(response, "post");
    return response.data;
  })
  .catch((err) => {
    console.log(err, "code");
  });
