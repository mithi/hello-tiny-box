import React, { useState, useRef } from "react"

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
        return { isValid, message: `Error` }
    }

    const numberValue = parseFloat(newValue)

    if (isNaN(numberValue)) {
        return { isValid, message: `NAN` }
    }

    return { isValid: true, message: "", value: numberValue }
}

const InputField = ({ id, label, value, setField, rangeParams }) => {
    const [message, setMessage] = useState("")
    const ref = useRef(null)
    const { minVal, maxVal, stepVal } = rangeParams

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

    const inputProps = {
        type: "number",
        input: "numeric",
        ref,
        value,
        min: minVal,
        max: maxVal,
        step: stepVal,
    }

    return (
        <div>
            <label htmlFor={id} className="label">
                {label}
            </label>
            <input {...inputProps} onChange={e => handleChange(e.target.value)} />
            <label className="label red">{message}</label>
        </div>
    )
}

export default InputField
