import React from 'react';
// import Sidebar from 'sketches/chainball/Sidebar'
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import SketchContainer from 'containers/SketchContainer';

const styles = theme => ({
    root: {
        // width: "100%",
        // minHeight: "100%",
        // height: "100%",
        // boxSizing: "border-box",
        // flexGrow: "1"
    }
});

class AppContainer extends React.Component {

    render() {
        return (
            <div className={this.props.classes.root}>
                {this.props.children}
            </div>
        );
    }
}

export default withStyles(styles)(AppContainer);