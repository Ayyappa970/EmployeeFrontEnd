import axios from 'axios'
const basic_url='http://localhost:8080/api/employees'
export const listOfEmployees=()=> axios.get(basic_url) 
export const createEmployee=(employee)=>axios.post(basic_url,employee)
export const getEmployee=(employeeId)=>axios.get(basic_url+'/'+employeeId)
export const updateEmployee=(employeeId,employee)=>axios.put(basic_url+'/'+employeeId,employee)
export const deleteEmployee=(employeeId)=>axios.delete(basic_url+'/'+employeeId)