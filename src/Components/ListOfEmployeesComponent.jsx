import React, { useEffect, useState } from 'react'
import { deleteEmployee, listOfEmployees } from '../Services/EmployeeService'
import { useNavigate } from 'react-router-dom'
const ListOfEmployeesComponent = () => {
    let[employees,setEmployees]=useState([])
    const navigator=useNavigate()
    function getAllEmployee(){
        listOfEmployees().then((resp)=>{
            setEmployees(resp.data)
        }).catch(error=>{
            console.error(error)
        })
    }
    useEffect(()=>{
        getAllEmployee();
    },[])
    function addEmployee(){
        navigator('/add-employee')
    }
    function updateEmployee(id){
        navigator(`/edit-employee/${id}`)
    }
    function removeEmployee(id){
        deleteEmployee(id).then((resp)=>{
            console.log(resp.data)
        }).catch(error=>{
            console.error(error)
        })
    }
  return (
    <div className="container">
        <h1 className="text-center">Employee Details</h1>
        <button className="btn btn-primary mt-2 mb-2" onClick={addEmployee}>Add Employee</button>
        <table className="table table-striped table-bordered">
            <thead>
                <tr>
                <th>Id</th>
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
                            <button style={{marginLeft:'10px'}} className="btn btn-danger" onClick={()=>removeEmployee(emp.id)}>Delete</button>
                        </td>
                    </tr>)
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListOfEmployeesComponent