import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import CreatePContainer from './components/vendor/CreatePContainer.jsx'
import ListPContainer from './components/vendor/ListPContainer.jsx'
import ViewPContainer from './components/general/ViewPContainer.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ViewPContainer />
  </React.StrictMode>,
)
