import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  const base = env.VITE_ROUTER_BASENAME || "/";

  return {
    base,
    plugins: [react()]
  };
});
