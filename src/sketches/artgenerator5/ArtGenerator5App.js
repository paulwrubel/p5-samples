import React from 'react';
import { Grid } from "@material-ui/core";
import SketchContainer from './containers/SketchContainer';
import p5ArtGenerator5 from "./p5_artgenerator5";
import ArtGenerator5ControlsPanel from "./ArtGenerator5ControlsPanel"

class ArtGenerator5App extends React.Component {
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
                        <ArtGenerator5ControlsPanel
                            information={this.state.information}
                            
                            isControlsPanelOpen={this.props.isControlsPanelOpen} />
                    </Grid>
                    <Grid container item xs={this.props.isControlsPanelOpen ? 9 : 12}>
                        <SketchContainer
                            sketch={p5ArtGenerator5}
                            
                            onInformationChange={this.handleInformationChange}
                            />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default ArtGenerator5App;