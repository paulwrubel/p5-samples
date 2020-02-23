import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import chainball from 'sketches/chainball';
import 'sketch_containers/Sketch.css';

class Chainball extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    // componentDidMount(){
    //     this.forceUpdate();
    // }

    render() {
        return (
            <div id="Sketch" className="Sketch">
                <P5Wrapper sketch={chainball} className="P5Wrapper"
                mode={this.props.mode} 
                ballCount={this.props.ballCount} 
                linkLength={this.props.linkLength} 
                linkTension={this.props.linkTension} 
                linkDamping={this.props.linkDamping} 
                onFrameRateChange={this.props.onFrameRateChange}>
                </P5Wrapper>
            </div>
        );
    }
}

export default Chainball;