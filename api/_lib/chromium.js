const chrome = require("chrome-aws-lambda")
const puppeteer = require("puppeteer-core")

async function getScreenshot( url, type, quality ) {
  const browser = await puppeteer.launch({
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: chrome.headless,
  })

  const page = await browser.newPage()
  await page.goto(url, {
    waitUntil: "networkidle0",
  })
  await page.setViewport({
    width: 1200,
    height: 800,
  })

  const file = await page.screenshot({ type, quality })
  await browser.close()
  return file
}

module.exports = { getScreenshot }
