import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import 'sketches/SketchContainer.css';

const styles = theme => ({
    root: {
        width: "75vw",
        height: "92vh"
    },
    p5Canvas: {
        display: "block"
    }
});

class SketchContainer extends React.Component {

    componentDidMount(){
        this.forceUpdate();
    }

    render() {
        return (
            <div className={`${this.props.classes.root} SketchContainer`}>
                {this.props.selectedSketch}
            </div>
        );
    }
}

export default withStyles(styles)(SketchContainer);