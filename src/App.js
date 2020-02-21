import React from 'react';
import Sidebar from './Sidebar'
import Sketch from './Sketch'
import Grid from "@material-ui/core/Grid";
import './App.css'

class App extends React.Component {
    render() {
        return (
            <div className="App">
                    <Grid
                        container
                        spacing={0}
                        direction='row'
                        justify='center'
                        wrap='nowrap'
                        alignItems='stretch'>
                        <Grid item xs={3}>
                            <Sidebar />
                        </Grid>
                        <Grid item xs>
                            <Sketch />
                        </Grid>
                    </Grid>
            </div>
        );
    }
}

export default App;