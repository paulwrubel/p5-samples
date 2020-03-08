import React from 'react';
// import SketchSelector from 'SketchSelector'
// import SketchProperties from 'sidebar/SketchProperties'
// import 'sidebar/Sidebar.css';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import "containers/Sidebar.css"

import BallCountSlider from "sketches/chainball/controls/BallCountSlider";
import LinkDampingSlider from "sketches/chainball/controls/LinkDampingSlider";
import LinkLengthSlider from "sketches/chainball/controls/LinkLengthSlider";
import LinkTensionSlider from "sketches/chainball/controls/LinkTensionSlider";
import ModeRadioButtons from "sketches/chainball/controls/ModeRadioButtons";

class OrbiterSidebar extends React.Component {
    // constructor(props) {
    //     super(props);
    // }


    render() {
        return (
            <div className="Sidebar">
                <Grid
                    container
                    spacing={2}
                    direction="column"
                    justify="flex-start"
                    alignItems="stretch">

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
                </Grid>
            </div>
        );
    }
}

export default OrbiterSidebar;