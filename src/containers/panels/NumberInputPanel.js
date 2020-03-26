import React from 'react';
import { Paper, TextField, Typography, Box, Grid } from '@material-ui/core';
import "containers/Panels.css"

class NumberInputPanel extends React.Component {

    constructor(props) {
        super(props);

        let inputMap = new Map();

        props.numberInputs.forEach(i => {
            inputMap.set(i.key, i.value);
        })

        this.state = {
            inputMap: inputMap,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(key, newValue) {
        this.setState((state) => {
            return {inputMap: state.inputMap.set(key, newValue)}
        })
    }

    isValid = (inputStr, minValue, maxValue) => {
        return /^\d*$/.test(inputStr) &&
            (typeof minValue !== "undefined" ? parseInt(inputStr) >= minValue : true) &&
            (typeof maxValue !== "undefined" ? parseInt(inputStr) <= maxValue : true) 
    };

    render() {
        return (
            <Box>
                <Paper elevation={2}
                    className="PaperNumberInputs">
                    <Typography gutterBottom>
                        {this.props.label}
                    </Typography>
                    {this.props.numberInputs.map(i => (
                        <Grid container
                            key={i.key}
                            spacing={2}
                            direction="row"
                            alignItems="center"
                        >
                            {/* <Grid item>
                                <Typography id={i.key}>
                                    {i.label}
                                </Typography>
                            </Grid> */}
                            <Grid item xs className="Grow">
                                <TextField
                                    value={this.state.inputMap.get(i.key)}
                                    onChange={(event => {
                                        let value = event.target.value;
                                        this.handleInputChange(i.key, value);
                                        if (this.isValid(value, i.minValue, i.maxValue)) {
                                            i.onChange(parseInt(value));
                                        }
                                    })}
                                    error={!this.isValid(this.state.inputMap.get(i.key), i.minValue, i.maxValue)}
                                    helperText={!this.isValid(this.state.inputMap.get(i.key), i.minValue, i.maxValue) ? 
                                        `Please enter a number between ${i.minValue} and ${i.maxValue}` : 
                                        null}
                                    label={i.label}
                                    // type="number"
                                    // InputLabelProps={{
                                    //     shrink: true,
                                    // }}
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    ))}
                </Paper>
            </Box>
        );
    }
}

export default NumberInputPanel;
