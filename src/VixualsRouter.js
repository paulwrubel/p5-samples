import React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import Vixuals from 'Vixuals'

class VixualsRouter extends React.Component {

    render() {
        return (
            <div className="VixualsRouter">
                <HashRouter>
                    <Switch>
                        <Route path="/:app">
                            <Vixuals/>
                        </Route>
                        <Route path="/">
                            <Redirect to="/chainball"/>
                        </Route>
                    </Switch>
                </HashRouter>
            </div>
        );
    }
}

export default VixualsRouter;