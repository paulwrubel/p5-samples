import React from 'react';
import { Paper, Typography, Grid, Drawer } from '@material-ui/core';
import "containers/Sidebar.css"

// import BarHeightScalarSlider from "sketches/interactivehistogram/panels/BarHeightScalarSlider";

class CubeGridSidebar extends React.Component {
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
                            </Paper>
                        </Grid>
                        <Grid item xs>
                            <Paper elevation={2}
                                className="PaperSliderControl">
                                {/* <BarHeightScalarSlider
                                    barHeightScalar={this.props.barHeightScalar}
                                    onBarHeightScalarChange={this.props.onBarHeightScalarChange} /> */}
                            </Paper>
                        </Grid>
                    </Grid>
                </Drawer>
            </div>
        );
    }
}

export default CubeGridSidebar;