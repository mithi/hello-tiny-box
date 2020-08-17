const radians = thetaDegrees => (thetaDegrees * Math.PI) / 180
const getSinCos = theta => [Math.sin(radians(theta)), Math.cos(radians(theta))]
const dot = (a, b) => a.x * b.x + a.y * b.y + a.z * b.z

const vectorLength = v => Math.sqrt(dot(v, v))
const vectorFromTo = (a, b) => new Vector(b.x - a.x, b.y - a.y, b.z - a.z)
const scaleVector = (v, d) => new Vector(d * v.x, d * v.y, d * v.z)

const cross = (a, b) => {
    const x = a.y * b.z - a.z * b.y
    const y = a.z * b.x - a.x * b.z
    const z = a.x * b.y - a.y * b.x
    return new Vector(x, y, z)
}

const getNormalofThreePoints = (a, b, c) => {
    const ba = vectorFromTo(b, a)
    const bc = vectorFromTo(b, c)
    const n = cross(ba, bc)
    const len_n = vectorLength(n)
    const unit_n = scaleVector(n, 1 / len_n)

    return unit_n
}

const uniformMatrix4x4 = d => {
    const dRow = [d, d, d, d]
    return [dRow.slice(), dRow.slice(), dRow.slice(), dRow.slice()]
}

const multiply4x4 = (matrixA, matrixB) => {
    let resultMatrix = uniformMatrix4x4(null)

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            resultMatrix[i][j] =
                matrixA[i][0] * matrixB[0][j] +
                matrixA[i][1] * matrixB[1][j] +
                matrixA[i][2] * matrixB[2][j] +
                matrixA[i][3] * matrixB[3][j]
        }
    }

    return resultMatrix
}

function rotX(theta, tx = 0, ty = 0, tz = 0) {
    const [s, c] = getSinCos(theta)

    return [
        [1, 0, 0, tx],
        [0, c, -s, ty],
        [0, s, c, tz],
        [0, 0, 0, 1],
    ]
}

function rotY(theta) {
    const [s, c] = getSinCos(theta)
    return [
        [c, 0, s, 0],
        [0, 1, 0, 0],
        [-s, 0, c, 0],
        [0, 0, 0, 1],
    ]
}

