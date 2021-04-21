import React from 'react';
import { Paper, Typography, Grid, Drawer } from '@material-ui/core';
import "./containers/Sidebar.css"
import RowCountSlider from './panels/RowCountSlider';
import ColumnCountSlider from './panels/ColumnCountSlider';
import LayerCountSlider from './panels/LayerCountSlider';
import CubeDistanceSlider from './panels/CubeDistanceSlider';
import CubeLengthSlider from './panels/CubeLengthSlider';
import RotationSpeedXSlider from './panels/RotationSpeedXSlider';
import RotationSpeedYSlider from './panels/RotationSpeedYSlider';
import RotationSpeedZSlider from './panels/RotationSpeedZSlider';

// import BarHeightScalarSlider from "sketches/interactivehistogram/panels/BarHeightScalarSlider";

class CubeGridSidebar extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <div className="Sidebar">
                <Drawer
                    className="SidebarDrawer"
                    variant="persistent"
                    open={this.props.isControlsPanelOpen}>
                    <Grid
                        className="SidebarGrid"
                        container
                        spacing={2}
                        direction="column"
                        wrap="nowrap">
                        <Grid item xs>
                            <Paper elevation={2}
                                className="PaperInformation">
                                <Typography
                                    variant="body1"
                                    color="textSecondary">
                                    FPS: {this.props.frameRate}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="textSecondary">
                                    Cube Count: {this.props.cubeCount}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs>
                            <Paper elevation={2}
                                className="PaperSliderControl">
                                <RowCountSlider
                                    rowCount={this.props.rowCount}
                                    onRowCountChange={this.props.onRowCountChange} />
                            </Paper>
                        </Grid>
                        <Grid item xs>
                            <Paper elevation={2}
                                className="PaperSliderControl">
                                <ColumnCountSlider
                                    columnCount={this.props.columnCount}
                                    onColumnCountChange={this.props.onColumnCountChange} />
                            </Paper>
                        </Grid>
                        <Grid item xs>
                            <Paper elevation={2}
                                className="PaperSliderControl">
                                <LayerCountSlider
                                    layerCount={this.props.layerCount}
                                    onLayerCountChange={this.props.onLayerCountChange} />
                            </Paper>
                        </Grid>
                        <Grid item xs>
                            <Paper elevation={2}
                                className="PaperSliderControl">
                                <CubeDistanceSlider
                                    cubeDistance={this.props.cubeDistance}
                                    onCubeDistanceChange={this.props.onCubeDistanceChange} />
                            </Paper>
                        </Grid>
                        <Grid item xs>
                            <Paper elevation={2}
                                className="PaperSliderControl">
                                <CubeLengthSlider
                                    cubeLength={this.props.cubeLength}
                                    onCubeLengthChange={this.props.onCubeLengthChange} />
                            </Paper>
                        </Grid>
                        <Grid item xs>
                            <Paper elevation={2}
                                className="PaperSliderControl">
                                <RotationSpeedXSlider
                                    rotationSpeedX={this.props.rotationSpeedX}
                                    onRotationSpeedChange={this.props.onRotationSpeedXChange} />
                            </Paper>
                        </Grid>
                        <Grid item xs>
                            <Paper elevation={2}
                                className="PaperSliderControl">
                                <RotationSpeedYSlider
                                    rotationSpeedY={this.props.rotationSpeedY}
                                    onRotationSpeedChange={this.props.onRotationSpeedYChange} />
                            </Paper>
                        </Grid>
                        <Grid item xs>
                            <Paper elevation={2}
                                className="PaperSliderControl">
                                <RotationSpeedZSlider
                                    rotationSpeedZ={this.props.rotationSpeedZ}
                                    onRotationSpeedChange={this.props.onRotationSpeedZChange} />
                            </Paper>
                        </Grid>
                    </Grid>
                </Drawer>
            </div>
        );
    }
}

export default CubeGridSidebar;