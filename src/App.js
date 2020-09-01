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
import BOX from "./templates/boxModelParams"
import BareMinimum2d from "bare-minimum-2d"
import { renderScene } from "./box"
import { Button } from "@material-ui/core"
import GitHubIcon from "@material-ui/icons/GitHub"

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

        <SliderInputField {...camProps.tx} />
        <SliderInputField {...camProps.ty} />
        <SliderInputField {...camProps.tz} />
        <NumericInputField {...camProps.zoom} />
    </ControlCard>
)

const BoxModelControlView = ({ boxProps }) => (
    <ControlCard title="Cube View Control">
        <SliderInputField {...boxProps.rx} />
        <SliderInputField {...boxProps.ry} />
        <SliderInputField {...boxProps.rz} />
        <InputGroup3>
            <NumericInputField {...boxProps.tx} />
            <NumericInputField {...boxProps.ty} />
            <NumericInputField {...boxProps.tz} />
        </InputGroup3>
        <InputGroup3>
            <NumericInputField {...boxProps.sx} />
            <NumericInputField {...boxProps.sy} />
            <NumericInputField {...boxProps.sz} />
        </InputGroup3>
        {/*COLOR STATE IS NOT YET IMPLEMENTED FOR NOW */}
    </ControlCard>
)

const App = () => {
    const [cameraViewState, setCameraViewState] = useState(CAM.INIT_STATE)
    const [boxModelState, setBoxModelState] = useState(BOX.INIT_STATE)
    const [isCameraView, setControlUi] = React.useState("true")

    const setCameraViewField = (id, newValue) => {
        setCameraViewState({ ...cameraViewState, [CAM.ID_TO_KEY_MAP[id]]: newValue })
    }
    const setBoxModelField = (id, newValue) => {
        setBoxModelState({ ...boxModelState, [BOX.ID_TO_KEY_MAP[id]]: newValue })
    }

    const showCamera = isCameraView === "true"
    const camProps = consolidateProp(cameraViewState, CAM.STATE_PROPS, setCameraViewField)
    const boxProps = consolidateProp(boxModelState, BOX.STATE_PROPS, setBoxModelField)
    const plotProps = renderScene(boxModelState, cameraViewState)

    return (
        <Layout>
            <Layout.Main>
                <BareMinimum2d {...plotProps} />
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
                    <BoxModelControlView boxProps={boxProps} />
                </div>
                <div style={{ textAlign: "center" }}>
                    <a href="https://github.com/mithi/hello-tiny-box/">
                        <Button
                            variant="outlined"
                            style={{ margin: "20px 0px 10px 0px" }}
                            startIcon={<GitHubIcon />}
                        >
                            Github Repository
                        </Button>
                    </a>
                </div>
            </Layout.Side>
        </Layout>
    )
}

export default App
