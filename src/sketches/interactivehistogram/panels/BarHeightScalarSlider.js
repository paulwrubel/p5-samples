import React from 'react';
import { Slider, Typography } from '@material-ui/core';

class BarHeightScalarSlider extends React.Component {
    constructor(props) {
        super(props);

        this.handleBarHeightScalarChange = this.handleBarHeightScalarChange.bind(this);
    }

    handleBarHeightScalarChange(event, newValue) {
        this.props.onBarHeightScalarChange(newValue);
    }

    render() {
        return (
            <div>
                <Slider
                    defaultValue={250}
                    value={this.props.barHeightScalar || 250}
                    onChange={this.handleBarHeightScalarChange}
                    min={50}
                    max={500}
                    step={5}
                    aria-labelledby="bar-height-scalar-slider"
                    valueLabelDisplay="on"
                />
                <Typography id="bar-height-scalar-slider" gutterBottom>
                    Bar Height Scalar
                </Typography>
            </div>
        );
    }
}

export default BarHeightScalarSlider;
