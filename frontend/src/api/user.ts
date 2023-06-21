import myAxios from "./axios";

// 用户登录
export const userLoginAPI = (paramsList: {
  user_id: string;
  password: string;
}) => {
  return myAxios({
    url: "/users/login",
    method: "GET",
    params: paramsList,
  });
};

// 用户注册
export const userRegisterAPI = (paramsList: {
  user_id: string;
  password: string;
}) => {
  return myAxios({
    url: "/users/register",
    method: "POST",
    data: paramsList,
  });
};
