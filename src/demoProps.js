const container = {
    color: "#333333",
    opacity: 1.0,
    xRange: 200,
    yRange: 200,
}

const newBoxPoint = (x, y, z, id) => {
    return {
        x: [x],
        y: [50 + y],
        color: "#FF0000",
        opacity: 1.0,
        size: (10 * z) / 100,
        type: "points",
        id,
    }
}

const newCamPoint = (x, y, z, zoom, id) => {
    return {
        x: [x],
        y: [-30 + y],
        color: "#FFFFFF",
        opacity: zoom / 10,
        size: (10 * z) / 100,
        type: "points",
        id,
    }
}
const newPlotParams = (cam, box) => {
    const { rx, ry, rz, tx, ty, tz, sx, sy, sz } = box

    const rBox = newBoxPoint(rx + 50, ry, rz, "rbox")
    const sBox = newBoxPoint(sx, sy, sz, "sbox")
    const tBox = newBoxPoint(tx - 50, ty, tz, "tbox")

    const { rx: crx, ry: cry, rz: crz, tx: ctx, ty: cty, tz: ctz, zoom } = cam
    const rCam = newCamPoint(crx + 30, cry, crz, zoom, "rcam")
    const tCam = newCamPoint(ctx - 30, cty, ctz, zoom, "tcam")
    const data = [rBox, sBox, tBox, rCam, tCam]
    return { data, container }
}

export { newPlotParams }
