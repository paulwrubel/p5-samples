import React from 'react';
// import './SketchSelector.css';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography"
import withStyles from "@material-ui/core/styles/withStyles"

const styles = theme => ({
    root: {
        boxSizing: "border-box",
        height: "50px",
        // width: "100vw",
        margin: "0",
        padding: "0",
        // display: "block",
        // overflow: "hidden"
    },
    menuBar: {

        height: "50px",
    },
    appBar: {

        // height: "50px",
    },
    versionBar: {
        padding: "0",
        // height: "50px",
    },
});

class MenuBar extends React.Component {
    render() {
        return (
            <div className={`${this.props.classes.root} MenuBar`}>
                <Grid className={this.props.classes.menuBar}
                    container
                    spacing={0}
                    direction="row"
                    justify="space-between"
                    // alignItems="center"
                    wrap="nowrap">
                    <Grid className={this.props.classes.appBar}
                        item xs
                        container
                        spacing={0}
                        direction="row"
                        justify="flex-start"
                        // alignItems="center"
                        wrap="nowrap">
                        <Grid item xs={2}
                        container
                        direction="column"
                        justify="center">
                            <Typography>
                                {this.props.selectedApp.name}
                                {this.props.selectedApp.version}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}
                        container
                        direction="column"
                        justify="center">
                            <Typography>
                                APP SELECTOR
                            </Typography>
                        </Grid>
                        <Grid item xs
                        container
                        direction="column"
                        justify="center">
                            <Typography>
                                {this.props.selectedApp.description}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid className={this.props.classes.versionBar}
                        item xs={3}
                        container
                        spacing={0}
                        justify="center"
                        direction="column"
                        wrap="nowrap">
                        <Grid item>
                            <Typography>
                                {this.props.appName}: {this.props.appVersion}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography>
                                {this.props.selectedApp.name}: {this.props.selectedApp.version}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(MenuBar);