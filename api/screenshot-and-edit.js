const { getUrlFromPath, getInt, parseUrl } = require("./_lib/utils")
const { addNewLayer, getScreenshot } = require("./_lib/index")

module.exports = async function (req, res) {
  const { pathname = "/", query = {} } = parseUrl(req.url, true)

  if (Object.entries(query).length === 0) {
    res.status(400).json({ error: "You must provide some params", code: 400 })
  }

  if (!query.url) {
    res.status(400).json({ error: "You must provide an url param", code: 400 })
  }

  const url = getUrlFromPath(query.url)
  const quality = getInt(query.quality)
  const screenshot = await getScreenshot({ url, quality })

  if (!query.newLayer) {
    console.info(`Complete screenshot for ${query.url}. No composition because you didn't provide the newLayer param`)
    res.status(202).end(screenshot)
  }

  const composition = await addNewLayer({
    backgroundBinary: screenshot,
    inputLayer: query.newLayer,
    x: query.x,
    y: query.y,
    quality,
  })

  res.setHeader("Content-Type", `image/jpeg`)
  res.status(200).end(composition)
}
