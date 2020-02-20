import React from 'react';
import Sidebar from './Sidebar'
import Sketch from './Sketch'

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <div>
                    <Sidebar />
                </div>
                <div>
                    <Sketch />
                </div>
            </div>
        );
    }
}

export default App;