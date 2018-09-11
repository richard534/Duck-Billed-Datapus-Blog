import React from 'react'
import ReactDOM from 'react-dom'

// Your top level component
import App from './app'

// Export top level component as JSX (for static rendering)
export default App

// Add css styles to app bundle
import './styles/app.css'
import './styles/highlight-js-github-style.min.css'

// Add fontawesome icons to app bundle
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowRight, faArrowLeft, faRssSquare } from '@fortawesome/free-solid-svg-icons'
library.add(faArrowRight, faArrowLeft, faRssSquare)

// Render app
if (typeof document !== 'undefined') {
  const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate || ReactDOM.render
  const render = Comp => {
    renderMethod(<Comp />, document.getElementById('root'))
  }

  render(App)
}
