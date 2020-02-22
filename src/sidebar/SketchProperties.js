import React from 'react';
import Grid from '@material-ui/core/Grid';
import ModeRadioButtons from './chainball/ModeRadioButtons';
import BallCountSlider from './chainball/BallCountSlider';
import LinkLengthSlider from './chainball/LinkLengthSlider';
import LinkTensionSlider from './chainball/LinkTensionSlider';
import LinkDampingSlider from './chainball/LinkDampingSlider';

class SketchProperties extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <div className="SketchProperties">
                <Grid
                    container
                    spacing={5}
                    direction="column"
                    justify="flex-start"
                    alignItems="stretch">

                    <Grid item xs>
                        <ModeRadioButtons
                            mode={this.props.mode}
                            onModeChange={this.props.onModeChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <BallCountSlider
                            ballCount={this.props.ballCount}
                            onBallCountChange={this.props.onBallCountChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <LinkLengthSlider
                            linkLength={this.props.linkLength}
                            onLinkLengthChange={this.props.onLinkLengthChange} />
                    </Grid>
                    {this.props.mode === "dynamic" &&
                        <Grid item xs={12}>
                            <LinkTensionSlider
                                linkTension={this.props.linkTension}
                                onLinkTensionChange={this.props.onLinkTensionChange} />
                        </Grid>
                    }{this.props.mode === "dynamic" &&
                        <Grid item xs={12}>
                            <LinkDampingSlider
                                linkDamping={this.props.linkDamping}
                                onLinkDampingChange={this.props.onLinkDampingChange} />
                        </Grid>
                    }
                </Grid>
            </div>
        );
    }
}

export default SketchProperties;