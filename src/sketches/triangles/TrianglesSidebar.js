import React from 'react';
import { Grid, Drawer } from '@material-ui/core';
import "containers/Sidebar.css"
import InfoPanel from 'containers/panels/InfoPanel';
import RadioPanel from 'containers/panels/RadioPanel';
import SwitchPanel from 'containers/panels/SwitchPanel';
import ButtonPanel from 'containers/panels/ButtonPanel';

class TrianglesSidebar extends React.Component {
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
                            {/* {console.log(this.props.information.entries())} */}
                            {/* {this.props.information.entries().foreach(e => console.log(e))} */}
                            <InfoPanel
                                info={Array.from(this.props.information, ([key, value]) => ({
                                    key: key,
                                    text: value,
                                }))}
                            // info={this.props.information.entries().map(entry => ({key: entry}))
                            //     [
                            //     {
                            //         key: "information",
                            //         text: "information: " + this.props.information.triangleCount
                            //     },
                            // ]
                            // } 
                            />
                        </Grid>
                        <Grid item xs>
                            <RadioPanel
                                panelKey="placement_mode"
                                label="Placement"
                                value={this.props.placementMode}
                                defaultValue="triangle"
                                onChange={this.props.onPlacementModeChange}
                                buttons={[
                                    {
                                        key: "triangles",
                                        label: "Triangles",
                                        value: "triangle"
                                    },
                                    {
                                        key: "aim_point",
                                        label: "Aim Point",
                                        value: "fixed_point"
                                    },
                                    {
                                        key: "gravity_points",
                                        label: "Gravity Points",
                                        value: "gravity_points"
                                    },
                                ]} />
                        </Grid>
                        <Grid item xs>
                            <RadioPanel
                                panelKey="generation_mode"
                                label="Generation"
                                value={this.props.generationMode}
                                defaultValue="discrete"
                                onChange={this.props.onGenerationModeChange}
                                buttons={[
                                    {
                                        key: "discrete",
                                        label: "Discrete",
                                        value: "discrete"
                                    },
                                    {
                                        key: "continuous",
                                        label: "Continuous",
                                        value: "continuous"
                                    },
                                ]} />
                        </Grid>
                        <Grid item xs>
                            <RadioPanel
                                panelKey="aim_mode"
                                label="Aim Point"
                                value={this.props.aimMode}
                                defaultValue="mouse"
                                onChange={this.props.onAimModeChange}
                                buttons={[
                                    {
                                        key: "mouse",
                                        label: "Mouse",
                                        value: "mouse"
                                    },
                                    {
                                        key: "fixed",
                                        label: "Fixed",
                                        value: "fixed"
                                    },
                                ]} />
                        </Grid>
                        <Grid item xs>
                            <RadioPanel
                                panelKey="gravity_mode"
                                label="Gravity"
                                value={this.props.gravityMode}
                                defaultValue="off"
                                onChange={this.props.onGravityModeChange}
                                buttons={[
                                    {
                                        key: "off",
                                        label: "Off",
                                        value: "off"
                                    },
                                    {
                                        key: "simple",
                                        label: "Simple",
                                        value: "simple"
                                    },
                                    {
                                        key: "true",
                                        label: "True",
                                        value: "true"
                                    },
                                    {
                                        key: "point",
                                        label: "Point",
                                        value: "point"
                                    },
                                    {
                                        key: "multi_point",
                                        label: "Multi-Point",
                                        value: "multi_point"
                                    },
                                ]} />
                        </Grid>
                        <Grid item xs>
                            <SwitchPanel
                                switches={((() => {
                                    let switches = [
                                        {
                                            key: "solid_border",
                                            label: "Border",
                                            onChange: this.props.onBorderChange,
                                            value: this.props.isBorderEnabled,
                                        },
                                        this.props.generationMode === "continuous" ? {
                                            key: "auto_fire",
                                            label: "Auto Fire",
                                            onChange: this.props.onAutoFireChange,
                                            value: this.props.isAutoFireEnabled,
                                        } : undefined,
                                    ];
                                    return switches.filter((e) => e !== undefined);
                                })())}
                            />
                        </Grid>
                        <Grid item xs>
                            <ButtonPanel
                                buttons={(() => {
                                    let buttons = [
                                        typeof this.props.onClearTrianglesButtonClick !== "undefined" ? {
                                            key: "clear_triangles",
                                            label: "Clear Triangles",
                                            onClick: this.props.onClearTrianglesButtonClick,
                                        } : undefined,
                                        typeof this.props.onClearBulletsButtonClick !== "undefined" ? {
                                            key: "clear_bullets",
                                            label: "Clear Bullets",
                                            onClick: this.props.onClearBulletsButtonClick,
                                        } : undefined,
                                        typeof this.props.onClearGravityPointsButtonClick !== "undefined" ? {
                                            key: "clear_gravity_points",
                                            label: "Clear Gravity Points",
                                            onClick: this.props.onClearGravityPointsButtonClick,
                                        } : undefined,
                                    ];
                                    return buttons.filter((e) => e !== undefined);
                                })()}
                            />
                        </Grid>
                        {/* <Grid item xs>
                            <Paper elevation={2}
                                className="PaperRadioControl">
                                <ModeRadioButtons
                                    mode={this.props.mode}
                                    onModeChange={this.props.onModeChange} />
                            </Paper>
                        </Grid>
                        <Grid item xs>
                            <Paper elevation={2}
                                className="PaperRadioControl">
                                <ClearButton
                                    onClick={this.props.onClearButtonPress} />
                            </Paper>
                        </Grid> */}
                    </Grid>
                </Drawer>
            </div>
        );
    }
}

export default TrianglesSidebar;