import React from 'react';
import { HashRouter, Switch, withRouter } from 'react-router-dom';
import Vixuals from 'Vixuals'

class VixualsRouter extends React.Component {

    render() {
        return (
            <div className="VixualsRouter">
                <HashRouter>
                    <Switch>
                        <Vixuals/>
                    </Switch>
                </HashRouter>
            </div>
        );
    }
}

export default VixualsRouter;