import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { siteConfig } from "../config/site.config";

export default function App() {
  useEffect(() => {
    document.title = siteConfig.browserTitle;
  }, []);

  return <RouterProvider router={router} />;
}
