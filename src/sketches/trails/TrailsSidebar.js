import React from 'react';
import { Paper, Grid, Drawer } from '@material-ui/core';
import "containers/Sidebar.css"
import InfoPanel from 'containers/panels/InfoPanel';
import ModeRadioButtons from './panels/ModeRadioButtons';
import ClearButton from './panels/ClearButton';

class TrailsSidebar extends React.Component {
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
                                            label: "FPS",
                                            data: this.props.frameRate
                                        },
                                        {
                                            label: "Active Trails",
                                            data: this.props.activeTrailCount
                                        }
                                    ]} />
                            </Paper>
                        </Grid>
                        <Grid item xs>
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
                        </Grid>
                    </Grid>
                </Drawer>
            </div>
        );
    }
}

export default TrailsSidebar;