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

const styles = theme => ({
    // root: {
    //     padding: "0",
    //     margin: "0"
    // },
    // radioControl: {
    //     padding: "15px"
    // },
    // sliderControl: {
    //     padding: "45px 25px 5px 25px"
    // }
    // root: {
    //     // boxSizing: "border-box",
    //     padding: "20px",
    //     // margin: "0",
    //     width: "100%",
    //     // minHeight: "100%"
    // }
});

class ChainballSidebar extends React.Component {
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
            </div>
            // <div className="Sidebar">
            //     <Grid
            //         container
            //         spacing={4}
            //         direction="column"
            //         justify="space-evenly"
            //         alignItems="stretch"
            //         wrap="nowrap">
            //         {/* <Grid item xs>
            //             <SketchSelector />
            //         </Grid> */}
            //         <Grid item xs>
            //             <SketchProperties
            //                 mode={this.props.mode}
            //                 onModeChange={this.props.onModeChange}
            //                 ballCount={this.props.ballCount}
            //                 onBallCountChange={this.props.onBallCountChange}
            //                 linkLength={this.props.linkLength}
            //                 onLinkLengthChange={this.props.onLinkLengthChange}
            //                 linkTension={this.props.linkTension}
            //                 onLinkTensionChange={this.props.onLinkTensionChange}
            //                 linkDamping={this.props.linkDamping}
            //                 onLinkDampingChange={this.props.onLinkDampingChange} />
            //         </Grid>
            //         {/* <Grid item>
            //             <p>---DEBUG INFO---</p>
            //             <p>FPS: {this.props.frameRate}</p>
            //             <p>MODE: {this.props.mode}</p>
            //             <p>BALLS: {this.props.ballCount}</p>
            //             <p>LENGTH: {this.props.linkLength}</p>
            //             <p>TENSION: {this.props.linkTension}</p>
            //             <p>DAMPING: {this.props.linkDamping}</p>

            //         </Grid> */}
            //     </Grid>
            // </div>
        );
    }
}

export default ChainballSidebar;