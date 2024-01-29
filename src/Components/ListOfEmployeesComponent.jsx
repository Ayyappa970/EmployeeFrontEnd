import React, { useEffect, useState } from 'react'
import {deleteEmployee, listOfEmployees} from '../Services/EmployeeService'
import { useNavigate } from 'react-router-dom'
const ListOfEmployeesComponent = () => {
    const[employees,setEmployees]=useState([])
    const navigator=useNavigate();
    function getAllEmployees(){
        listOfEmployees().then((resp)=>{
            setEmployees(resp.data)
        }).catch(error=>{
            console.error(error)
        })
    }
    useEffect(()=>{
        getAllEmployees();
    },[])
    function addEmployee(){
        navigator('/add-employee')
    }
    function updateEmployee(id){
        navigator(`/edit-employee/${id}`)
    }
    function removeEmployee(id){
        deleteEmployee(id).then((resp)=>{
            getAllEmployees();
            console.log(resp.data)
        }).catch(error=>{
            console.error(error)
        })
    }
  return (
    <div className="container">
        <h1 className="text-center">Employees Table</h1>
        <button className="btn btn-primary mt-3 mb-3" onClick={addEmployee}>Add Employee</button>
        <table className="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Mobile Number</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    employees.map((emp)=>
                    <tr key={emp.id}>
                        <td>{emp.id}</td>
                        <td>{emp.firstName}</td>
                        <td>{emp.lastName}</td>
                        <td>{emp.email}</td>
                        <td>{emp.mobileNumber}</td>
                        <td>
                            <button className="btn btn-info" onClick={()=>updateEmployee(emp.id)}>Update</button>
                            <button className="btn btn-danger" onClick={()=>removeEmployee(emp.id)}>Delete</button>
                        </td>
                    </tr>)
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListOfEmployeesComponent