import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
// import { Router, Route, browserHistory } from 'react-router'

import App from "./App"
import store from "./store"

const app = document.getElementById('app')

ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, app);
