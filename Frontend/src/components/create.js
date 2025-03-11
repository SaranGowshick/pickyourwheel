import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {Link } from 'react-router-dom';
import './css/index.css';
import logo from './assets/logo.png'
const api_base="http://localhost:3001";
function Create() {
  const[employeeName,setEmployeename]=useState('');
  const[employeeID,setEmployeeID]=useState('');
  const[employeeEmail,setEmployeeEmail]=useState('');
  const[employeePhone,setEmployeePhone]=useState('');
  const[errors,setErrors]=useState({});
  
  const validateInputs=()=>{
    const error={};
    if(employeeName.trim() === ''){
      alert("Enter Employee Name")
      error.employeeName = 'Enter Employee Name';
    }
    if(employeeID.length>6){
      alert("Id Should not greater Than 6")
      setEmployeeID('');
      error.employeeID = 'Id error';
    }
    if(employeeEmail.trim() === ''){
      alert("Missing Email Field");
      error.employeeEmail = 'Missing Email Field';
    }else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(employeeEmail)) {
      alert("Wrong Email ID")
      setEmployeeEmail('');
      error.employeeEmail = 'Invalid email address';
    }
    if(employeePhone.length != 10){
      alert("Phone Number Should be atleast 10 Numbers");
      setEmployeePhone('');
      error.employeePhone='Invalid Phone Number';
    }
    setErrors(error);
    return Object.keys(error).length === 0;
  }
  async function Submit(){
      
    try {
      if(validateInputs()){
        console.log("entered")
        await axios.post(api_base + '/employee', {
          EmployeeName: employeeName,
          EmployeeID: employeeID,
          EmployeeEmail:employeeEmail,
          EmployeePhone:employeePhone,
          Error:errors
        }).then((res)=>{
          console.log("response")
          if(res.status===201){
            alert("Employee Data Saved Successfully");
            setEmployeename('');
            setEmployeeID('');
            setEmployeeEmail('');
            setEmployeePhone('');
          }
        })
      }else{
        const error={};
        setErrors(error);

      }
    }catch(error){
      alert("EMployee Data Is Invalid")
    }
  }
  
 

  
  return (
    <div className='employ'>
         <header className='employee-dashboard'>
                <div className='h1-text'>
                    <div>
                    <h1 id='dashboard-text'>Employee Dashboard</h1>
                    </div>
                </div>
                <div>
                    <img src={logo} alt='logo'/>
                </div>
            </header>
      
    <div className='employee'>
        <div className='employee-form'>
            
              <div className="employee-align">
            
                
                <div className='text'>
                  <h3><b>Register New Employee</b></h3>
                </div>
              <div className='employee-name'>
                {/* <label htmlFor='employee-name'>EmployeeName:</label><br/> */}
                <input type='text'onChange={(e)=>setEmployeename(e.target.value)} placeholder='Employee Name' required={true} value={employeeName}/>
              </div>
            
              <div className='employee-id'>
                {/* <label htmlFor='employee-id'>EmployeeID:</label><br/> */}
                <input type='text'onChange={(e)=>setEmployeeID(e.target.value)}placeholder='EmployeeID'required={true} value={employeeID}/>
              </div>
            
              <div className='employee-email'>
                {/* <label htmlFor='employee-email'>Email.ID:</label><br/> */}
                <input type='text'onChange={(e)=>setEmployeeEmail(e.target.value)}placeholder='Employee Email'required={true} value={employeeEmail}/>
              </div>
            
              <div className='employee-phone'>
                {/* <label htmlFor='employee-phone'>Phone.Number:</label><br/> */}
                <input type='tel'onChange={(e)=>setEmployeePhone(e.target.value)}placeholder='Employee Phone'required={true} value={employeePhone}/>
              </div>
              
              <div className='button' >
               
                  <button id='btn'><Link className="link" to="/">Back</Link></button>
                  <button className='btn-submit'id='btn'onClick={Submit}>Submit</button>
                
              </div>  
            </div>
             
            </div>
        
       
            </div>  
    </div>
  );
}

export default Create;
