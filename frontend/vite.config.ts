import { UserConfigExport } from "vite";
import vue from "@vitejs/plugin-vue";

export default (): UserConfigExport => {
  return {
    plugins: [vue()],
    server: {
      port: 1000,
    },
  };
};
