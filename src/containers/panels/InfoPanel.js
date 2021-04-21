import React from 'react';
import { Typography, Paper } from '@material-ui/core';
import "./containers/Panels.css"

class InfoPanel extends React.Component {
    render() {
        return (
            <div>
                <Paper elevation={2}
                    className="PaperInformation">
                    {this.props.info.map(fact => (
                        <Typography
                            key={fact.key}
                            variant="body1"
                            color="textSecondary">
                            {fact.text}
                        </Typography>
                    ))}
                </Paper>
            </div>
        );
    }
}

export default InfoPanel;
