import React from 'react';
import { Grid, Paper, Drawer } from '@material-ui/core';
import "containers/Sidebar.css";

import BallCountSlider from "sketches/chainball/controls/BallCountSlider";
import LinkDampingSlider from "sketches/chainball/controls/LinkDampingSlider";
import LinkLengthSlider from "sketches/chainball/controls/LinkLengthSlider";
import LinkTensionSlider from "sketches/chainball/controls/LinkTensionSlider";
import ModeRadioButtons from "sketches/chainball/controls/ModeRadioButtons";

class ChainballSidebar extends React.Component {
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

                    <Grid item xs>
                        <Paper elevation={2}
                            className="PaperRadioControl">
                            <ModeRadioButtons
                                mode={this.props.mode}
                                onModeChange={this.props.onModeChange} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper elevation={2}
                            className="PaperSliderControl">
                            <BallCountSlider
                                ballCount={this.props.ballCount}
                                onBallCountChange={this.props.onBallCountChange} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper elevation={2}
                            className="PaperSliderControl">
                            <LinkLengthSlider
                                linkLength={this.props.linkLength}
                                onLinkLengthChange={this.props.onLinkLengthChange} />
                        </Paper>
                    </Grid>
                    {this.props.mode === "dynamic" &&
                        <Grid item xs={12}>
                            <Paper elevation={2}
                                className="PaperSliderControl">
                                <LinkTensionSlider
                                    linkTension={this.props.linkTension}
                                    onLinkTensionChange={this.props.onLinkTensionChange} />
                            </Paper>
                        </Grid>
                    }{this.props.mode === "dynamic" &&
                        <Grid item xs={12}>
                            <Paper elevation={2}
                                className="PaperSliderControl">
                                <LinkDampingSlider
                                    linkDamping={this.props.linkDamping}
                                    onLinkDampingChange={this.props.onLinkDampingChange} />
                            </Paper>
                        </Grid>
                    }
                </Grid>
                </Drawer>
            </div>
        );
    }
}

export default ChainballSidebar;