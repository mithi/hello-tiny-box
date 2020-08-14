import React, { useState, useRef } from "react"
import TextField from "@material-ui/core/TextField"

const cleanValue = (newValue, ref, { minVal, maxVal, stepVal }) => {
    const validity = ref.current.validity
    const isValid = false

    if (validity.badInput) {
        return { isValid, message: "NaN" }
    }

    if (validity.rangeOverflow) {
        return { isValid, message: `max=${maxVal}` }
    }

    if (validity.rangeUnderflow) {
        return { isValid, message: `min=${minVal}` }
    }

    if (validity.stepMismatch) {
        return { isValid, message: `step=${stepVal}` }
    }

    if (!ref.current.checkValidity()) {
        return { isValid, message: "Error" }
    }

    const numberValue = parseFloat(newValue)

    if (isNaN(numberValue)) {
        return { isValid, message: "NAN" }
    }

    return { isValid: true, message: "", value: numberValue }
}

const InputField = ({ id, label, value, setField, rangeParams }) => {
    const { minVal, maxVal, stepVal } = rangeParams
    const [message, setMessage] = useState("")
    const ref = useRef(null)

    const handleChange = newValue => {
        const { isValid, value: cleanedValue, message: newMessage } = cleanValue(
            newValue,
            ref,
            rangeParams
        )
        if (isValid) {
            setField(id, cleanedValue)
        }

        setMessage(newMessage)
    }

    return (
        <div style={{ margin: "5px" }}>
            <TextField
                id={id}
                label={label}
                value={value}
                inputRef={ref}
                InputProps={{
                    type: "number",
                    input: "numeric",
                    min: minVal,
                    max: maxVal,
                    step: stepVal,
                }}
                error={message === "" ? false : true}
                variant="outlined"
                onChange={e => handleChange(e.target.value)}
                helperText={message}
            />
        </div>
    )
}

export default InputField
