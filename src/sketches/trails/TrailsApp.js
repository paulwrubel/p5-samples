import React from 'react';
import { Grid } from "@material-ui/core";
import SketchContainer from 'containers/SketchContainer';
import p5Trails from "sketches/trails/p5_trailart";
import TrailsSidebar from './TrailsSidebar';

class TrailsApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // ballCount: 5,
            // linkLength: 50,
            // linkTension: 0.1,
            // linkDamping: 0.4,
            // mode: "static",
            frameRate: 0
        }

        // this.handleModeChange = this.handleModeChange.bind(this);
        // this.handleBallCountChange = this.handleBallCountChange.bind(this);
        // this.handleLinkLengthChange = this.handleLinkLengthChange.bind(this);
        // this.handleLinkTensionChange = this.handleLinkTensionChange.bind(this);
        // this.handleLinkDampingChange = this.handleLinkDampingChange.bind(this);
        this.handleFrameRateChange = this.handleFrameRateChange.bind(this);
        this.handleActiveTrailCountChange = this.handleActiveTrailCountChange.bind(this);
        this.handleModeChange = this.handleModeChange.bind(this);
        this.handleClearButtonPress = this.handleClearButtonPress.bind(this);
        this.setClearButtonPressFunc = this.setClearButtonPressFunc.bind(this);
    }

    // handleModeChange(newValue) {
    //     this.setState({
    //         mode: newValue
    //     });
    // }

    // handleBallCountChange(newValue) {
    //     this.setState({
    //         ballCount: newValue
    //     });
    // }

    // handleLinkLengthChange(newValue) {
    //     this.setState({
    //         linkLength: newValue
    //     });
    // }

    // handleLinkTensionChange(newValue) {
    //     this.setState({
    //         linkTension: newValue
    //     });
    // }

    // handleLinkDampingChange(newValue) {
    //     this.setState({
    //         linkDamping: newValue
    //     });
    // }

    handleFrameRateChange(newValue) {
        this.setState({
            frameRate: newValue
        });
    }

    handleActiveTrailCountChange(newValue) {
        this.setState({
            activeTrailCount: newValue
        });
    }

    handleModeChange(newValue) {
        this.setState({
            mode: newValue
        });
    }

    handleClearButtonPress() {
        if (typeof this.state.clearButtonPressFunc !== "undefined") {
            this.state.clearButtonPressFunc();
        }
    }

    setClearButtonPressFunc(newValue) {
        this.setState({
            clearButtonPressFunc: newValue
        });
    }

    render() {
        return (
            <div className="App">
                <Grid
                    container
                    spacing={0}
                    direction='row'
                    // justify='flex-start'
                    alignItems='stretch'
                    wrap='nowrap'>
                    <Grid container item xs>
                        <TrailsSidebar
                            mode={this.state.mode}
                            onModeChange={this.handleModeChange}
                            // ballCount={this.state.ballCount}
                            // onBallCountChange={this.handleBallCountChange}
                            // linkLength={this.state.linkLength}
                            // onLinkLengthChange={this.handleLinkLengthChange}
                            // linkTension={this.state.linkTension}
                            // onLinkTensionChange={this.handleLinkTensionChange}
                            // linkDamping={this.state.linkDamping}
                            // onLinkDampingChange={this.handleLinkDampingChange}

                            frameRate={this.state.frameRate} 
                            activeTrailCount={this.state.activeTrailCount}
                            onClearButtonPress={this.handleClearButtonPress}

                            isControlsPanelOpen={this.props.isControlsPanelOpen}
                            />
                    </Grid>
                    <Grid container item xs={this.props.isControlsPanelOpen ? 9 : 12}>
                        <SketchContainer
                            sketch={p5Trails}

                            mode={this.state.mode}

                            setClearScreenCallback={this.setClearButtonPressFunc}
                            onFrameRateChange={this.handleFrameRateChange}
                            onActiveTrailCountChange={this.handleActiveTrailCountChange}
                            />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default TrailsApp;