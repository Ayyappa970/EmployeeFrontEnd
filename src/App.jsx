import EmployeeComponent from "./Components/EmployeeComponent"
import ListOfEmployeesComponent from "./Components/ListOfEmployeesComponent"
import  {BrowserRouter, Route, Routes } from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListOfEmployeesComponent/>}></Route>
        <Route path="/employees" element={<ListOfEmployeesComponent/>}></Route>
        <Route path="/add-employee" element={<EmployeeComponent/>}></Route>
        <Route path="/edit-employee/:id" element={<EmployeeComponent/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
