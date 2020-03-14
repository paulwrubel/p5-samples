import React from 'react';
import { Paper, FormControlLabel, Switch, FormGroup } from '@material-ui/core';

class SwitchPanel extends React.Component {
    render() {
        return (
            <div>
                <Paper elevation={2}
                    className="PaperRadioButtons">
                    <FormGroup>
                        {this.props.switches.map(s => (
                        <FormControlLabel
                            key={s.key}
                            control={<Switch checked={s.value} onChange={event => {s.onChange(event.target.checked)}} />}
                            label={s.label}
                        />
                        ))}
                    </FormGroup>
                </Paper>
            </div>
        );
    }
}

export default SwitchPanel;
