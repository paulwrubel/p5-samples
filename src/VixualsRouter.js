import React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import Vixuals from 'Vixuals'

const DEFAULT_PARAM = "__DEFAULT_APP__"

class VixualsRouter extends React.Component {

    render() {
        return (
            <div className="VixualsRouter">
                <HashRouter>
                    <Switch>
                        <Route path="/:app">
                            <Vixuals
                                defaultParam={DEFAULT_PARAM}/>
                        </Route>
                        <Route path="/">
                            <Redirect to={`/${DEFAULT_PARAM}`}/>
                        </Route>
                    </Switch>
                </HashRouter>
            </div>
        );
    }
}

export default VixualsRouter;