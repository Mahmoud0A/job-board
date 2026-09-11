import { chromium } from "playwright";

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log("1. HOME PAGE");
  await page.goto("http://localhost:3000");
  await page.waitForLoadState("networkidle");
  await page.screenshot({ path: "qa-01-home-desktop.png", fullPage: true });

  console.log("2. JOBS PAGE");
  await page.goto("http://localhost:3000/jobs");
  await page.waitForLoadState("networkidle");
  await page.screenshot({ path: "qa-02-jobs-desktop.png", fullPage: true });

  console.log("3. SEARCH TESTS");
  await page.fill('input[type="search"]', "engineer");
  await page.keyboard.press("Enter");
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "qa-03-jobs-filtered.png", fullPage: true });

  console.log("8. JOB DETAIL PAGE");
  await page.goto("http://localhost:3000/jobs/frontend-engineer-1");
  await page.waitForLoadState("networkidle");
  await page.screenshot({ path: "qa-04-job-detail.png", fullPage: true });

  console.log("9. INVALID JOB ID");
  await page.goto("http://localhost:3000/jobs/nonexistent-id-xyz");
  await page.waitForLoadState("networkidle");
  await page.screenshot({ path: "qa-05-not-found.png", fullPage: true });

  console.log("10. SAVE/UNSAVE DEEP TEST");
  await page.goto("http://localhost:3000/saved-jobs");
  await page.waitForLoadState("networkidle");
  await page.screenshot({ path: "qa-06-saved-jobs.png", fullPage: true });

  console.log("13. CREATE JOB PAGE");
  await page.goto("http://localhost:3000/jobs/create");
  await page.waitForLoadState("networkidle");
  await page.screenshot({ path: "qa-07-create-job.png", fullPage: true });

  console.log("14. FORM VALIDATION - EMPTY SUBMIT");
  await page.click('button[type="submit"]');
  await page.waitForTimeout(500);
  await page.screenshot({ path: "qa-08-validation-errors.png", fullPage: true });

  console.log("16. VALID JOB CREATION");
  await page.fill('input[name="title"]', "QA Test Engineer");
  await page.fill('input[name="company"]', "TestCorp");
  await page.fill('input[name="location"]', "Remote (Worldwide)");
  await page.fill('textarea[name="description"]', "We are looking for a QA Test Engineer to improve our test coverage and quality processes across the platform.");
  await page.fill('textarea[name="requirements"]', "3+ years of QA experience\nStrong automation skills\nExperience with Playwright");
  await page.click('button[type="submit"]');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: "qa-09-new-job-created.png", fullPage: true });

  console.log("19. ABOUT PAGE");
  await page.goto("http://localhost:3000/about");
  await page.waitForLoadState("networkidle");
  await page.screenshot({ path: "qa-10-about.png", fullPage: true });

  console.log("23. RESPONSIVE TESTING - TABLET");
  const tabletContext = await browser.newContext({ viewport: { width: 768, height: 1024 } });
  const tabletPage = await tabletContext.newPage();
  await tabletPage.goto("http://localhost:3000/jobs");
  await tabletPage.waitForLoadState("networkidle");
  await tabletPage.screenshot({ path: "qa-11-mobile-jobs.png", fullPage: true });

  console.log("24. RESPONSIVE TESTING - MOBILE");
  const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto("http://localhost:3000/jobs/create");
  await mobilePage.waitForLoadState("networkidle");
  await mobilePage.screenshot({ path: "qa-12-mobile-create.png", fullPage: true });

  await browser.close();
  console.log("DONE");
})();
