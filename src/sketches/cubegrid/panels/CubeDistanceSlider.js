import React from 'react';
import { Slider, Typography } from '@material-ui/core';

class CubeDistanceSlider extends React.Component {
    constructor(props) {
        super(props);

        this.handleCubeDistanceChange = this.handleCubeDistanceChange.bind(this);
    }

    handleCubeDistanceChange(event, newValue) {
        this.props.onCubeDistanceChange(newValue);
    }

    render() {
        return (
            <div>
                <Slider
                    defaultValue={150}
                    value={this.props.cubeDistance || 150}
                    onChange={this.handleCubeDistanceChange}
                    min={50}
                    max={200}
                    step={10}
                    aria-labelledby="cube-distance-slider"
                    valueLabelDisplay="on"
                />
                <Typography id="cube-distance-slider" gutterBottom>
                    Cube Distance
                </Typography>
            </div>
        );
    }
}

export default CubeDistanceSlider;
