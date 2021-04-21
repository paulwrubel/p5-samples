import React from 'react';
import { Paper, Typography, Grid, Drawer } from '@material-ui/core';
import "./containers/Sidebar.css"

class OrbiterSidebar extends React.Component {
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
                                    Planet Speed: {this.props.planetSpeed}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="textSecondary">
                                    Moon Speed: {this.props.moonSpeed}
                                </Typography>
                            </Paper>
                        </Grid>

                        {/* <Grid item xs>
                        <Paper elevation={2}
                            className="PaperRadioControl">
                            <ModeRadioButtons
                                mode={this.props.mode}
                                onModeChange={this.props.onModeChange} />
                        </Paper>
                    </Grid>
                    <Grid item xs>
                        <Paper elevation={2}
                            className="PaperSliderControl">
                            <BallCountSlider
                                ballCount={this.props.ballCount}
                                onBallCountChange={this.props.onBallCountChange} />
                        </Paper>
                    </Grid> */}

                    </Grid>
                </Drawer>
            </div>
        );
    }
}

export default OrbiterSidebar;