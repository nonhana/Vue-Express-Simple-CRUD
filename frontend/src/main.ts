import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // 引入vue-router

// 导入Element-Plus组件库
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

const app = createApp(App);
app.use(ElementPlus).use(router);
app.mount("#app");
