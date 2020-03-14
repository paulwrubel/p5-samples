import React from 'react';
import { Grid, Drawer } from '@material-ui/core';
import "containers/Sidebar.css"
import InfoPanel from 'containers/panels/InfoPanel';
import RadioPanel from 'containers/panels/RadioPanel';
import SwitchPanel from 'containers/panels/SwitchPanel';

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
                                panelKey="generation_mode"
                                label="Generation Mode"
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
                                panelKey="gravity_mode"
                                label="Gravity Mode"
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
                                            label: "Solid Border",
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