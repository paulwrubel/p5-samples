import React from 'react';
// import Sidebar from 'sketches/chainball/Sidebar'
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles"
import SketchContainer from 'containers/SketchContainer';
import ChainballApp from 'sketches/chainball/ChainballApp';
import AppContainer from "containers/AppContainer"
import MenuBar from "MenuBar"
import "./Vixuals.css"
import appMap from "./AppMap"
import { Route, HashRouter, Switch, Redirect, withRouter } from 'react-router-dom';

const appName = "Vixuals"
const appVersion = "0.1a"

const defaultApp = "chainball"

class Vixuals extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedApp: appMap.get(defaultApp)
        };

        this.handleSelectedAppChange = this.handleSelectedAppChange.bind(this);
    }

    handleSelectedAppChange(newValue) {
        return event => {
            this.setState({
                selectedApp: appMap.get(newValue)
            });
        }
    }

    render() {
        return (
            <div className="Vixuals">
                <Route path="/:app/">
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        wrap='nowrap'>
                        <Grid item>
                            {console.log(this.props.match)}
                            <MenuBar
                                appName={appName}
                                appVersion={appVersion}
                                selectedApp={appMap.get(this.props.match.params.app)}
                                setSelectedApp={this.handleSelectedAppChange}
                                apps={appMap} />
                        </Grid>
                        <Grid item>
                            {this.state.selectedApp.component}
                        </Grid>
                    </Grid>
                </Route>
                <Route path="/">
                    <Redirect to={`/${defaultApp}`} />
                </Route>
            </div>
        );
    }
}

export default withRouter(Vixuals);