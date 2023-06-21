#!/usr/bin/env node

/**
 * 模块依赖
 */
var app = require("../app");
var debug = require("debug")("backend:server");
var http = require("http");

/**
 * 从环境中获取端口号并设置给Express，如果没有设置则使用3000
 */
var port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

/**
 * 创建 HTTP 服务器
 */
var server = http.createServer(app);

/**
 * 监听指定的端口号和所有网络接口
 */
server.listen(port, () => {
  console.log(`服务器启动成功，正在监听：http://127.0.0.1:${port}`);
});
server.on("error", onError);
server.on("listening", onListening);

/**
 * 将端口规范化为数字、字符串或 false
 */
function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

/**
 * HTTP 服务器 "error" 事件的事件监听器
 */
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }
  var bind = typeof port === "string" ? "管道 " + port : "端口 " + port;
  // 处理特定的监听错误并给出提示信息
  switch (error.code) {
    case "EACCES":
      console.error(bind + " 需要特权");
      process.exit(1);
    case "EADDRINUSE":
      console.error(bind + " 已经在使用中");
      process.exit(1);
    default:
      throw error;
  }
}

/**
 * HTTP 服务器 "listening" 事件的事件监听器
 */
function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "管道 " + addr : "端口 " + addr.port;
  debug("正在监听 " + bind);
}