function rotZ(theta) {
    const [s, c] = getSinCos(theta)
    return [
        [c, -s, 0, 0],
        [s, c, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
    ]
}

const rotXYZ = eulerVec => {
    const rx = rotX(eulerVec.x)
    const ry = rotY(eulerVec.y)
    const rz = rotZ(eulerVec.z)
    const rxy = multiply4x4(rx, ry)
    const rxyz = multiply4x4(rxy, rz)
    return rxyz
}

class Vector {
    constructor(x, y, z, name) {
        this.x = x
        this.y = y
        this.z = z
        this.name = name
    }

    getTransformedPoint(transformMatrix) {
        const [r0, r1, r2] = transformMatrix.slice(0, 3)
        const [r00, r01, r02, tx] = r0
        const [r10, r11, r12, ty] = r1
        const [r20, r21, r22, tz] = r2

        const newX = this.x * r00 + this.y * r01 + this.z * r02 + tx
        const newY = this.x * r10 + this.y * r11 + this.z * r12 + ty
        const newZ = this.x * r20 + this.y * r21 + this.z * r22 + tz
        return new Vector(newX, newY, newZ, this.name)
    }
}

const tMatrix = translation => [
    [1, 0, 0, translation.x],
    [0, 1, 0, translation.y],
    [0, 0, 1, translation.z],
    [0, 0, 0, 1],
]

const sMatrix = s => [
    [s.x, 0, 0, 0],
    [0, s.y, 0, 0],
    [0, 0, s.z, 0],
    [0, 0, 0, 1],
]

/*
   E4------F5      y
   |`.    | `.     |
   |  `A0-----B1   *----- x
   |   |  |   |     \
   G6--|--H7  |      \
    `. |   `. |       z
      `C2-----D3
*/
class NormalUnitCube {
    CENTER = new Vector(0, 0, 0, "cube-center") // cube-center
    POINTS = [
        new Vector(-1, +1, +1, "front-top-left"), // A0
        new Vector(+1, +1, +1, "front-top-right"), // B1
        new Vector(-1, -1, +1, "front-bottom-left"), // C2
        new Vector(+1, -1, +1, "front-bottom-right"), // D3
        new Vector(-1, +1, -1, "back-top-left"), // E4
        new Vector(+1, +1, -1, "back-top-right"), // F5
        new Vector(-1, -1, -1, "back-bottom-left"), // G6
        new Vector(+1, -1, -1, "back-bottom-right"), // H7
    ]
}

class Cube {
    UNIT_CUBE = new NormalUnitCube()
    constructor(
        eulerVec = new Vector(0, 0, 0),
        scale = new Vector(1, 1, 1),
        translateVec = new Vector(0, 0, 0)
    ) {
        const rMatrix = rotXYZ(eulerVec)
        const s = scale
        const t = translateVec
        this.wrtWorldMatrix = multiply4x4(tMatrix(t), multiply4x4(sMatrix(s), rMatrix))
        this.points = this.UNIT_CUBE.POINTS
    }
}

const getWorldWrtCameraMatrix = (
    translateVec = Vector(0, 0, 0),
    eulerVec = Vector(0, 0, 0)
) => {
    const r = rotXYZ(eulerVec)
    const t = translateVec
    // Inverse of rotations matrix
    // inverse_matrix = rotateCameraMatrixInverse * translateCameraMatrixInverse
    // world_to_camera_matrix
    return [
        [r[0][0], r[1][0], r[2][0], -t.x],
        [r[0][1], r[1][1], r[2][1], -t.y],
        [r[0][2], r[1][2], r[2][2], -t.z],
        [0, 0, 0, 1],
    ]
}
const getProjectedPoint = (point, projectionConstant) => {
    return new Vector(
        (point.x / point.z) * projectionConstant,
        (point.y / point.z) * projectionConstant,
        projectionConstant,
        point.name
    )
}

const renderCube = (cube, cubeWrtCameraMatrix, projectionConstant) => {
    let projectedPoints = []
    let transformedPoints = []
    cube.points.forEach(point => {
        const transformedPoint = point.getTransformedPoint(cubeWrtCameraMatrix)
        const projectedPoint = getProjectedPoint(transformedPoint, projectionConstant)
        transformedPoints.push(transformedPoint)
        projectedPoints.push(projectedPoint)
    })

    return [transformedPoints, projectedPoints]
}

// RENDER SCENE

const renderScene = (box, cam) => {
    const Z_TRANSLATE_OFFSET = 5
    const PROJECTION_CONSTANT = 300 * cam.zoom
    const CAMERA_POSITION = new Vector(cam.tx, cam.ty, cam.tz + Z_TRANSLATE_OFFSET)
    const CAMERA_ORIENTATION = new Vector(cam.rx, cam.ry, cam.rz)
    const worldWrtCameraMatrix = getWorldWrtCameraMatrix(
        CAMERA_POSITION,
        CAMERA_ORIENTATION
    )
    // euler orientation rotation
    const r = new Vector(box.rx, box.ry, box.rz)
    // translate vector
    const t = new Vector(box.tx, box.ty, box.tz)
    // scale magnitude
    const s = new Vector(box.sx, box.sy, box.sz)

    const cube = new Cube(r, s, t)
    const cubeWrtCameraMatrix = multiply4x4(worldWrtCameraMatrix, cube.wrtWorldMatrix)
    const [transformedPoints, projectedPoints] = renderCube(
        cube,
        cubeWrtCameraMatrix,
        PROJECTION_CONSTANT
    )

    const isFrontFacing = arePlanesFrontFacing(transformedPoints, CAMERA_POSITION)
    return drawBox(projectedPoints, isFrontFacing)
}

/*
   E4------F5      y
   |`.    | `.     |
   |  `A0-----B1   *----- x
   |   |  |   |     \
   G6--|--H7  |      \
    `. |   `. |       z
      `C2-----D3

face 1 - A0, B1, D3 | C2 (front)
face 2 - B1, F5, H7 | D3 (front right)
face 3 - F5, E4, G6 | H7 (front left)
face 4 - E4, A0, C2 | G6 (back)
face 5 - E4, F5, B1 | A0 (top)
face 6 - C2 , D3, H7 | G6 |(bottom)

IMPORTANT!
The second point (ie B1 of set [A0, B1, D3, C2]
is the center of A0, B1, D3 which is where we will
compute the normal of the plane
*/

// use back face culling to figure out which
// faces are in front

const POINT_FACE_SET = [
    [0, 1, 3, 2],
    [1, 5, 7, 3],
    [5, 4, 6, 7],
    [4, 0, 2, 6],
    [4, 5, 1, 0],
    [2, 3, 7, 6],
]

// t is the transformed points [{x, y, z}, {x, y, z}]
// returns if the respective planes defined by the for points (POINT_FACE_SET)
//  are front facing or not
const arePlanesFrontFacing = (transformedPoints, cameraOriginPoint) => {
    const t = transformedPoints
    return POINT_FACE_SET.map(pointIds => {
        const [a, b, c] = pointIds

        const n = getNormalofThreePoints(t[a], t[b], t[c])
        const v = vectorFromTo(t[a], cameraOriginPoint)
        const isFrontFacing = dot(n, v) > 0.0

        return isFrontFacing
    })
}

const drawBox = (projectedPoints, isFrontFacing) => {
    const p = projectedPoints
    const container = {
        color: "#333333",
        opacity: 1.0,
        xRange: 600,
        yRange: 600,
    }

    const COLORS = ["#32ff7e", "#e056fd", "#E91E63", "#fa8231", "#fff200", "#ff3838"]
    const OPACITY = [0.75, 0.75, 0.75, 0.75, 0.75, 0.75]

    let data = []
    isFrontFacing.forEach((isFront, index) => {
        const [a, b, c, d] = POINT_FACE_SET[index]
        const plane = {
            x: [p[a].x, p[b].x, p[c].x, p[d].x],
            y: [p[a].y, p[b].y, p[c].y, p[d].y],
            borderColor: "#0652DD",
            borderOpacity: 1.0,
            fillColor: COLORS[index],
            fillOpacity: OPACITY[index],
            borderSize: 8,
            type: "polygon",
            id: `plane-${index}`,
        }
        const points = {
            x: [p[a].x, p[b].x, p[c].x, p[d].x],
            y: [p[a].y, p[b].y, p[c].y, p[d].y],
            color: "#0652DD",
            opacity: 1.0,
            size: 15,
            type: "points",
            id: `points-${index}`,
        }

        data = isFront ? [...data, plane, points] : [plane, points, ...data]
    })

    return { data, container }
}

export { Cube, renderScene, drawBox }
