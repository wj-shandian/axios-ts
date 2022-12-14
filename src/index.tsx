import axios, { AxiosResponse, AxiosRequestConfig } from "./axios";

const baseUrl = "http://localhost:8080";

interface User {
  name: string;
  password: string;
}

let user: User = {
  name: "ceshi",
  password: "13444344",
};

// 拦截器测试

axios.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    console.log(config, "--");
    config.headers && (config.headers.name += "1");
    return config;
  }
);

axios.interceptors.response.use((response: AxiosResponse): AxiosResponse => {
  console.log(response, "response");
  response.data.name += "1";
  return response;
});

// get 测试
axios({
  method: "get",
  url: baseUrl + "/get",
  params: user,
  headers: {
    name: "ceshi",
  },
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
    name: "ceshi",
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
