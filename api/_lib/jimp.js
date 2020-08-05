var Jimp = require("jimp")

async function addNewLayer({ backgroundBinary, type = "image/jpeg", inputLayer, x = 0, y = 0, quality }) {
  console.info("addNewLayer options", { backgroundBinary, type, inputLayer, x, y })

  const background = await Jimp.read(backgroundBinary)

  const mark = await Jimp.read(inputLayer)
  const watermarkedImage = await background.composite(mark, x, y).quality(quality)
  console.log("Composition finished")
  return await watermarkedImage.getBufferAsync(type)
}

module.exports = { addNewLayer }
