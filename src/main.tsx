import ReactDOM from 'react-dom/client'
import 'virtual:svg-icons-register'
import App from './App.tsx'
import { store } from './store/store.ts'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import '@/assets/styles/global.scss'
ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
)
