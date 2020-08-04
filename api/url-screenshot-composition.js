const { parse } = require("url")
const { addNewLayer } = require("./_lib/jimp")
module.exports = async function (req, res) {
  try {
    const { pathname = "/", query = {} } = parse(req.url, true)
    const screenshot = await getScreenshot(query.url)
    const composition = await addNewLayer({
      backgroundBinary: screenshot,
      inputLayer: query.newLayer,
      x: query.x,
      y: query.y,
    })

    if (!query.url) {
      res.statusCode = 400
      res.json = { error: "You must provide an url param", code: 400 }
    }

    if (!query.newLayer) {
      res.statusCode = 202
      res.json({
        message: `Complete screenshot for ${query.screenshot.url}. No composition because you didn't provide the newLayer param`,
        screenshot: screenshot,
        code: 202,
      })
    }

    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    res.json({
      message: `Complete screenshot for ${query.screenshot.url}. Added new layer to the screenshot`,
      screenshot: screenshot,
      composition: composition,
      code: 200,
    })
  } catch (error) {
    res.statusCode = 500
    res.send = error
  }
}
