import React from 'react';
import { Typography, Paper } from '@material-ui/core';
import "containers/Panels.css"

class TextPanel extends React.Component {
    render() {
        return (
            <div>
                <Paper elevation={2}
                    className="PaperText">
                    <Typography
                        variant="h6"
                        color="textPrimary">
                        {this.props.title}
                    </Typography>
                    <Typography
                        variant="body1"
                        color="textSecondary">
                        {this.props.body}
                    </Typography>
                </Paper>
            </div>
        );
    }
}

export default TextPanel;
