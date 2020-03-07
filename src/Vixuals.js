import React from 'react';
// import Sidebar from 'sketches/chainball/Sidebar'
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles"
import SketchContainer from 'containers/SketchContainer';
import ChainballApp from 'sketches/chainball/ChainballApp';
import AppContainer from "containers/AppContainer"
import MenuBar from "MenuBar"

const styles = theme => ({
    root: {
        boxSizing: "border-box",
        height: "100vh",
        width: "100vw",
        margin: "0",
        padding: "0",
        display: "block",
        overflow: "hidden"

    },
    menuBar: {
        // boxSizing: "border-box",
        // height: "50px",
        // float: "top"
        // "& .MenuBar": {
        //     boxSizing: "border-box",
        //     height: "50px",
        //     width: "100vw",
        //     padding: "0",
        //     margin: "0",
        //     "& Grid": {

        //     boxSizing: "border-box",
        //     height: "50px",
        //     width: "100vw",
        //     padding: "0",
        //     margin: "0",
        //     }
        // }
    },
    app: {
        // height: "100vh",
        // width: "100vw",
    }
});

const sketchMap = new Map();

const appName = "Vixuals"
const appVersion = "v0.1-alpha"

class Vixuals extends React.Component {
    constructor(props) {
        super(props);

        sketchMap.set("chainball", {
            name: "Chainball",
            description: "2D Kinematic demonstration",
            app: <ChainballApp/>,
            version: "v0.9-beta"
        })

        sketchMap.set("orbiter", {
            name: "Orbiter",
            description: "Orbiter thing",
            app: <ChainballApp/>,
            version: "v0.1-alpha"
        })

        this.state = {
            selectedApp: sketchMap.get("chainball"),
            selectedAppName: "Chainball",
            selectedAppVersion: "v0.9-beta"
        }
    }

    render() {
        return (
            <div className={`${this.props.classes.root} Vixuals`}>
                <Grid //className={this.props.classes.root}
                container 
                spacing={0}
                direction="column"
                // justify='flex-start'
                // alignItems='stretch'
                wrap='nowrap'>
                    <Grid item className={this.props.classes.menuBar}>
                        <MenuBar 
                        appName={appName}
                        appVersion={appVersion}
                        selectedApp={this.state.selectedApp}/>
                    </Grid>
                    <Grid item className={this.props.classes.app}>
                        {this.state.selectedApp.app}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Vixuals);