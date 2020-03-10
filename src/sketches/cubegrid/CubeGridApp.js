import React from 'react';
import { Grid } from "@material-ui/core";
import SketchContainer from 'containers/SketchContainer';
import p5CubeGrid from "sketches/cubegrid/p5_cubegrid";
import CubeGridSidebar from './CubeGridSidebar';

class CubeGridApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            frameRate: 0
        }

        this.handleFrameRateChange = this.handleFrameRateChange.bind(this);
        this.handleRowCountChange = this.handleRowCountChange.bind(this);
        this.handleColumnCountChange = this.handleColumnCountChange.bind(this);
        this.handleLayerCountChange = this.handleLayerCountChange.bind(this);
    }

    handleFrameRateChange(newFrameRateValue) {
        this.setState({
            frameRate: newFrameRateValue
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
                            rowCount={this.state.rowCount}
                            onRowCountChange={this.handleRowCountChange}
                            columnCount={this.state.columnCount}
                            onColumnCountChange={this.handleColumnCountChange}
                            layerCount={this.state.layerCount}
                            onLayerCountChange={this.handleLayerCountChange}

                            isControlsPanelOpen={this.props.isControlsPanelOpen}
                            />
                    </Grid>
                    <Grid container item xs={this.props.isControlsPanelOpen ? 9 : 12}>
                        <SketchContainer
                            sketch={p5CubeGrid}

                            onFrameRateChange={this.handleFrameRateChange}

                            rowCount={this.state.rowCount}
                            columnCount={this.state.columnCount}
                            layerCount={this.state.layerCount}
                            />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default CubeGridApp;