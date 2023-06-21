var express = require("express");
var router = express.Router();
const db = require("../database/index"); // 引入数据库封装模块

router.get("/login", (req, res) => {
  const { user_id, password } = req.query;
  const sql_SelectUserId = "select * from userinfo where UserId = ?";
  db.query(sql_SelectUserId, user_id, (err, user) => {
    if (err) {
      res.send({
        result_code: 1,
        result_msg: err.message,
      });
    } else if (user.length === 0) {
      res.send({
        result_code: 1,
        result_msg: "该用户尚未注册，请先进行注册！",
      });
    } else {
      const sql_UserLogin =
        "select * from userinfo where UserId = ? and Password = ?";
      db.query(sql_UserLogin, [user_id, password], (err, result) => {
        if (err) {
          res.send({
            result_code: 1,
            result_msg: err.message,
          });
        } else if (result.length === 0) {
          res.send({
            result_code: 1,
            result_msg: "请检查账号或密码是否输入错误",
          });
        } else {
          res.send({
            result_code: 0,
            result_msg: "登录成功",
            data: result,
          });
        }
      });
    }
  });
});

router.post("/register", (req, res) => {
  const { user_id, password } = req.body;
  const user_info = {
    UserId: user_id,
    Password: password,
  };
  const sql_SelectSameId = "select * from userinfo where UserId = ?";
  const sql_UserRegister = "insert into userinfo set ?";
  db.query(sql_SelectSameId, user_id, (err, userinfo) => {
    if (err) {
      res.send({
        result_code: 1,
        result_msg: "注册失败：" + err.message,
      });
    } else if (userinfo.length > 0) {
      res.send({
        result_code: 1,
        result_msg: "注册失败：用户已存在，请注册其他用户名！",
      });
    } else {
      db.query(sql_UserRegister, user_info, (err, result) => {
        if (err) {
          res.send({
            result_code: 1,
            result_msg: "注册失败：" + err.message,
          });
        } else {
          res.send({
            result_code: 0,
            result_msg: "注册成功",
            data: result,
          });
        }
      });
    }
  });
});

module.exports = router;
