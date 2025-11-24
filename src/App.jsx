import Home from "./pages/Home"
import AddUsers from './pages/AddUsers'
import Info from './pages/Info'
import UpdateUser from './pages/UpdateUser'
import { Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/AddUsers' element={<AddUsers/>}/>
        <Route path='/Info/:id' element={<Info/>}/>
        <Route path='/UpdateUser/:id' element={<UpdateUser/>}/>
      </Routes>
      <ToastContainer/>
    </>
  )
}

export default App
