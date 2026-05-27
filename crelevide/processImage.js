import { rgbToLecreColor, toLecrePos } from "./lecrefuncs.js"

function processImage(canvas, ctx) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    let res = "~E-AAgAf/f2ABAAAAAAA-AAgAgCgMACAAAAAAA-" // Beebo spawn point and IC, needed or else crash
    const BLOCKCODE = ["AM", "AEAEAEAAA", "AAAAAA-"] // Labblock split at color and position

    const initialPos = 2040 // Offset so it appears in middle of level
    let x=0
    let y=0
    let z=0
    for (let i = 0; i < pixels.length; i += 4) {

        let x = i % (canvas.width * 4)
        if (x == 0) {
            console.log("New row")
            y += 1
        }
        let color = rgbToLecreColor(pixels[i], pixels[i+1], pixels[i+2])
        let position = toLecrePos((x) + initialPos, (y*-4) + initialPos, (z*4) + initialPos)

        const newBlock = BLOCKCODE[0] + position + BLOCKCODE[1] + color + BLOCKCODE[2]

        console.log(newBlock)
        res += newBlock
    }

    return res
}

export { processImage }
