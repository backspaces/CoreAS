import util from '../src/util.js'
import TwoView from '../src/TwoView.js'
import ColorMap from '../src/ColorMap.js'

export default class TwoDraw {
    static defaultOptions() {
        return {
            patchColor: 'random',
            turtleColor: 'random',
            turtleShape: 'dart',
            turtleSize: 1,
            linkColor: 'random',
            linkWidth: 1,
            patchesMap: ColorMap.DarkGray,
            turtlesMap: ColorMap.Basic16,
            initPatches: null,
        }
    }

    // ======================

    constructor(model, twoViewOptions = {}) {
        this.model = model
        this.view = new TwoView(model.world, twoViewOptions)
    }

    // The simple default draw() function.
    // The params object overrides the default options.
    // randomTurtle(t) {return turtlesMap.atIndex(l.id).css}
    draw(params = {}) {
        params = Object.assign({}, TwoDraw.defaultOptions(), params)
        const {
            patchColor,
            turtleColor,
            turtleShape,
            turtleSize,
            linkColor,
            linkWidth,
            patchesMap,
            turtlesMap,
            initPatches,
        } = params
        const { model, view } = this

        if (view.ticks === 0) {
            if (initPatches) {
                const colors = initPatches(model, view)
                view.createPatchPixels(i => colors[i].pixel)
            } else if (patchColor === 'random') {
                view.createPatchPixels(i => patchesMap.randomColor().pixel)
            }
        }

        if (patchColor === 'random' || patchColor === 'static' || initPatches) {
            view.drawPatches() // redraw cached patches colors
        } else if (typeof patchColor === 'function') {
            view.drawPatches(model.patches, p => patchColor(p))
        } else if (util.isImageable(patchColor)) {
            view.drawPatchesImage(patchColor)
        } else {
            view.clear(patchColor)
        }

        const checkColor = (agent, color) =>
            color === 'random' ? turtlesMap.atIndex(agent.id).css : color

        view.drawLinks(model.links, l => ({
            color:
                linkColor === 'random'
                    ? turtlesMap.atIndex(l.id).css
                    : typeof linkColor === 'function'
                    ? checkColor(l, linkColor(t))
                    : linkColor,
            width: linkWidth,
        }))

        view.drawTurtles(model.turtles, t => ({
            // shape: turtleShape,
            shape:
                typeof turtleShape === 'function'
                    ? turtleShape(t)
                    : turtleShape,
            color:
                turtleColor === 'random'
                    ? turtlesMap.atIndex(t.id).css
                    : typeof turtleColor === 'function'
                    ? checkColor(t, turtleColor(t))
                    : turtleColor,
            size: typeof turtleSize === 'function' ? turtleSize(t) : turtleSize,
        }))

        view.tick()
    }
}
