const chrome = require("chrome-aws-lambda")
const puppeteer = require("puppeteer-core")
const isDev = process.env.NOW_REGION === "dev1"

async function getOptions() {
  if (isDev) {
    console.log("DEV env detected, launching chrome from your machine")
    return {
      args: chrome.args,
      executablePath: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
      headless: true,
    }
  }

  return {
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: chrome.headless,
  }
}

async function getScreenshot({ url, type = "jpeg", quality = 100 }) {
  console.info("getScreenshot options", { url, type, quality })

  const browser = await puppeteer.launch(await getOptions())

  const page = await browser.newPage()
  await page.goto(url, {
    waitUntil: "networkidle0",
  })
  await page.setViewport({
    width: 1280,
    height: 720,
  })

  const file = await page.screenshot({ type, quality })
  console.log("Screenshot taken")
  await browser.close()
  return file
}

module.exports = { getScreenshot }
