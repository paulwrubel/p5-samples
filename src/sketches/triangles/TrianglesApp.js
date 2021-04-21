import React from 'react';
import { Grid } from "@material-ui/core";
import SketchContainer from './containers/SketchContainer';
import p5Triangles from "./sketches/triangles/p5_triangles";
import TrianglesSidebar from './TrianglesSidebar';

class TrianglesApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            frameRate: 0,
            generationMode: "discrete",
            gravityMode: "off",
            aimMode: "mouse",
            placementMode: "triangle",
            isBorderEnabled: false,
            isAutoFireEnabled: false,
            information: new Map(),
        }
        
        this.handleFrameRateChange = this.handleFrameRateChange.bind(this);
        this.handleInformationChange = this.handleInformationChange.bind(this);
        this.handleGenerationModeChange = this.handleGenerationModeChange.bind(this);
        this.handleGravityModeChange = this.handleGravityModeChange.bind(this);
        this.handleAimModeChange = this.handleAimModeChange.bind(this);
        this.handlePlacementModeChange = this.handlePlacementModeChange.bind(this);
        this.handleBorderChange = this.handleBorderChange.bind(this);
        this.handleAutoFireChange = this.handleAutoFireChange.bind(this);
        
        this.handleClearTrianglesButtonClick = this.handleClearTrianglesButtonClick.bind(this);
        this.setClearTrianglesButtonClickFunc = this.setClearTrianglesButtonClickFunc.bind(this);
        this.handleClearBulletsButtonClick = this.handleClearBulletsButtonClick.bind(this);
        this.setClearBulletsButtonClickFunc = this.setClearBulletsButtonClickFunc.bind(this);
        this.handleClearGravityPointsButtonClick = this.handleClearGravityPointsButtonClick.bind(this);
        this.setClearGravityPointsButtonClickFunc = this.setClearGravityPointsButtonClickFunc.bind(this);
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

    handlePlacementModeChange(newValue) {
        this.setState({
            placementMode: newValue
        });
    }

    handleAimModeChange(newValue) {
        this.setState({
            aimMode: newValue
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

    // Buttons

    handleClearTrianglesButtonClick() {
        if (typeof this.state.clearTrianglesButtonClickFunc !== "undefined") {
            this.state.clearTrianglesButtonClickFunc();
        }
    }

    setClearTrianglesButtonClickFunc(newValue) {
        this.setState({
            clearTrianglesButtonClickFunc: newValue
        });
    }

    handleClearBulletsButtonClick() {
        if (typeof this.state.clearBulletsButtonClickFunc !== "undefined") {
            this.state.clearBulletsButtonClickFunc();
        }
    }

    setClearBulletsButtonClickFunc(newValue) {
        this.setState({
            clearBulletsButtonClickFunc: newValue
        });
    }

    handleClearGravityPointsButtonClick() {
        if (typeof this.state.clearGravityPointsButtonClickFunc !== "undefined") {
            this.state.clearGravityPointsButtonClickFunc();
        }
    }

    setClearGravityPointsButtonClickFunc(newValue) {
        this.setState({
            clearGravityPointsButtonClickFunc: newValue
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
                            aimMode={this.state.aimMode}
                            onAimModeChange={this.handleAimModeChange}
                            placementMode={this.state.placementMode}
                            onPlacementModeChange={this.handlePlacementModeChange}
                            isBorderEnabled={this.state.isBorderEnabled}
                            onBorderChange={this.handleBorderChange}
                            isAutoFireEnabled={this.state.isAutoFireEnabled}
                            onAutoFireChange={this.handleAutoFireChange}

                            onClearTrianglesButtonClick={this.state.clearTrianglesButtonClickFunc}
                            onClearBulletsButtonClick={this.state.clearBulletsButtonClickFunc}
                            onClearGravityPointsButtonClick={this.state.clearGravityPointsButtonClickFunc}

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
                            aimMode={this.state.aimMode}
                            placementMode={this.state.placementMode}
                            isBorderEnabled={this.state.isBorderEnabled}
                            isAutoFireEnabled={this.state.isAutoFireEnabled}

                            onFrameRateChange={this.handleFrameRateChange}
                            onInformationChange={this.handleInformationChange}

                            setClearTrianglesCallback={this.setClearTrianglesButtonClickFunc}
                            setClearBulletsCallback={this.setClearBulletsButtonClickFunc}
                            setClearGravityPointsCallback={this.setClearGravityPointsButtonClickFunc}
                            />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default TrianglesApp;