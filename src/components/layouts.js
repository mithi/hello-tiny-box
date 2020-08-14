import React from "react"
import { ThemeProvider } from "@material-ui/styles"
import {
    Grid,
    CssBaseline,
    Typography,
    createMuiTheme,
    CardContent,
    Slider,
    Card,
    Radio,
    RadioGroup,
    FormControlLabel,
    Box,
} from "@material-ui/core"

const theme = createMuiTheme({
    palette: {
        type: "dark",
    },
})

const SliderInputField = ({ id, label, value, rangeParams, setField }) => {
    const handleChange = (_, newValue) => setField(id, newValue)
    return (
        <>
            <Typography gutterBottom>{label}</Typography>
            <Slider
                {...{
                    value: typeof value === "number" ? value : 0,
                    step: rangeParams.stepVal,
                    min: rangeParams.minVal,
                    max: rangeParams.maxVal,
                    valueLabelDisplay: "on",
                    onChange: handleChange,
                }}
            />
        </>
    )
}

const ControlCard = ({ title, children }) => (
    <Card variant="outlined" style={{ margin: "20px" }}>
        <Box bgcolor="#333333">
            <CardContent>
                <Typography variant="h6" style={{ marginBottom: "10px" }} component="h2">
                    {title}
                </Typography>
                {children}
            </CardContent>
        </Box>
    </Card>
)

const InputGroup3 = ({ children }) => {
    return (
        <Grid container spacing={1} style={{ marginBottom: "10px" }}>
            {children.map(child => (
                <Grid key={child.props.id} item sm={4}>
                    {child}
                </Grid>
            ))}
        </Grid>
    )
}

const ToggleRadioCard = ({ radioValue, onChange, option1Label, option2Label }) => (
    <ControlCard>
        <RadioGroup name="" value={radioValue} onChange={e => onChange(e.target.value)}>
            <FormControlLabel value="true" control={<Radio />} label={option1Label} />
            <FormControlLabel value="false" control={<Radio />} label={option2Label} />
        </RadioGroup>
    </ControlCard>
)

class Layout extends React.Component {
    static Side = ({ children }) => (
        <Grid item sm={12} md={4}>
            {children}
        </Grid>
    )
    static Main = ({ children }) => (
        <Grid item sm={12} md={8}>
            <Card
                variant="outlined"
                style={{
                    height: "95vh",
                    width: "100",
                    margin: "20px",
                }}
            >
                {children}
            </Card>
        </Grid>
    )

    render() {
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Grid container spacing={0}>
                    {this.props.children}
                </Grid>
            </ThemeProvider>
        )
    }
}

export { Layout, ControlCard, SliderInputField, InputGroup3, ToggleRadioCard }
