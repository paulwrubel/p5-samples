import React from 'react';
import { Grid } from "@material-ui/core";
import SketchContainer from 'containers/SketchContainer';
import p5Template from "./p5_template";
import TemplateSidebar from "./TemplateSidebar"

class TemplateApp extends React.Component {
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
                        <TemplateSidebar
                            app={this.props.app}
                            information={this.state.information}

                            isControlsPanelOpen={this.props.isControlsPanelOpen} />
                    </Grid>
                    <Grid container item xs={this.props.isControlsPanelOpen ? 9 : 12}>
                        <SketchContainer
                            sketch={p5Template}

                            onInformationChange={this.handleInformationChange}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default TemplateApp;