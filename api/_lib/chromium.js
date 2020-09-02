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

async function getScreenshot({ url, type = "jpeg", quality = 100, fullPage = false }) {
  console.info("getScreenshot options", { url, type, quality })

  const browser = await puppeteer.launch(await getOptions())
  const page = await browser.newPage()
  const getMethods = (obj) => Object.getOwnPropertyNames(obj).filter((item) => typeof obj[item] === "function")
  await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3419.0 Safari/537.36")
  await page
    .goto(url, {
      waitUntil: "networkidle0",
    })
    .catch((error) => {
      const string = error.message
      if (string.includes("net::ERR_NAME_NOT_RESOLVED")) throw new Error("URL not found")
    })
  await page.setViewport({
    width: 1280,
    height: 720,
  })

  const file = await page.screenshot({ type, quality, fullPage })
  console.log("Screenshot taken")
  await browser.close()
  return file
}

module.exports = { getScreenshot }
