import React from 'react';
// import Sidebar from 'sketches/chainball/Sidebar'
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import SketchContainer from 'containers/SketchContainer';

const styles = theme => ({
    root: {
        // boxSizing: "border-box",
        // padding: "20px",
        // margin: "0",
        // width: "100%",
        // minHeight: "100%"
    }
});

class SidebarContainer extends React.Component {

    render() {
        return (
            <div className={this.props.classes.root}>
                {this.props.children}
            </div>
        );
    }
}

export default withStyles(styles)(SidebarContainer);