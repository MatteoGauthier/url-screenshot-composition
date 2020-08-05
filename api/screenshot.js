const { parse } = require("url")
const { getUrlFromPath } = require("./_lib/utils")
const { addNewLayer } = require("./_lib/jimp")
const { getScreenshot } = require("./_lib/chromium.js")

module.exports = async function (req, res) {
  try {
    const { pathname = "/", query = {} } = parse(req.url, true)
    console.log("Start ------ ")
    console.log(process.env.NOW_REGION === "dev1")

    if (Object.entries(query).length === 0) {
      res.status(400).json({ error: "You must provide some params", code: 400 })
    }

    if (!query.url) {
      res.status(400).json({ error: "You must provide an url param", code: 400 })
    }

    const url = getUrlFromPath(query.url)
    const screenshot = await getScreenshot(url)

    if (!query.newLayer) {
      console.info("No newLayer param");
      res.status(202).json({
        message: `Complete screenshot for ${query.url}. No composition because you didn't provide the newLayer param`,
        screenshot: screenshot,
        code: 202,
      })
    }

    const composition = await addNewLayer({
      backgroundBinary: screenshot,
      inputLayer: query.newLayer,
      x: query.x,
      y: query.y,
    })

    res.status(200).json({
      message: `Complete screenshot for ${query.url}. Added new layer to the screenshot`,
      screenshot: screenshot,
      composition: composition,
      code: 200,
    })
  } catch (error) {
    console.log(error);
    res.status(500).send(error)
  }
}
