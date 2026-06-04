import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <main className="container page-gap">
      <h1>404</h1>
      <p>页面不存在，可能链接已变更。</p>
      <Link to="/">返回首页</Link>
    </main>
  );
}
