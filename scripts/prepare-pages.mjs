import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const distDir = "dist";
const outDir = "out";
const portfolioDir = join(outDir, "Portfolio");
const eileenSourceDir = join("eileen", "35");
const eileenOutputDir = join(outDir, "eileen", "35");

if (!existsSync(distDir)) {
  console.error("Missing dist/. Run build first.");
  process.exit(1);
}

if (!existsSync(join(eileenSourceDir, "index.html"))) {
  console.error("Missing eileen/35/index.html.");
  process.exit(1);
}

if (existsSync(outDir)) {
  rmSync(outDir, { recursive: true, force: true });
}

mkdirSync(portfolioDir, { recursive: true });
cpSync(distDir, portfolioDir, { recursive: true });
cpSync(join(portfolioDir, "index.html"), join(portfolioDir, "404.html"));
mkdirSync(eileenOutputDir, { recursive: true });
cpSync(eileenSourceDir, eileenOutputDir, { recursive: true });

const redirectHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="refresh" content="0; url=/Portfolio/" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="canonical" href="/Portfolio/" />
    <title>Inky's Website</title>
    <script>location.replace("/Portfolio/");</script>
  </head>
  <body>
    <p>Redirecting to <a href="/Portfolio/">Portfolio</a>...</p>
  </body>
</html>
`;

writeFileSync(join(outDir, "index.html"), redirectHtml, "utf8");
writeFileSync(join(outDir, ".nojekyll"), "", "utf8");

console.log("Pages artifact prepared at out/");
console.log("- out/index.html (redirect -> /Portfolio/)");
console.log("- out/Portfolio/ (app build)");
console.log("- out/eileen/35/ (hidden manuscript)");
