import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'


import { store } from './store/store'
import { RootCmp } from './RootCmp'

import '@fortawesome/fontawesome-free/css/all.min.css'
import './assets/styles/main.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<Provider store={store}>
		<Router>
			<RootCmp />
		</Router>
	</Provider>
)
