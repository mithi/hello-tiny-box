const INIT_STATE = {
    rx: 0,
    ry: 0,
    rz: 0,
    tx: 0,
    ty: 0,
    tz: 0,
    sx: 1,
    sy: 1,
    sz: 1,
    color: 0,
}

/** THE PROPS REQUIRED FOR EACH INPUT FIELD **/
const STATE_PROPS = {
    rx: {
        rangeParams: {
            minVal: -180,
            maxVal: 180,
            stepVal: 0.5,
        },
        label: "rotX",
        id: "cube-state-rot-x",
    },
    ry: {
        rangeParams: {
            minVal: -180,
            maxVal: 180,
            stepVal: 0.5,
        },
        label: "rotY",
        id: "cube-state-rot-z",
    },
    rz: {
        rangeParams: {
            minVal: -180,
            maxVal: 180,
            stepVal: 0.5,
        },
        label: "rotZ",
        id: "cube-state-rot-y",
    },

    // ---------------------------

    tx: {
        rangeParams: {
            minVal: -100,
            maxVal: 100,
            stepVal: 1,
        },
        label: "t.X",
        id: "cube-state-trans-x",
    },
    ty: {
        rangeParams: {
            minVal: -100,
            maxVal: 100,
            stepVal: 1,
        },
        label: "t.Y",
        id: "cube-state-trans-y",
    },
    tz: {
        rangeParams: {
            minVal: -100,
            maxVal: 100,
            stepVal: 1,
        },
        label: "t.Z",
        id: "cube-state-trans-z",
    },

    // ---------------------------

    sx: {
        rangeParams: {
            minVal: 0,
            maxVal: 10,
            stepVal: 0.1,
        },
        label: "s.X",
        id: "cube-state-scale-x",
    },

    sy: {
        rangeParams: {
            minVal: 0,
            maxVal: 10,
            stepVal: 0.1,
        },
        label: "s.Y",
        id: "cube-state-scale-y",
    },
    sz: {
        rangeParams: {
            minVal: 0,
            maxVal: 10,
            stepVal: 0.1,
        },
        label: "s.Z",
        id: "cube-state-scale-z",
    },
    // ---------------------------

    color: {
        label: "color",
        id: "cube-color",
    },
}

const ID_TO_KEY_MAP = {
    [STATE_PROPS.rx.id]: "rx",
    [STATE_PROPS.ry.id]: "ry",
    [STATE_PROPS.rz.id]: "rz",

    [STATE_PROPS.tx.id]: "tx",
    [STATE_PROPS.ty.id]: "ty",
    [STATE_PROPS.tz.id]: "tz",

    [STATE_PROPS.sx.id]: "sx",
    [STATE_PROPS.sy.id]: "sy",
    [STATE_PROPS.sz.id]: "sz",

    [STATE_PROPS.color.id]: "color",
}

export default { INIT_STATE, STATE_PROPS, ID_TO_KEY_MAP }
