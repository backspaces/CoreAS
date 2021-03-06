import * as util from 'https://code.agentscript.org/src/utils.js'
import { createCanvas } from 'https://raw.githubusercontent.com/DjDeveloperr/deno-canvas/master/mod.ts'

function rgbaToPixel(r, g, b, a = 255) {
    const rgba = new Uint8Array([r, g, b, a])
    const pixels = new Uint32Array(rgba.buffer)
    return pixels[0]
}
function randomPixel() {
    const r255 = () => util.randomInt(256) // random int in [0,255]
    return rgbaToPixel(r255(), r255(), r255())
}

export default class DenoPatchesView {
    // Ctor: create a 2D context and imageData for this View
    constructor(width, height) {
        this.canvas = createCanvas(width, height)
        this.ctx = this.canvas.getContext('2d')
        this.imageData = this.ctx.getImageData(0, 0, width, height)
        this.pixels = new Uint32Array(this.imageData.data.buffer)

        console.log(this.pixels)
    }

    // // Set the imageData and pixels values from the pixel's canvas ctx
    // resetImageData() {
    //     this.imageData = util.ctxImageData(this.ctx)
    //     this.pixels = new Uint32Array(this.imageData.data.buffer)
    //     // this.length = this.pixels.length
    // }
    // setPatchesSmoothing(smoothting) {
    //     this.useImageSmoothing = smoothting
    // }

    // // Install pixels in this imageData object.
    // // pixelFcn(d) returns a pixel for each data item.data can be patches
    // // or data derived from patches using patch state values.
    // setPixels(data, pixelFcn = d => d) {
    //     if (util.isOofA(data)) data = util.toAofO(data)
    //     if (data.length !== this.pixels.length) {
    //         throw Error(
    //             'setPixels, data.length != pixels.length ' +
    //                 data.length +
    //                 ' ' +
    //                 this.pixels.length
    //         )
    //     }
    //     util.forLoop(data, (d, i) => {
    //         this.pixels[i] = getPixel(pixelFcn(d))
    //     })

    //     // if (updateCanvas) this.ctx.putImageData(this.imageData, 0, 0)
    // }
    // createPixels(pixelFcn) {
    //     util.repeat(this.pixels.length, i => {
    //         this.pixels[i] = getPixel(pixelFcn(i))
    //     })
    //     // if (updateCanvas) this.ctx.putImageData(this.imageData, 0, 0)
    // }
    // // Used to be: setPixel(x, y, pixel) {
    // // but best to be purely independent of world object
    // setPixel(index, pixel) {
    //     // const index = world.xyToPatchIndex(x, y)
    //     this.pixels[index] = getPixel(pixel)
    // }

    // // Draw this pixel canvas onto a View 2D canvas ctx.
    // draw(ctx) {
    //     const smoothing = this.ctx.imageSmoothingEnabled
    //     ctx.imageSmoothingEnabled = this.useImageSmoothing
    //     this.ctx.putImageData(this.imageData, 0, 0)
    //     // this.updateCanvas()
    //     util.fillCtxWithImage(ctx, this.ctx.canvas)
    //     ctx.imageSmoothingEnabled = smoothing
    // }
    // clear(color) {
    //     // typedColor -> css
    //     color = color.css || color

    //     if (!color || typeof color === 'string') {
    //         util.clearCtx(this.ctx, color)
    //     } else if (typeof color === 'number') {
    //         this.createPixels(() => color)
    //     } else {
    //         throw Error('patchesView.clear(): illegal color ' + color)
    //     }

    //     if (typeof color === 'number') {
    //         this.updateCanvas()
    //     } else {
    //         this.resetImageData()
    //     }
    // }

    // // Return promise for an ImageBitmap of the current ctx
    // // Note safari does not support createImageBitmap as of 4/20/19
    // // REMIND: See if imagebitmaps can avoid img alpha premultiply etc
    // getImageBitmap(options = {}) {
    //     return createImageBitmap(this.imageData, options)
    // }
    // drawImageBitmap(ctx, options = {}) {
    //     createImageBitmap(this.imageData, options).then(img =>
    //         util.fillCtxWithImage(ctx, img)
    //     )
    // }

    // // Push imageData to canvas, return the canvas
    // updateCanvas() {
    //     this.ctx.putImageData(this.imageData, 0, 0)
    //     return this.ctx.canvas
    // }
}
