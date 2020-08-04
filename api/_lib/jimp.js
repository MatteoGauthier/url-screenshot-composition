var Jimp = require("jimp")
async function addNewLayer({ backgroundBinary, type = "image/png", inputLayer, x = 0, y = 0 }) {
  const background = await Jimp.read(backgroundBinary)

  const mark = await Jimp.read(inputLayer)
  const watermarkedImage = await background.composite(mark, x, y)

  return await watermarkedImage.getBufferAsync(type)
}

module.exports = { addNewLayer }
