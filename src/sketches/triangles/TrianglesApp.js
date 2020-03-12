import React from 'react';
import { Grid } from "@material-ui/core";
import SketchContainer from 'containers/SketchContainer';
import p5Triangles from "sketches/triangles/p5_triangles";
import TrianglesSidebar from './TrianglesSidebar';

class TrianglesApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            frameRate: 0
        }
        
        this.handleFrameRateChange = this.handleFrameRateChange.bind(this);
    }

    handleFrameRateChange(newValue) {
        this.setState({
            frameRate: newValue
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

                            frameRate={this.state.frameRate} 
                            
                            isControlsPanelOpen={this.props.isControlsPanelOpen}
                            />
                    </Grid>
                    <Grid container item xs={this.props.isControlsPanelOpen ? 9 : 12}>
                        <SketchContainer
                            sketch={p5Triangles}

                            // mode={this.state.mode}

                            onFrameRateChange={this.handleFrameRateChange}
                            />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default TrianglesApp;