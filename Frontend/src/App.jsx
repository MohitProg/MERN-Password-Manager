
import './App.css'
import Home from './pages/Home';
import {BrowserRouter,Routes ,Route} from "react-router-dom"
import Login from './pages/Login';
import Singup from './pages/Singup';
import Auth from './middleware/Auth';
import { Toaster } from 'react-hot-toast';

function App() {


  return (
    <>
  <BrowserRouter>
  <Toaster/>
  <Routes>
    <Route path='/login' element={<Login/>}/>
    <Route path='/singup' element={<Singup/>}/>
    <Route element={<Auth/>}>

    <Route path='/' element={<Home/>}/>
    </Route>
  </Routes>
  </BrowserRouter>
    </>
  )
}

export default App;
