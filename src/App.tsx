import { useRoutes } from 'react-router-dom'
import router from './router'
import './app.css'
function App() {
  const outLet = useRoutes(router)
  return <div className="h-full">{outLet}</div>
}

export default App
