import React from 'react';
import SketchSelector from './SketchSelector'
import './Sidebar.css';
import Grid from '@material-ui/core/Grid';


class Sidebar extends React.Component {
    render() {
        return (
            <div className="Sidebar">
                <Grid
                    container
                    spacing={4}
                    direction="column"
                    justify="space-evenly"
                    alignItems="center"
                    wrap="nowrap">
                    <Grid item>
                        <SketchSelector/>
                    </Grid>
                    <Grid item>
                        <p>SIDEBAR2</p>
                    </Grid>
                    <Grid item>
                        <p>SIDEBAR3</p>
                    </Grid>
                    <Grid item>
                        <p>SIDEBAR4</p>
                    </Grid>
                    <Grid item>
                        <p>SIDEBAR5</p>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Sidebar;