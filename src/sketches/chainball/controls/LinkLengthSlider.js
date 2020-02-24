import React from 'react';
import { Slider, Typography } from '@material-ui/core';

class LinkLengthSlider extends React.Component {
    constructor(props) {
        super(props);

        this.handleLinkLengthChange = this.handleLinkLengthChange.bind(this);
    }

    handleLinkLengthChange(event, newValue) {
        this.props.onLinkLengthChange(newValue);
    }

    render() {
        return (
            <div>
                <Slider
                    defaultValue={50}
                    value={this.props.linkLength}
                    onChange={this.handleLinkLengthChange}
                    min={0}
                    max={800}
                    step={10}
                    // getAriaValueText={() => `this.props.ballCount`}
                    aria-labelledby="link-length-slider"
                    valueLabelDisplay="on"
                />
                <Typography id="link-length-slider" gutterBottom>
                    Link Length
                </Typography>
            </div>
        );
    }
}

export default LinkLengthSlider;
