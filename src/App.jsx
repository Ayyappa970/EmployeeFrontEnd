import  {BrowserRouter, Route,Routes } from 'react-router-dom'
import ListOfEmployeesComponent from './Components/ListOfEmployeesComponent'
import EmployeeComponent from './Components/EmployeeComponent'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ListOfEmployeesComponent/>}></Route>
        <Route path='/employees' element={<ListOfEmployeesComponent/>}></Route>
        <Route path='/add-employee' element={<EmployeeComponent/>}></Route>
        <Route path='/edit-employee/:id' element={<EmployeeComponent/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
