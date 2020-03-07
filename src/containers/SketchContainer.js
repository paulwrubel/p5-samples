import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import "./SketchContainer.css"

class SketchContainer extends React.Component {
    render() {
        const { p5Sketch, ...other } = this.props;
        return (
            <div className="SketchContainer">
                <P5Wrapper className="P5Wrapper"
                    sketch={p5Sketch}
                    {...other}>
                </P5Wrapper>
            </div>
        );
    }
}

export default SketchContainer;