import React from 'react';
import { Slider, Typography } from '@material-ui/core';

class RotationSpeedYSlider extends React.Component {
    constructor(props) {
        super(props);

        this.handleRotationSpeedChange = this.handleRotationSpeedChange.bind(this);
    }

    handleRotationSpeedChange(event, newValue) {
        this.props.onRotationSpeedChange(newValue);
    }

    render() {
        return (
            <div>
                <Slider
                    defaultValue={0.0}
                    value={this.props.rotationSpeedY}
                    onChange={this.handleRotationSpeedChange}
                    min={0.0}
                    max={5.0}
                    step={0.25}
                    aria-labelledby="rotation-speed-y-slider"
                    valueLabelDisplay="on"
                />
                <Typography id="rotation-speed-y-slider" gutterBottom>
                    Rotation Speed Y
                </Typography>
            </div>
        );
    }
}

export default RotationSpeedYSlider;
