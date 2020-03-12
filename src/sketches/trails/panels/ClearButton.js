import React from 'react';
import { Button } from '@material-ui/core';

class ClearButton extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.props.onClick();
    }

    render() {
        return (
            <div>
                <Button 
                    variant="outlined" 
                    color="secondary"
                    onClick={this.handleClick}>
                        Clear Canvas
                </Button>
            </div>
        );
    }
}

export default ClearButton;
