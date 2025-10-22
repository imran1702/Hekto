import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ContextApi } from './components/ContextApi.jsx'
import store from './store'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <ContextApi>
    <App />
  </ContextApi>
  </Provider>
)
