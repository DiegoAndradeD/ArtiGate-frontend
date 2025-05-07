import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("subscription", "./pages/SubscriptionForm.tsx"),
  route("login", "./pages/Login.tsx"),
  route("/submission", "./pages/ArticleSubmission.tsx"),
] satisfies RouteConfig;
