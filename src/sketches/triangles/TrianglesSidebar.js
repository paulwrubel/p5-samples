import React from 'react';
import { Paper, Grid, Drawer } from '@material-ui/core';
import "containers/Sidebar.css"
import InfoPanel from 'containers/panels/InfoPanel';

class TrianglesSidebar extends React.Component {
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
                                <InfoPanel
                                    info={[
                                        {
                                            key: "fps",
                                            text: "FPS: " + this.props.frameRate
                                        },
                                    ]} />
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
                                className="PaperRadioControl">
                                <ClearButton
                                    onClick={this.props.onClearButtonPress} />
                            </Paper>
                        </Grid> */}
                    </Grid>
                </Drawer>
            </div>
        );
    }
}

export default TrianglesSidebar;