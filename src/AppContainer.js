import React from 'react';
import Sidebar from 'sidebar/Sidebar'
import ChainballContainer from 'sketches/chainball/ChainballContainer'
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import SketchContainer from 'sketches/SketchContainer';

const styles = theme => ({
    root: {
        width: "100vw",
        height: "92vh"
    }
});

class AppContainer extends React.Component {

    render() {
        return (
            <div className={this.props.classes.root}>
                {this.props.selectedApp}
            </div>
        );
    }
}

export default withStyles(styles)(AppContainer);