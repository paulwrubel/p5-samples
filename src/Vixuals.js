import React from 'react';
import Sidebar from 'sidebar/Sidebar'
import ChainballContainer from 'sketches/chainball/ChainballContainer'
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles"
import SketchContainer from 'sketches/SketchContainer';
import ChainballApp from 'sketches/chainball/ChainballApp';
import AppContainer from "AppContainer"

const styles = theme => ({
    root: {
        height: "100vh",
        width: "100vw",
        margin: "0",
        display: "block",
        overflow: "hidden"
    },
    menuBar: {
        height: "8vh",
        width: "100vw",
    },
    app: {
        height: "92vh",
        width: "100vw",
    }
});

class Vixuals extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedApp: <ChainballApp/>
        }
    }

    render() {
        return (
            <div className={`${this.props.classes.root} Vixuals`}>
                <Grid container 
                spacing={0}
                direction='column'
                justify='center'
                alignItems='stretch'
                wrap='nowrap'>
                    <Grid item className={this.props.classes.menuBar}>
                        <p>TEST</p>
                    </Grid>
                    <Grid item className={this.props.classes.app}>
                        <AppContainer
                            selectedApp={this.state.selectedApp}/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Vixuals);