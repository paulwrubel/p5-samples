import React from 'react';
import { Grid } from "@material-ui/core";
import SketchContainer from 'containers/SketchContainer';
import p5Lasers from "./p5_lasers";
import LasersSidebar from "./LasersSidebar"

class LasersApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            information: new Map(),
        }

        this.handleInformationChange = this.handleInformationChange.bind(this);
    }

    handleInformationChange(newValue) {
        this.setState({
            information: newValue
        });
    }

    render() {
        return (
            <div className="App">
                <Grid
                    container
                    spacing={0}
                    direction='row'
                    alignItems='stretch'
                    wrap='nowrap'>
                    <Grid container item xs>
                        <LasersSidebar
                            app={this.props.app}
                            information={this.state.information}

                            isControlsPanelOpen={this.props.isControlsPanelOpen} />
                    </Grid>
                    <Grid container item xs={this.props.isControlsPanelOpen ? 9 : 12}>
                        <SketchContainer
                            sketch={p5Lasers}

                            onInformationChange={this.handleInformationChange}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default LasersApp;