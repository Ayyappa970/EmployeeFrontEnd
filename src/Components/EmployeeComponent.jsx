import React, {  useEffect, useState } from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import { createEmployee, getEmployee, updateEmployee } from '../Services/EmployeeService'

const EmployeeComponent = () => {
  const[firstName,setFirstName]=useState('')
  const[lastName,setLastName]=useState('')
  const[email,setEmail]=useState('')
  const[mobileNumber,setMobileNumber]=useState('')
  const navigator=useNavigate();
  const {id}=useParams();
  const[errors,setErrors]=useState({
    firstName:'',
    lastName:'',
    email:'',
    mobileNumber:''
  })
  function validForm(){
    let valid=true;
    const errorsCopy={...errors}
    if (firstName.trim()) {
      errorsCopy.firstName=''
    } else {
      errorsCopy.firstName='First Name is required'
      valid=false
    }
    if (lastName.trim()) {
      errorsCopy.lastName=''
    } else {
      errorsCopy.lastName='Last Name is required'
      valid=false
    }
    if (email.trim()) {
      errorsCopy.email=''
    } else {
      errorsCopy.email='Email is required'
      valid=false
    }
    if (mobileNumber.trim()) {
      errorsCopy.mobileNumber=''
    } else {
      errorsCopy.mobileNumber='Mobile Number is required'
      valid=false
    }
    setErrors(errorsCopy)
    return valid;
  }
  useEffect(()=>{
    if(id){
      getEmployee(id).then((resp)=>{
        setFirstName(resp.data.firstName)
        setLastName(resp.data.lastName)
        setEmail(resp.data.email)
        setMobileNumber(resp.data.mobileNumber)
      }).catch(error=>{
        console.error(error)
      })
    }
  },id)
  function saveorUpdateEmployee(e){
    e.preventDefault();
    if(validForm()){
      const employee={firstName,lastName,email,mobileNumber}
      console.log(employee)
      if(id){
        updateEmployee(id,employee).then((resp)=>{
          console.log(resp.data)
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
    if (id) {
      return <h2 className='text-center'>Update Employee</h2>
    } else {
      return <h2 className='text-center'>Add Employee</h2>
    }
  }
  return (
    <div className="container">
      <div className="row">
        <div className="card mt-4">
          {
            pageTitle()
          }
          <div className="card-body">
            <form action="">
              <div className="form-group">
                <label htmlFor="" className="form-label">First Name</label>
                <input type="text" className={`form-control ${errors.firstName?'is-invalid':''}`} placeholder='Enter your First Name' value={firstName} onChange={(e)=>{setFirstName(e.target.value)}}/>
                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
              </div>
              <div className="form-group mt-2">
                <label htmlFor="" className="form-label">Last Name</label>
                <input type="text" className={`form-control ${errors.lastName?'is-invalid':''}`} placeholder='Enter your Last Name' value={lastName} onChange={(e)=>{setLastName(e.target.value)}}/>
                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
              </div>
              <div className="form-group mt-2">
                <label htmlFor="" className="form-label">Email</label>
                <input type="email" className={`form-control ${errors.email?'is-invalid':''}`} placeholder='Enter your Email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
              </div>
              <div className="form-group mt-2">
                <label htmlFor="" className="form-label">Mobile Number</label>
                <input type="number" className={`form-control ${errors.mobileNumber?'is-invalid':''}`} placeholder='Enter your Mobile Number' value={mobileNumber} onChange={(e)=>{setMobileNumber(e.target.value)}}/>
                {errors.mobileNumber && <div className='invalid-feedback'>{errors.mobileNumber}</div>}
              </div>
              <button type="Submit" className="btn btn-success mt-3" onClick={saveorUpdateEmployee}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeComponent