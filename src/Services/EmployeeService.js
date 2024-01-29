import axios from "axios";
const base_url="http://localhost:8080/api/employees";
export const listOfEmployees=()=>axios.get(base_url);
export const createEmployee=(employee)=>axios.post(base_url,employee)
export const getEmployee=(employeeId)=>axios.get(base_url+'/'+employeeId)
export const updateEmployee=(employeeId,employee)=>axios.put(base_url+'/'+employeeId,employee)
export const deleteEmployee=(employeeId)=>axios.delete(base_url+'/'+employeeId)