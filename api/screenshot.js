const { parse } = require("url")
const { getUrlFromPath, getInt } = require("./_lib/utils")
const { addNewLayer } = require("./_lib/jimp")
const { getScreenshot } = require("./_lib/chromium.js")

module.exports = async function (req, res) {
  try {
    const { pathname = "/", query = {} } = parse(req.url, true)
    console.log("Start ------ ")
    console.log(process.env.NOW_REGION === "dev1")

    res.setHeader("Access-Control-Allow-Origin", "*")

    if (Object.entries(query).length === 0) {
      res.status(400).json({ error: "You must provide some params", code: 400 })
    }

    if (!query.url) {
      res.status(400).json({ error: "You must provide an url param", code: 400 })
    }

    const url = getUrlFromPath(query.url)
    const quality = getInt(query.quality)

    const screenshot = await getScreenshot({ url, quality })


    res.setHeader("Content-Type", `image/png`)

    if (!query.newLayer) {
      console.info(`Complete screenshot for ${query.url}. No composition because you didn't provide the newLayer param`)
      res.status(202).end(screenshot)
    }

    const composition = await addNewLayer({
      backgroundBinary: screenshot,
      inputLayer: query.newLayer,
      x: query.x,
      y: query.y,
    })

    res.status(200).end(composition)

  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
}
