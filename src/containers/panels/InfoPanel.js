import React from 'react';
import { Typography } from '@material-ui/core';

class InfoPanel extends React.Component {
    render() {
        return (
            <div>
                {this.props.info.map(fact => (
                    <Typography
                        key={fact.label}
                        variant="body1"
                        color="textSecondary">
                        {fact.label}: {fact.data}
                    </Typography>
                ))}
            </div>
        );
    }
}

export default InfoPanel;
