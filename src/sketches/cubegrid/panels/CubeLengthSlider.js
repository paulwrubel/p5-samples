import React from 'react';
import { Slider, Typography } from '@material-ui/core';

class CubeLengthSlider extends React.Component {
    constructor(props) {
        super(props);

        this.handleCubeLengthChange = this.handleCubeLengthChange.bind(this);
    }

    handleCubeLengthChange(event, newValue) {
        this.props.onCubeLengthChange(newValue);
    }

    render() {
        return (
            <div>
                <Slider
                    defaultValue={50}
                    value={this.props.cubeLength || 50}
                    onChange={this.handleCubeLengthChange}
                    min={10}
                    max={100}
                    step={5}
                    aria-labelledby="cube-length-slider"
                    valueLabelDisplay="on"
                />
                <Typography id="cube-length-slider" gutterBottom>
                    Cube Length
                </Typography>
            </div>
        );
    }
}

export default CubeLengthSlider;
