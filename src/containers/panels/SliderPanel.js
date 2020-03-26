import React from 'react';
import { Paper, Slider, Typography, Box, Grid } from '@material-ui/core';
import "containers/Panels.css"

class SliderPanel extends React.Component {

    handleBallCountChange(event, newValue) {
        this.props.onBallCountChange(newValue);
    }

    render() {
        return (
            <Box>
                <Paper elevation={2}
                    className="PaperSliders">
                    <Typography gutterBottom>
                        {this.props.label}
                    </Typography>
                    {this.props.sliders.map(s => (
                        <Grid container
                            key={s.key}
                            spacing={1}
                            direction="row"
                        >
                            <Grid item>
                                <Typography id={s.key}>
                                    {s.label}
                                </Typography>
                            </Grid>
                            <Grid item xs className="Grow">
                                <Slider
                                    defaultValue={s.defaultValue}
                                    value={s.value || s.defaultValue}
                                    onChange={((_, v) => { s.onChange(v) })}
                                    min={s.minValue}
                                    max={s.maxValue}
                                    step={s.stepValue}
                                    aria-labelledby={s.key}
                                    valueLabelDisplay={s.valueLabelDisplay || "on"}
                                />
                            </Grid>
                        </Grid>
                    ))}
                </Paper>
            </Box>
        );
    }
}

export default SliderPanel;
