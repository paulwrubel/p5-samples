import React from 'react';
// import './SketchSelector.css';
import Grid from '@material-ui/core/Grid';


class SketchSelector extends React.Component {
    render() {
        return (
            <div className="SketchSelector">
                <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="space-evenly"
                    alignItems="center">
                    <Grid item xs>
                        <p>DROPDOWN</p>
                    </Grid>
                    <Grid item xs>
                        <p>SOME TEXT</p>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default SketchSelector;