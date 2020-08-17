const INIT_STATE = {
    rx: 0,
    ry: 0,
    rz: 0,
    tx: 0,
    ty: 0,
    tz: 0,
    zoom: 1,
}

/** THE PROPS REQUIRED FOR EACH INPUT FIELD **/
const STATE_PROPS = {
    rx: {
        rangeParams: {
            minVal: -90,
            maxVal: 90,
            stepVal: 0.5,
        },
        label: "rotX",
        id: "camera-view-rot-x",
    },
    ry: {
        rangeParams: {
            minVal: -90,
            maxVal: 90,
            stepVal: 0.5,
        },
        label: "rotY",
        id: "camera-view-rot-z",
    },
    rz: {
        rangeParams: {
            minVal: -90,
            maxVal: 90,
            stepVal: 0.5,
        },
        label: "rotZ",
        id: "camera-view-rot-y",
    },
    tx: {
        rangeParams: {
            minVal: -10,
            maxVal: 10,
            stepVal: 0.1,
        },
        label: "t.X",
        id: "camera-view-trans-x",
    },
    ty: {
        rangeParams: {
            minVal: -10,
            maxVal: 10,
            stepVal: 0.1,
        },
        label: "t.Y",
        id: "camera-view-trans-y",
    },
    tz: {
        rangeParams: {
            minVal: -10,
            maxVal: 10,
            stepVal: 0.1,
        },
        label: "t.Z",
        id: "camera-view-trans-z",
    },
    zoom: {
        rangeParams: {
            minVal: 0,
            maxVal: 10,
            stepVal: 0.1,
        },
        label: "zoom",
        id: "camera-view-zoom",
    },
}

const ID_TO_KEY_MAP = {
    [STATE_PROPS.rx.id]: "rx",
    [STATE_PROPS.ry.id]: "ry",
    [STATE_PROPS.rz.id]: "rz",
    [STATE_PROPS.tx.id]: "tx",
    [STATE_PROPS.ty.id]: "ty",
    [STATE_PROPS.tz.id]: "tz",
    [STATE_PROPS.zoom.id]: "zoom",
}

export default { INIT_STATE, STATE_PROPS, ID_TO_KEY_MAP }
