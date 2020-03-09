import React from 'react';
import { Slider, Typography } from '@material-ui/core';

class BallCountSlider extends React.Component {
    constructor(props) {
        super(props);

        this.handleBallCountChange = this.handleBallCountChange.bind(this);
    }

    handleBallCountChange(event, newValue) {
        this.props.onBallCountChange(newValue);
    }

    render() {
        return (
            <div>
                <Slider
                    defaultValue={5}
                    value={this.props.ballCount || 5}
                    onChange={this.handleBallCountChange}
                    min={5}
                    max={500}
                    step={5}
                    aria-labelledby="ball-count-slider"
                    valueLabelDisplay="on"
                />
                <Typography id="ball-count-slider" gutterBottom>
                    Ball Count
                </Typography>
            </div>
        );
    }
}

export default BallCountSlider;
