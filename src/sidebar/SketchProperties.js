import React from 'react';
import Grid from '@material-ui/core/Grid';
import ModeRadioButtons from 'sidebar/chainball/ModeRadioButtons';
import BallCountSlider from 'sidebar/chainball/BallCountSlider';
import LinkLengthSlider from 'sidebar/chainball/LinkLengthSlider';
import LinkTensionSlider from 'sidebar/chainball/LinkTensionSlider';
import LinkDampingSlider from 'sidebar/chainball/LinkDampingSlider';
import { Paper } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles'

const styles = theme => ({
    root: {
        padding: "0",
        margin: "0"
    },
    radioControl: {
        padding: "15px"
    },
    sliderControl: {
        padding: "45px 25px 5px 25px"
    }
});

class SketchProperties extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <div className={`${this.props.classes.root} SketchProperties`}>
                <Grid
                    container
                    spacing={2}
                    direction="column"
                    justify="flex-start"
                    alignItems="stretch">

                    <Grid item xs>
                        <Paper elevation={2}
                            className={this.props.classes.radioControl}>
                            <ModeRadioButtons
                                mode={this.props.mode}
                                onModeChange={this.props.onModeChange} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper elevation={2}
                            className={this.props.classes.sliderControl}>
                            <BallCountSlider
                                ballCount={this.props.ballCount}
                                onBallCountChange={this.props.onBallCountChange} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper elevation={2}
                            className={this.props.classes.sliderControl}>
                            <LinkLengthSlider
                                linkLength={this.props.linkLength}
                                onLinkLengthChange={this.props.onLinkLengthChange} />
                        </Paper>
                    </Grid>
                    {this.props.mode === "dynamic" &&
                        <Grid item xs={12}>
                            <Paper elevation={2}
                                className={this.props.classes.sliderControl}>
                                <LinkTensionSlider
                                    linkTension={this.props.linkTension}
                                    onLinkTensionChange={this.props.onLinkTensionChange} />
                            </Paper>
                        </Grid>
                    }{this.props.mode === "dynamic" &&
                        <Grid item xs={12}>
                            <Paper elevation={2}
                                className={this.props.classes.sliderControl}>
                                <LinkDampingSlider
                                    linkDamping={this.props.linkDamping}
                                    onLinkDampingChange={this.props.onLinkDampingChange} />
                            </Paper>
                        </Grid>
                    }
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(SketchProperties);