var Jimp = require("jimp")
async function addNewLayer({ backgroundBinary, type = "image/png", inputLayer, x = 0, y = 0 }) {
  console.log({backgroundBinary, type, inputLayer, x, y})

  const background = await Jimp.read(backgroundBinary)

  const mark = await Jimp.read(inputLayer)
  const watermarkedImage = await background.composite(mark, x, y)
  console.log("Composition finished")
  return await watermarkedImage.getBufferAsync(type)
}

module.exports = { addNewLayer }
