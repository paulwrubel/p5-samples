import React from 'react';
import { Paper, Typography, Grid, Drawer } from '@material-ui/core';
import "containers/Sidebar.css"

class InteractiveHistogramSidebar extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <div className="Sidebar">
                <Drawer
                    className="SidebarDrawer"
                    variant="persistent"
                    open={this.props.isControlsPanelOpen}>
                    <Grid
                        className="SidebarGrid"
                        container
                        spacing={2}
                        direction="column"
                        wrap="nowrap">
                        <Grid item xs>
                            <Paper elevation={2}
                                className="PaperInformation">
                                <Typography
                                    variant="body1"
                                    color="textSecondary">
                                    FPS: {this.props.frameRate}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="textSecondary">
                                    Bar Height Scalar: {this.props.barHeightScalar}
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Drawer>
            </div>
        );
    }
}

export default InteractiveHistogramSidebar;