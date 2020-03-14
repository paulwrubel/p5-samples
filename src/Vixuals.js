import React from 'react';
import { Grid } from '@material-ui/core';
import MenuBar from './MenuBar';
import './Vixuals.css';
import appMap from "./AppMap";
import { Redirect, withRouter } from 'react-router-dom';

const appName = "Vixuals"
const appVersion = "0.4.6.2a"

const defaultApp = "chainball"

class Vixuals extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isControlsPanelOpen: true
        };

        this.handleSelectedAppChange = this.handleSelectedAppChange.bind(this);
        this.handleControlsPanelToggle = this.handleControlsPanelToggle.bind(this);
    }

    handleSelectedAppChange(newValue) {
        return event => {
            this.setState({
                redirectLocation: newValue,
                shouldRedirect: true
            });
        }
        // return <Redirect to={`/${newValue}`}/>
    }

    handleControlsPanelToggle(newValue) {
        return event => {
            this.setState({
                isControlsPanelOpen: newValue
            });
        }
    }

    render() {
        if (this.state.shouldRedirect) {
            this.setState({ shouldRedirect: false })
            return <Redirect to={`/${this.state.redirectLocation}`} />
        }
        if (this.props.match.params.app === this.props.defaultParam) {
            return <Redirect to={`/${defaultApp}`} />
        }
        let App = appMap.get(this.props.match.params.app).component;
        return (
            <div className="Vixuals">
                {/* <Route 
                path="/:app"> */}
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    wrap='nowrap'>
                    <Grid item>
                        <MenuBar
                            appName={appName}
                            appVersion={appVersion}
                            selectedApp={appMap.get(this.props.match.params.app)}
                            setSelectedApp={this.handleSelectedAppChange}
                            apps={appMap}

                            onControlsPanelToggle={this.handleControlsPanelToggle}
                            isControlsPanelOpen={this.state.isControlsPanelOpen} />
                    </Grid>
                    <Grid item>
                        <App
                            onControlsPanelToggle={this.handleControlsPanelToggle}
                            isControlsPanelOpen={this.state.isControlsPanelOpen} />
                    </Grid>
                </Grid>
                {/* </Route>
                <Route path="/">
                    <Redirect to={`/${defaultApp}`} />
                </Route> */}
            </div>
        );
    }
}

export default withRouter(Vixuals);