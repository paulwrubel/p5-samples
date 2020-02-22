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

    getValueText(value) {
        return `${(value*100).toFixed(0)}%`;
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
                    getAriaValueText={this.getValueText}
                    valueLabelFormat={this.getValueText}
                    aria-labelledby="link-tension-slider"
                    valueLabelDisplay="on"
                    marks={false}
                />
                <Typography id="link-tension-slider" gutterBottom>
                    Link Tension
                </Typography>
            </div>
        );
    }
}

export default LinkTensionSlider;
