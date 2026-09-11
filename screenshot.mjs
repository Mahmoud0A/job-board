import { chromium } from "playwright";
import fs from "fs";

const viewports = [
  { width: 1920, height: 1080 },
  { width: 1440, height: 900 },
  { width: 1280, height: 800 },
  { width: 1024, height: 768 },
  { width: 834, height: 1194 },
  { width: 768, height: 1024 },
  { width: 430, height: 932 },
  { width: 390, height: 844 },
  { width: 375, height: 812 },
  { width: 360, height: 800 },
  { width: 320, height: 568 }
];

const routes = [
  { path: "/", name: "home" },
  { path: "/about", name: "about" },
  { path: "/jobs", name: "jobs" },
  { path: "/jobs/frontend-engineer-1", name: "job-detail" },
  { path: "/jobs/create", name: "create-job" },
  { path: "/saved-jobs", name: "saved-jobs" }
];

if (!fs.existsSync("screenshots")) {
  fs.mkdirSync("screenshots");
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  for (const route of routes) {
    for (const vp of viewports) {
      const context = await browser.newContext({ viewport: vp });
      const page = await context.newPage();
      await page.goto("http://localhost:3000" + route.path);
      await page.waitForLoadState("networkidle");
      await page.screenshot({ path: "screenshots/" + route.name + "-" + vp.width + "x" + vp.height + ".png", fullPage: true });
      await context.close();
    }
  }
  await browser.close();
  console.log("Screenshots done.");
})();
