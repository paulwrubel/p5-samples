import React from 'react';
import { Slider, Typography } from '@material-ui/core';

class RowCountSlider extends React.Component {
    constructor(props) {
        super(props);

        this.handleRowCountChange = this.handleRowCountChange.bind(this);
    }

    handleRowCountChange(event, newValue) {
        this.props.onRowCountChange(newValue);
    }

    render() {
        return (
            <div>
                <Slider
                    defaultValue={6}
                    value={this.props.rowCount || 6}
                    onChange={this.handleRowCountChange}
                    min={1}
                    max={100}
                    step={1}
                    aria-labelledby="row-count-slider"
                    valueLabelDisplay="on"
                />
                <Typography id="row-count-slider" gutterBottom>
                    Row Count
                </Typography>
            </div>
        );
    }
}

export default RowCountSlider;
