import React from 'react';
import { Slider, Typography } from '@material-ui/core';

class LinkTensionSlider extends React.Component {
    constructor(props) {
        super(props);

        this.handleLinkTensionChange = this.handleLinkTensionChange.bind(this);
    }

    handleLinkTensionChange(event, newValue) {
        this.props.onLinkTensionChange(newValue);
    }

    render() {
        return (
            <div>
                <Slider
                    defaultValue={50}
                    value={this.props.linkTension}
                    onChange={this.handleLinkTensionChange}
                    min={0.0}
                    max={1.0}
                    step={0.02}
                    // getAriaValueText={() => `this.props.ballCount`}
                    aria-labelledby="link-tension-slider"
                    valueLabelDisplay="on"
                />
                <Typography id="link-tension-slider" gutterBottom>
                    Link Tension
                </Typography>
            </div>
        );
    }
}

export default LinkTensionSlider;
