import React from 'react';
import { Slider, Typography } from '@material-ui/core';

class RotationSpeedZSlider extends React.Component {
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
                    defaultValue={0.5}
                    value={this.props.rotationSpeedZ}
                    onChange={this.handleRotationSpeedChange}
                    min={0.0}
                    max={5.0}
                    step={0.25}
                    aria-labelledby="rotation-speed-z-slider"
                    valueLabelDisplay="on"
                />
                <Typography id="rotation-speed-z-slider" gutterBottom>
                    Rotation Speed Z
                </Typography>
            </div>
        );
    }
}

export default RotationSpeedZSlider;
