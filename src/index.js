import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { Router, browserHistory } from "react-router"
import { syncHistoryWithStore } from "react-router-redux"
import { createLogger } from 'redux-logger'
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from "redux-thunk"

import routes from "./routes"
import "./css/index.css"
import Reducer from './reducers/rootReducer'

const logger = createLogger({
	collapsed: true,
})

let store=createStore(Reducer,compose(applyMiddleware(thunk,logger)))

ReactDOM.render(
  <Provider store={store}>
  	<Router routes={routes}/> 
  </Provider>,
	document.getElementById('root')
);
