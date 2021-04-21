import React from 'react';
import { Grid } from "@material-ui/core";
import SketchContainer from './containers/SketchContainer';
import p5CubeGrid from "./sketches/cubegrid/p5_cubegrid";
import CubeGridSidebar from './CubeGridSidebar';

class CubeGridApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            frameRate: 0
        }

        this.handleFrameRateChange = this.handleFrameRateChange.bind(this);
        this.handleCubeCountChange = this.handleCubeCountChange.bind(this);
        this.handleRowCountChange = this.handleRowCountChange.bind(this);
        this.handleColumnCountChange = this.handleColumnCountChange.bind(this);
        this.handleLayerCountChange = this.handleLayerCountChange.bind(this);
        this.handleCubeDistanceChange = this.handleCubeDistanceChange.bind(this);
        this.handleCubeLengthChange = this.handleCubeLengthChange.bind(this);
        this.handleRotationSpeedXChange = this.handleRotationSpeedXChange.bind(this);
        this.handleRotationSpeedYChange = this.handleRotationSpeedYChange.bind(this);
        this.handleRotationSpeedZChange = this.handleRotationSpeedZChange.bind(this);
    }

    handleFrameRateChange(newFrameRateValue) {
        this.setState({
            frameRate: newFrameRateValue
        });
    }

    handleCubeCountChange(newCubeCountValue) {
        this.setState({
            cubeCount: newCubeCountValue
        });
    }

    handleRowCountChange(newRowCountValue) {
        this.setState({
            rowCount: newRowCountValue
        });
    }

    handleColumnCountChange(newColumnCountValue) {
        this.setState({
            columnCount: newColumnCountValue
        });
    }

    handleLayerCountChange(newLayerCountValue) {
        this.setState({
            layerCount: newLayerCountValue
        });
    }

    handleCubeDistanceChange(newCubeDistanceValue) {
        this.setState({
            cubeDistance: newCubeDistanceValue
        });
    }

    handleCubeLengthChange(newCubeLengthValue) {
        this.setState({
            cubeLength: newCubeLengthValue
        });
    }

    handleRotationSpeedXChange(newValue) {
        this.setState({
            rotationSpeedX: newValue
        });
    }

    handleRotationSpeedYChange(newValue) {
        this.setState({
            rotationSpeedY: newValue
        });
    }

    handleRotationSpeedZChange(newValue) {
        this.setState({
            rotationSpeedZ: newValue
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
                        <CubeGridSidebar
                            frameRate={this.state.frameRate}
                            cubeCount={this.state.cubeCount}

                            rowCount={this.state.rowCount}
                            onRowCountChange={this.handleRowCountChange}
                            columnCount={this.state.columnCount}
                            onColumnCountChange={this.handleColumnCountChange}
                            layerCount={this.state.layerCount}
                            onLayerCountChange={this.handleLayerCountChange}
                            cubeDistance={this.state.cubeDistance}
                            onCubeDistanceChange={this.handleCubeDistanceChange}
                            cubeLength={this.state.cubeLength}
                            onCubeLengthChange={this.handleCubeLengthChange}
                            rotationSpeedX={this.state.rotationSpeedX}
                            onRotationSpeedXChange={this.handleRotationSpeedXChange}
                            rotationSpeedY={this.state.rotationSpeedY}
                            onRotationSpeedYChange={this.handleRotationSpeedYChange}
                            rotationSpeedZ={this.state.rotationSpeedZ}
                            onRotationSpeedZChange={this.handleRotationSpeedZChange}

                            isControlsPanelOpen={this.props.isControlsPanelOpen}
                            />
                    </Grid>
                    <Grid container item xs={this.props.isControlsPanelOpen ? 9 : 12}>
                        <SketchContainer
                            sketch={p5CubeGrid}

                            onFrameRateChange={this.handleFrameRateChange}
                            onCubeCountChange={this.handleCubeCountChange}

                            rowCount={this.state.rowCount}
                            columnCount={this.state.columnCount}
                            layerCount={this.state.layerCount}
                            cubeDistance={this.state.cubeDistance}
                            cubeLength={this.state.cubeLength}
                            rotationSpeedX={this.state.rotationSpeedX}
                            rotationSpeedY={this.state.rotationSpeedY}
                            rotationSpeedZ={this.state.rotationSpeedZ}
                            />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default CubeGridApp;