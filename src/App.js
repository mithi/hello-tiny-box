import React, { useState } from "react"
import NumericInputField from "./components/NumericInputField"
import {
    Layout,
    ControlCard,
    SliderInputField,
    InputGroup3,
    ToggleRadioCard,
} from "./components/layouts"
import CAM from "./templates/cameraViewParams"
import CUBE from "./templates/cubeStateParams"

// A helper to build the a set of required props... props that would be
// be passed to components like SLIDER or INPUT TEXT FIELD
const consolidateProp = (currentState, stateProps, setFunction) => {
    /**
    consolidatedProps = {
        rx: {
            id,
            label,
            rangeParams: {maxVal, minVal, stepVal},
            value,
            setField,
        },
        ry: { ... }
        ....
    }
     **/

    const consolidatedProps = Object.keys(stateProps).reduce(
        (props, key) => ({
            ...props,
            [key]: {
                ...stateProps[key],
                value: currentState[key],
                setField: setFunction,
            },
        }),
        {}
    )
    return consolidatedProps
}

const CameraControlView = ({ camProps }) => (
    <ControlCard title="Camera View Control">
        <SliderInputField {...camProps.rx} />
        <SliderInputField {...camProps.ry} />
        <SliderInputField {...camProps.rz} />
        <InputGroup3>
            <NumericInputField {...camProps.tx} />
            <NumericInputField {...camProps.ty} />
            <NumericInputField {...camProps.tz} />
        </InputGroup3>
        <NumericInputField {...camProps.zoom} />
    </ControlCard>
)

const CubeStateControlView = ({ cubeProps }) => (
    <ControlCard title="Cube View Control">
        <SliderInputField {...cubeProps.rx} />
        <SliderInputField {...cubeProps.ry} />
        <SliderInputField {...cubeProps.rz} />
        <InputGroup3>
            <NumericInputField {...cubeProps.tx} />
            <NumericInputField {...cubeProps.ty} />
            <NumericInputField {...cubeProps.tz} />
        </InputGroup3>
        <InputGroup3>
            <NumericInputField {...cubeProps.sx} />
            <NumericInputField {...cubeProps.sy} />
            <NumericInputField {...cubeProps.sz} />
        </InputGroup3>
        {/*COLOR STATE IS NOT YET IMPLEMENTED FOR NOW */}
    </ControlCard>
)

const Plot = ({ children }) => <div>{children}</div>

const App = () => {
    const [cameraView, setCameraView] = useState(CAM.INIT_STATE)
    const [cubeState, setCubeState] = useState(CUBE.INIT_STATE)
    const [isCameraView, setControlUi] = React.useState("true")

    const setCameraViewField = (id, newValue) => {
        setCameraView({ ...cameraView, [CAM.ID_TO_KEY_MAP[id]]: newValue })
    }
    const setCubeStateField = (id, newValue) => {
        setCubeState({ ...cubeState, [CUBE.ID_TO_KEY_MAP[id]]: newValue })
    }

    const showCamera = isCameraView === "true"
    const camProps = consolidateProp(cameraView, CAM.STATE_PROPS, setCameraViewField)
    const cubeProps = consolidateProp(cubeState, CUBE.STATE_PROPS, setCubeStateField)

    return (
        <Layout>
            <Layout.Main>
                <Plot children={JSON.stringify(cameraView) + JSON.stringify(cubeState)} />
            </Layout.Main>

            <Layout.Side>
                <ToggleRadioCard
                    value={isCameraView}
                    onChange={setControlUi}
                    option1Label="Cube Control"
                    option2Label="Camera View Control"
                />
                <div hidden={showCamera}>
                    <CameraControlView camProps={camProps} />
                </div>
                <div hidden={!showCamera}>
                    <CubeStateControlView cubeProps={cubeProps} />
                </div>
            </Layout.Side>
        </Layout>
    )
}

export default App
