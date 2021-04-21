import React from 'react';
import { Button, Paper, Grid } from '@material-ui/core';
import "./containers/Panels.css"

class ButtonPanel extends React.Component {
    render() {
        return (
            <div>
                <Paper elevation={2}
                    className="PaperButtons">
                    <Grid
                        className="ButtonGrid"
                        container
                        spacing={1}
                        justify="space-evenly"
                        alignItems="center"
                        direction="row"
                    >
                        {this.props.buttons.map(b => (
                            <Grid item xs>
                                <Button
                                    key={b.key}
                                    variant="outlined"
                                    color="secondary"
                                    onClick={b.onClick}
                                >
                                    {b.label}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            </div>
        );
    }
}

export default ButtonPanel;
