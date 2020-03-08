import React from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@material-ui/core';

class ModeRadioButtons extends React.Component {
    constructor(props) {
        super(props);

        this.handleModeChange = this.handleModeChange.bind(this);
    }

    handleModeChange(event) {
        this.props.onModeChange(event.target.value);
    }

    render() {
        return (
            <div>
                <FormControl>
                    <FormLabel>Mode</FormLabel>
                    <RadioGroup defaultValue="static" aria-label="mode" name="mode" value={this.props.mode} onChange={this.handleModeChange}>
                        <FormControlLabel value="static" control={<Radio />} label="Static" />
                        <FormControlLabel value="dynamic" control={<Radio />} label="Dynamic" />
                    </RadioGroup>
                </FormControl>
            </div>
        );
    }
}

export default ModeRadioButtons;
