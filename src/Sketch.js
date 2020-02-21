import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import chainball from './sketches/chainball';
import './Sketch.css';

class Sketch extends React.Component {
    render() {
        return (
            <div id="Sketch" className="Sketch">
                <P5Wrapper sketch={chainball} className="P5Wrapper"></P5Wrapper>
            </div>
        );
    }
}

export default Sketch;