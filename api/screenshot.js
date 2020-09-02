const { getUrlFromPath, getInt, parseUrl } = require("./_lib/utils")
const { getScreenshot } = require("./_lib/index")

module.exports = async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  try {
    const { pathname = "/", query = {} } = parseUrl(req.url, true)

    if (Object.entries(query).length === 0) {
      res.status(400).json({ error: "You must provide some params", code: 400 })
      return
    }

    if (!query.url || Array.isArray(query.url)) {
      res.status(400).json({ error: "You must provide one url param", code: 400 })
      return
    }

    const url = getUrlFromPath(query.url)
    const quality = getInt(query.quality)
    const fullPage = query.fullPage !== undefined ? true : false

    const screenshot = await getScreenshot({ url, quality, fullPage })

    switch (query.json) {
      case "":
        res.status(200).json({
          message: `Complete screenshot of ${query.url}`,
          screenshot: screenshot,
          code: 200,
        })
        break

      default:
        res.setHeader("Content-Type", `image/jpeg`)
        res.status(200).end(screenshot)
        break
    }
  } catch (error) {
    console.error(error)
    if (error.message == "URL not found") {
      res.status(400).json({ error: "You must provide existing url", code: 400 })
    } else {

      res.status(500).send(error)
    }

  }
}
