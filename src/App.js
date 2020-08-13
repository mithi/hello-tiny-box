import React, { useState } from "react"
import "./App.css"
import NumericInputField from "./NumericInputField"

const ControlBar = () => {
    const [value, setValue] = useState({ cameraView: 0 })

    const setField = (id, newValue) => {
        if (id === "cameraView") {
            setValue({ cameraView: newValue })
        }
        console.log(value, id, newValue)
    }

    return (
        <div id="controls">
            <NumericInputField
                label
                id="cameraView"
                value={value.cameraView}
                setField={setField}
                rangeParams={{ minVal: -100, maxVal: 100, stepVal: 5 }}
            />
        </div>
    )
}

const Plot = () => <div id="plot">Plot goes here</div>

class App extends React.Component {
    render() {
        return (
            <div id="main">
                <ControlBar />
                <Plot />
            </div>
        )
    }
}

export default App
