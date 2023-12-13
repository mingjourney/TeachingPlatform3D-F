import { useRoutes } from 'react-router-dom'
import router from './router'
// import './App.css'
function App() {
  const outLet = useRoutes(router)
  return <div className="App">{outLet}</div>
}

export default App
