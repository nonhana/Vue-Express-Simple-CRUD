// 导入所需的模块
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// 导入路由模块
var usersRouter = require("./routes/users");
var studentsRouter = require("./routes/students");

// 创建 Express 应用程序实例
var app = express();

// 设置视图引擎和视图文件目录
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// 设置日志中间件
app.use(logger("dev"));
// 解析请求体中的 JSON 数据
app.use(express.json());
// 解析请求体中的 URL 编码数据
app.use(express.urlencoded({ extended: false }));
// 解析 Cookie
app.use(cookieParser());
// 跨域配置，以便正常的接收与相应axios请求
app.use(cors());

// 注册静态文件中间件，设置静态文件目录
app.use(express.static(path.join(__dirname, "public")));

// 注册路由中间件
app.use("/users", usersRouter);
app.use("/students", studentsRouter);

// 捕获 404 错误并转发到错误处理器
app.use(function (req, res, next) {
  next(createError(404));
});

// 错误处理器
app.use(function (err, req, res, next) {
  // 设置本地变量，仅在开发环境提供错误信息
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // 设置响应状态码并渲染错误页面
  res.status(err.status || 500);
  res.render("error");
});

// 导出应用程序实例
module.exports = app;
