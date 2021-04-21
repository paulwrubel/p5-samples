import React from 'react';
import { Grid } from "@material-ui/core";
import SketchContainer from 'containers/SketchContainer';
import p5Orbiter from "sketches/orbiter/p5_orbiter";
import OrbiterSidebar from './OrbiterSidebar';

class OrbiterApp extends React.Component {
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
        this.handlePlanetSpeedChange = this.handlePlanetSpeedChange.bind(this);
        this.handleMoonSpeedChange = this.handleMoonSpeedChange.bind(this);
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

    handleFrameRateChange(newFrameRateValue) {
        this.setState({
            frameRate: newFrameRateValue
        });
    }

    handlePlanetSpeedChange(newPlanetSpeedValue) {
        this.setState({
            planetSpeed: newPlanetSpeedValue
        });
    }

    handleMoonSpeedChange(newMoonSpeedValue) {
        this.setState({
            moonSpeed: newMoonSpeedValue
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
                        <OrbiterSidebar
                            // mode={this.state.mode}
                            // onModeChange={this.handleModeChange}
                            // ballCount={this.state.ballCount}
                            // onBallCountChange={this.handleBallCountChange}
                            // linkLength={this.state.linkLength}
                            // onLinkLengthChange={this.handleLinkLengthChange}
                            // linkTension={this.state.linkTension}
                            // onLinkTensionChange={this.handleLinkTensionChange}
                            // linkDamping={this.state.linkDamping}
                            // onLinkDampingChange={this.handleLinkDampingChange}

                            frameRate={this.state.frameRate} 
                            planetSpeed={this.state.planetSpeed} 
                            moonSpeed={this.state.moonSpeed} 

                            isControlsPanelOpen={this.props.isControlsPanelOpen}
                            />
                    </Grid>
                    <Grid container item xs={this.props.isControlsPanelOpen ? 9 : 12}>
                        <SketchContainer
                            sketch={p5Orbiter}

                            onFrameRateChange={this.handleFrameRateChange}
                            onPlanetSpeedChange={this.handlePlanetSpeedChange}
                            onMoonSpeedChange={this.handleMoonSpeedChange}
                            />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default OrbiterApp;