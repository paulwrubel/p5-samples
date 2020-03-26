import React from 'react';
import { Grid, Drawer } from '@material-ui/core';
import "containers/Sidebar.css";
import InfoPanel from 'containers/panels/InfoPanel';
import SliderPanel from 'containers/panels/SliderPanel';
import NumberInputPanel from 'containers/panels/NumberInputPanel';

class ArtGenerator5ControlsPanel extends React.Component {
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
                            <InfoPanel
                                info={Array.from(this.props.information, ([key, value]) => ({
                                    key: key,
                                    text: value,
                                }))}
                            />
                        </Grid>
                        <Grid item xs>
                            <NumberInputPanel
                                label="Image Size"
                                numberInputs={[
                                    {
                                        key: "image_width_input",
                                        label: "W:",
                                        value: this.props.imageWidth,
                                        minValue: 1,
                                        maxValue: 5000,
                                        onChange: this.props.onImageWidthChange,
                                    },
                                    {
                                        key: "image_height_input",
                                        label: "H:",
                                        value: this.props.imageHeight,
                                        minValue: 1,
                                        maxValue: 5000,
                                        onChange: this.props.onImageHeightChange,
                                    },
                                ]}
                            />
                        </Grid>
                        <Grid item xs>
                            <SliderPanel
                                label="Image Size"
                                sliders={[
                                    {
                                        key: "image_width_slider",
                                        label: "Width:",
                                        value: 2,
                                        onChange: console.log,
                                        defaultValue: 2,
                                        minValue: 1,
                                        maxValue: 10,
                                        stepValue: 1,
                                        valueLabelDisplay: "auto"
                                    },
                                    {
                                        key: "image_height_slider",
                                        label: "Height:",
                                        value: 5,
                                        onChange: console.log,
                                        defaultValue: 5,
                                        minValue: 1,
                                        maxValue: 10,
                                        stepValue: 1,
                                        valueLabelDisplay: "auto"
                                    },
                                    {
                                        key: "slider_3",
                                        label: "Brightness:",
                                        value: 8,
                                        onChange: console.log,
                                        defaultValue: 8,
                                        minValue: 1,
                                        maxValue: 10,
                                        stepValue: 1,
                                        valueLabelDisplay: "auto"
                                    },
                                ]}
                            />
                        </Grid>
                    </Grid>
                </Drawer>
            </div>
        );
    }
}

export default ArtGenerator5ControlsPanel;