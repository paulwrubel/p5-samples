import React from 'react';
import { Grid } from "@material-ui/core";
import SketchContainer from './containers/SketchContainer';
import p5InteractiveHistogram from "./sketches/interactivehistogram/p5_interactivehistogram";
import InteractiveHistogramSidebar from './InteractiveHistogramSidebar';

class InteractiveHistogramApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            frameRate: 0
        }

        this.handleFrameRateChange = this.handleFrameRateChange.bind(this);
        this.handleBarHeightScalarChange = this.handleBarHeightScalarChange.bind(this);
    }

    handleFrameRateChange(newFrameRateValue) {
        this.setState({
            frameRate: newFrameRateValue
        });
    }

    handleBarHeightScalarChange(newBarHeightScalarValue) {
        this.setState({
            barHeightScalar: newBarHeightScalarValue
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
                        <InteractiveHistogramSidebar
                            frameRate={this.state.frameRate}
                            barHeightScalar={this.state.barHeightScalar}
                            onBarHeightScalarChange={this.handleBarHeightScalarChange}

                            isControlsPanelOpen={this.props.isControlsPanelOpen}
                            />
                    </Grid>
                    <Grid container item xs={this.props.isControlsPanelOpen ? 9 : 12}>
                        <SketchContainer
                            sketch={p5InteractiveHistogram}

                            onFrameRateChange={this.handleFrameRateChange}
                            barHeightScalar={this.state.barHeightScalar}
                            onBarHeightScalarChange={this.handleBarHeightScalarChange}
                            />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default InteractiveHistogramApp;