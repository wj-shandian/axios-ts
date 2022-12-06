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

axios({
  method: "get",
  url: baseUrl + "/get",
  params: user,
}).then((response: AxiosResponse) => {
  console.log(response, "get");
  return response.data;
});

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
