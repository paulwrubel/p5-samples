import React from 'react';
import { Slider, Typography } from '@material-ui/core';

class LayerCountSlider extends React.Component {
    constructor(props) {
        super(props);

        this.handleLayerCountChange = this.handleLayerCountChange.bind(this);
    }

    handleLayerCountChange(event, newValue) {
        this.props.onLayerCountChange(newValue);
    }

    render() {
        return (
            <div>
                <Slider
                    defaultValue={6}
                    value={this.props.layerCount || 6}
                    onChange={this.handleLayerCountChange}
                    min={1}
                    max={100}
                    step={1}
                    aria-labelledby="layer-count-slider"
                    valueLabelDisplay="on"
                />
                <Typography id="layer-count-slider" gutterBottom>
                    Layer Count
                </Typography>
            </div>
        );
    }
}

export default LayerCountSlider;
