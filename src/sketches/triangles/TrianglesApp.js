import React from 'react';
import { Grid } from "@material-ui/core";
import SketchContainer from 'containers/SketchContainer';
import p5Triangles from "sketches/triangles/p5_triangles";
import TrianglesSidebar from './TrianglesSidebar';

class TrianglesApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            frameRate: 0,
            generationMode: "discrete",
            gravityMode: "off",
            isBorderEnabled: false,
            isAutoFireEnabled: false,
            information: new Map(),
        }
        
        this.handleFrameRateChange = this.handleFrameRateChange.bind(this);
        this.handleInformationChange = this.handleInformationChange.bind(this);
        this.handleGenerationModeChange = this.handleGenerationModeChange.bind(this);
        this.handleGravityModeChange = this.handleGravityModeChange.bind(this);
        this.handleBorderChange = this.handleBorderChange.bind(this);
        this.handleAutoFireChange = this.handleAutoFireChange.bind(this);
    }

    handleFrameRateChange(newValue) {
        this.setState({
            frameRate: newValue
        });
    }

    handleInformationChange(newValue) {
        this.setState({
            information: newValue
        });
    }

    handleGenerationModeChange(newValue) {
        this.setState({
            generationMode: newValue
        });
    }

    handleGravityModeChange(newValue) {
        this.setState({
            gravityMode: newValue
        });
    }

    handleBorderChange(newValue) {
        this.setState({
            isBorderEnabled: newValue
        });
    }

    handleAutoFireChange(newValue) {
        this.setState({
            isAutoFireEnabled: newValue
        });
    }

    // handleClearButtonPress() {
    //     if (typeof this.state.clearButtonPressFunc !== "undefined") {
    //         this.state.clearButtonPressFunc();
    //     }
    // }

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
                        <TrianglesSidebar
                            generationMode={this.state.generationMode}
                            onGenerationModeChange={this.handleGenerationModeChange}
                            gravityMode={this.state.gravityMode}
                            onGravityModeChange={this.handleGravityModeChange}
                            isBorderEnabled={this.state.isBorderEnabled}
                            onBorderChange={this.handleBorderChange}
                            isAutoFireEnabled={this.state.isAutoFireEnabled}
                            onAutoFireChange={this.handleAutoFireChange}

                            frameRate={this.state.frameRate}
                            information={this.state.information}
                            
                            isControlsPanelOpen={this.props.isControlsPanelOpen}
                            />
                    </Grid>
                    <Grid container item xs={this.props.isControlsPanelOpen ? 9 : 12}>
                        <SketchContainer
                            sketch={p5Triangles}

                            generationMode={this.state.generationMode}
                            gravityMode={this.state.gravityMode}
                            isBorderEnabled={this.state.isBorderEnabled}
                            isAutoFireEnabled={this.state.isAutoFireEnabled}

                            onFrameRateChange={this.handleFrameRateChange}
                            onInformationChange={this.handleInformationChange}
                            />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default TrianglesApp;