import React from 'react'
import ReactDOM from 'react-dom'

// Your top level component
import App from './app'

// Export top level component as JSX (for static rendering)
export default App

import './styles/app.css'
import './styles/highlight-js-github-style.min.css'

// Render app
if (typeof document !== 'undefined') {
  const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate || ReactDOM.render
  const render = Comp => {
    renderMethod(<Comp />, document.getElementById('root'))
  }

  render(App)
}
