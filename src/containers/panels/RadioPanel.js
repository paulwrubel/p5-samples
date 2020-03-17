import React from 'react';
import { Paper, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@material-ui/core';
import "containers/Panels.css"

class RadioPanel extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onChange(event.target.value);
    }

    render() {
        return (
            <div>
                <Paper elevation={2}
                    className="PaperRadioButtons">
                    <FormControl>
                        <FormLabel>{this.props.label}</FormLabel>
                        <RadioGroup defaultValue={this.props.defaultValue} aria-label={this.props.panelKey} name={this.props.panelKey} value={this.props.value} onChange={this.handleChange}>
                            {this.props.buttons.map(button => (
                                <FormControlLabel key={button.key} value={button.value} control={<Radio />} label={button.label} />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Paper>
            </div>
        );
    }
}

export default RadioPanel;
