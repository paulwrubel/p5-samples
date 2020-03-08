import React from 'react';
import { Grid, Drawer } from '@material-ui/core';
import "containers/Sidebar.css"

class OrbiterSidebar extends React.Component {
    // constructor(props) {
    //     super(props);
    // }


    render() {
        return (
            <div className="Sidebar">
                <Drawer
                className="SidebarDrawer"
                variant="permanent">
                <Grid
                className="SidebarGrid"
                    container
                    spacing={2}
                    direction="column"
                    wrap="nowrap">

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