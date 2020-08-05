const { getUrlFromPath, getInt, parseUrl } = require("./_lib/utils")
const { getScreenshot } = require("./_lib/index")

module.exports = async function (req, res) {
  try {
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

    res.setHeader("Access-Control-Allow-Origin", "*")

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
    console.log(error)
    res.status(500).send(error)
  }
}
