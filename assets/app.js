import {Provider} from 'react-redux'
import "./styles/bootstrap.min.css";
import './styles/app.css';
import Index from "./src/purse/Index";
import {Redirect, Route, Switch} from 'react-router'
import {ConnectedRouter} from 'connected-react-router'
import configureStore, {history} from "./src/redux/configureStore";
import React from "react";

const store = configureStore()

export default function App() {
    return <Provider store={store}>
        <ConnectedRouter history={history}>
            <>
                <Switch>
                    <Route exact path="/" component={Index}/>
                    <Route exact path="/filter/date/:date" component={Index}/>
                    <Route exact path="/filter/date/:date/to/:to_date" component={Index}/>
                    <Route render={() => (<div>404</div>)}/>
                    <Redirect to="/"/>
                </Switch>
            </>
        </ConnectedRouter>
    </Provider>
}