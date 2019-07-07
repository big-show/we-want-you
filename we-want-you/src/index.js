import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter, Router,Redirect,Switch } from 'react-router-dom';
import reducer from './reducer';
import './config'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(reducer, enhancer);
ReactDom.render(
    (
        <Provider store={store}>
            <BrowserRouter>

            </BrowserRouter>
        </Provider>
    ),
    document.getElementById("root")
);