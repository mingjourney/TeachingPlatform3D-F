import ReactDOM from 'react-dom/client'
import 'virtual:svg-icons-register'
import App from './App.tsx'
import { persistor, store } from './store/store.ts'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Globals } from '@react-spring/core'

import { PersistGate } from 'redux-persist/integration/react'
import '@/assets/styles/global.scss'
Globals.assign({
  frameLoop: 'always'
})
ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
)
