import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './login/Login';
const App = () => {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  </>
}

export default App