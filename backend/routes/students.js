var express = require("express");
var router = express.Router();
var db = require("../database/index"); // 引入数据库封装模块

router.get("/list", (_, res) => {
  const sql_GetStudentsList =
    "select stuinfo.*,major.MajorName from stuinfo join major on stuinfo.MajorId = major.MajorId";
  db.query(sql_GetStudentsList, (err, result) => {
    if (err) {
      res.send({
        result_code: 1,
        result_msg: err.message,
      });
    } else {
      const stu_list = result.map((item) => {
        return {
          StuNo: item.StuNo,
          Name: item.Name,
          Sex: item.Sex,
          Birth: item.Birth,
          MajorName: item.MajorName,
        };
      });
      res.send({
        result_code: 0,
        result_msg: "获取学生信息成功",
        stu_list: stu_list,
      });
    }
  });
});

router.delete("/delete", (req, res) => {
  const { StuNo } = req.query;
  sql_DeleteStuItem = "delete from stuinfo where StuNo = ?";
  db.query(sql_DeleteStuItem, StuNo, (err, result) => {
    if (err) {
      res.send({
        result_code: 1,
        result_msg: err.message,
      });
    } else {
      res.send({
        result_code: 0,
        result_msg: "删除成功",
        data: result,
      });
    }
  });
});

router.post("/additem", (req, res) => {
  const stuItem = req.body;
  const sql_AddStuItem = "insert into stuinfo set ?";
  db.query(sql_AddStuItem, stuItem, (err, result) => {
    if (err) {
      res.send({
        result_code: 1,
        result_msg: err.message,
      });
    } else {
      const sql_GetStudentsList =
        "select stuinfo.*,major.MajorName from stuinfo join major on stuinfo.MajorId = major.MajorId";
      db.query(sql_GetStudentsList, (err, result) => {
        if (err) {
          res.send({
            result_code: 1,
            result_msg: err.message,
          });
        } else {
          const stu_list = result.map((item) => {
            return {
              StuNo: item.StuNo,
              Name: item.Name,
              Sex: item.Sex,
              Birth: item.Birth,
              MajorName: item.MajorName,
            };
          });
          res.send({
            result_code: 0,
            result_msg: "添加成功",
            stu_list: stu_list,
          });
        }
      });
    }
  });
});

router.post("/edititem", (req, res) => {
  const { StuNo, ...stuItem } = req.body;
  sql_UpdateStuItem = "update stuinfo set ? where StuNo = ?";
  db.query(sql_UpdateStuItem, [stuItem, StuNo], (err, _) => {
    if (err) {
      res.send({
        result_code: 1,
        result_msg: err.message,
      });
    } else {
      const sql_GetStudentsList =
        "select stuinfo.*,major.MajorName from stuinfo join major on stuinfo.MajorId = major.MajorId";
      db.query(sql_GetStudentsList, (err, result) => {
        if (err) {
          res.send({
            result_code: 1,
            result_msg: err.message,
          });
        } else {
          const stu_list = result.map((item) => {
            return {
              StuNo: item.StuNo,
              Name: item.Name,
              Sex: item.Sex,
              Birth: item.Birth,
              MajorName: item.MajorName,
            };
          });
          res.send({
            result_code: 0,
            result_msg: "修改成功",
            stu_list: stu_list,
          });
        }
      });
    }
  });
});

router.get("/search", (req, res) => {
  const { keywords } = req.query;
  sql_SearchStuIem =
    "select stuinfo.*,major.MajorName from stuinfo join major on stuinfo.MajorId = major.MajorId where Name like ?";
  db.query(sql_SearchStuIem, keywords, (err, result) => {
    if (err) {
      res.send({
        result_code: 1,
        result_msg: err.message,
      });
    } else {
      const stu_list = result.map((item) => {
        return {
          StuNo: item.StuNo,
          Name: item.Name,
          Sex: item.Sex,
          Birth: item.Birth,
          MajorName: item.MajorName,
        };
      });
      res.send({
        result_code: 0,
        result_msg: "搜索成功",
        stu_list: stu_list,
      });
    }
  });
});

module.exports = router;
