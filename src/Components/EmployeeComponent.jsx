import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createEmployee, getEmployee, updateEmployee } from '../Services/EmployeeService'

const EmployeeComponent = () => {
  const[firstName,setFirstName]=useState('')
  const[lastName,setLastName]=useState('')
  const[email,setEmail]=useState('')
  const[mobileNumber,setMobileNumber]=useState('')
  const [errors,setErrors]=useState('')
  const navigator=useNavigate();
  const {id}=useParams()
  useEffect(()=>{
    if(id){
      getEmployee(id).then((res)=>{
        setFirstName(res.data.firstName)
        setLastName(res.data.lastName)
        setEmail(res.data.email)
        setMobileNumber(res.data.mobileNumber)
      }).catch(error=>{
        console.log(error)
      })
    }
  },[id])
  function validation(){
    let valid =true;
    let errorCopy={...errors}
    if (firstName.trim()) {
      errorCopy.firstName=''
    } else {
      errorCopy.firstName='First Name is equired'
      valid=false;
    }
    if (lastName.trim()) {
      errorCopy.lastName=''
    } else {
      errorCopy.lastName='Last Name is equired'
      valid=false;
    }
    if (email.trim()) {
      errorCopy.email=''
    } else {
      errorCopy.email='Email is equired'
      valid=false;
    }
    if (mobileNumber.trim()) {
      errorCopy.mobileNumber=''
    } else {
      errorCopy.mobileNumber='Mobile Number is equired'
      valid=false;
    }
    setErrors(errorCopy)
    return valid;
  }

  
  function saveorUpdateEmployee(e){
    e.preventDefault();
    if(validation()){
      const employee={firstName,lastName,email,mobileNumber}
      console.log(employee)
      if(id){
        updateEmployee(id,employee).then((resp)=>{
          console.log(resp.data);
        navigator('/employees')
        }).catch(error=>{
          console.error(error)
        })
      }else{
      createEmployee(employee).then((resp)=>{
        console.log(resp.data)
        navigator('/employees')
      }).catch(error=>{
        console.error(error)
      })
    } 
    }
  }
  function pageTitle(){
    if(id){
      return <h2 className="text-center">Update Employee</h2>
    }else{
      return <h2 className="text-center">Add Employee</h2>
    }
  }
  return (
    <div className="container">
        <div className="row">
            <div className="card mt-5">
                {
                  pageTitle()
                }
                <div className="card-body">
                  <form action="">
                      <div className="form-group">
                        <label className="label-control">First Name</label>
                        <input type="text" className={`form-control ${errors.firstName ?'is-invalid':''}`} placeholder='Enter your First Name' value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
                        {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                      </div>
                      <div className="form-group mt-2">
                        <label className="label-control">Last Name</label>
                        <input type="text" className={`form-control ${errors.lastName ?'is-invalid':''}`} placeholder='Enter your Last Name' value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
                        {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                      </div>
                      <div className="form-group mt-2">
                          <label className="label-control">Email</label>
                          <input type="email" className={`form-control ${errors.email ?'is-invalid':''}`} placeholder='Enter your Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                          {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                      </div>
                      <div className="form-group mt-2">
                          <label className="label-control">Mobile Number</label>
                          <input type="number" className={`form-control ${errors.mobileNumber ?'is-invalid':''}`} placeholder='Enter your Mobile Number' value={mobileNumber} onChange={(e)=>setMobileNumber(e.target.value)}/>
                          {errors.mobileNumber && <div className='invalid-feedback'>{errors.mobileNumber}</div>}
                      </div>
                      <button className="btn btn-success mt-3 mb-3" onClick={saveorUpdateEmployee}>Submit</button>
                  </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EmployeeComponent