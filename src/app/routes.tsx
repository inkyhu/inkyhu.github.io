import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { siteConfig } from "../config/site.config";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <HomePage />
    },
    {
      path: "/project/:projectId",
      element: <ProjectDetailPage />
    },
    {
      path: "*",
      element: <NotFoundPage />
    }
  ],
  {
    basename: siteConfig.routerBasename
  }
);
