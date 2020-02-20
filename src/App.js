import React from 'react';
import Sidebar from './Sidebar'
import Sketch from './Sketch'

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Sidebar />
                <Sketch />
            </div>
        );
    }
}

export default App;