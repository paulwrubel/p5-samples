import React from 'react';
import { Slider, Typography } from '@material-ui/core';

class LinkDampingSlider extends React.Component {
    constructor(props) {
        super(props);

        this.handleLinkDampingChange = this.handleLinkDampingChange.bind(this);
    }

    handleLinkDampingChange(event, newValue) {
        this.props.onLinkDampingChange(newValue);
    }

    render() {
        return (
            <div>
                <Slider
                    defaultValue={50}
                    value={this.props.linkDamping}
                    onChange={this.handleLinkDampingChange}
                    min={0.0}
                    max={1.0}
                    step={0.05}
                    // getAriaValueText={() => `this.props.ballCount`}
                    aria-labelledby="link-damping-slider"
                    valueLabelDisplay="on"
                />
                <Typography id="link-damping-slider" gutterBottom>
                    Link Damping
                </Typography>
            </div>
        );
    }
}

export default LinkDampingSlider;
