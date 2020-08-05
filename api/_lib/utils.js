const { parse: parseUrl } = require("url")

function getUrlFromPath(url) {
  if (!url.startsWith("http")) {
    return "http://" + url
  }
  return url
}

function getInt(str) {
  return /[0-9]+/.test(str) ? parseInt(str) : undefined
}

function isValidUrl(str) {
  try {
    const url = new URL(str)
    return url.hostname.includes(".")
  } catch (e) {
    console.error(e.message)
    return false
  }
}


module.exports = { isValidUrl, getUrlFromPath, getInt, parseUrl }
