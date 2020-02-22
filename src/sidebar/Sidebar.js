import React from 'react';
import SketchSelector from './SketchSelector'
import SketchProperties from './SketchProperties'
import './Sidebar.css';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles'

const styles = theme => ({
    root: {
        padding: "10%",
        margin: "0"
    }
});

class Sidebar extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <div className={`${this.props.classes.root} Sidebar`}>
                <Grid
                    container
                    spacing={4}
                    direction="column"
                    justify="space-evenly"
                    alignItems="stretch"
                    wrap="nowrap">
                    {/* <Grid item xs>
                        <SketchSelector />
                    </Grid> */}
                    <Grid item xs={12}>
                        <SketchProperties
                            mode={this.props.mode}
                            onModeChange={this.props.onModeChange}
                            ballCount={this.props.ballCount}
                            onBallCountChange={this.props.onBallCountChange}
                            linkLength={this.props.linkLength}
                            onLinkLengthChange={this.props.onLinkLengthChange}
                            linkTension={this.props.linkTension}
                            onLinkTensionChange={this.props.onLinkTensionChange}
                            linkDamping={this.props.linkDamping}
                            onLinkDampingChange={this.props.onLinkDampingChange} />
                    </Grid>
                    <Grid item>
                        <p>---DEBUG INFO---</p>
                        <p>FPS: {this.props.frameRate}</p>
                        <p>MODE: {this.props.mode}</p>
                        <p>BALLS: {this.props.ballCount}</p>
                        <p>LENGTH: {this.props.linkLength}</p>
                        <p>TENSION: {this.props.linkTension}</p>
                        <p>DAMPING: {this.props.linkDamping}</p>

                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Sidebar);