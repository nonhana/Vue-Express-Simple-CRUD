import myAxios from "./axios";

// 查询所有的学生列表
export const getStuListAPI = () => {
  return myAxios({
    url: "/students/list",
    method: "GET",
  });
};

// 根据StuNo删除某个学生
export const deleteStuItemAPI = (paramsList: { StuNo: number }) => {
  return myAxios({
    url: "/students/delete",
    method: "DELETE",
    params: paramsList,
  });
};

// 添加某个学生
export const addStuItemAPI = (paramsList: {
  Name: string;
  Sex: string;
  Birth: string;
  MajorId: number;
}) => {
  return myAxios({
    url: "/students/additem",
    method: "POST",
    data: paramsList,
  });
};

// 更新学生
export const updateStuItemAPI = (paramsList: {
  StuNo: number;
  Name: string;
  Sex: string;
  Birth: string;
  MajorId: number;
}) => {
  return myAxios({
    url: "/students/edititem",
    method: "POST",
    data: paramsList,
  });
};

export const searchStuItemAPI = (paramList: { keywords: string }) => {
  return myAxios({
    url: "/students/search",
    method: "GET",
    params: paramList,
  });
};
