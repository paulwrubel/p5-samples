import React from 'react';
import { Slider, Typography } from '@material-ui/core';

class ColumnCountSlider extends React.Component {
    constructor(props) {
        super(props);

        this.handleColumnCountChange = this.handleColumnCountChange.bind(this);
    }

    handleColumnCountChange(event, newValue) {
        this.props.onColumnCountChange(newValue);
    }

    render() {
        return (
            <div>
                <Slider
                    defaultValue={6}
                    value={this.props.columnCount || 6}
                    onChange={this.handleColumnCountChange}
                    min={1}
                    max={100}
                    step={1}
                    aria-labelledby="column-count-slider"
                    valueLabelDisplay="on"
                />
                <Typography id="column-count-slider" gutterBottom>
                    Column Count
                </Typography>
            </div>
        );
    }
}

export default ColumnCountSlider;
