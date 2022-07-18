import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faUser, faEnvelope, faLock, faCakeCandles } from '@fortawesome/free-solid-svg-icons';
import './useForm.scss'
import axios from 'axios';
import { useEffect } from 'react';

const UserForm = ({getUsers, selectedUser, deselectUser}) => {

  const [firstName , setFirstName] = useState ("")
  const [lastName, setLastName] = useState ("")
  const [email, setEmail] = useState ("")
  const [password, setPassword] = useState ("")
  const [birthday, setBirthday] = useState ("")

  const submit = e => {
    e.preventDefault()
    alert(selectedUser !== null? "Actualizando" : "Usuario Registrado")

    const newUser = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      birthday: birthday,
      password: password
    }

    //console.log(newUser);

    if (selectedUser !== null) {
      axios.put (`https://users-crud1.herokuapp.com/users/${selectedUser.id}/`, newUser)
      .then ( () => {
        getUsers()
        reset ()
        deselectUser ()} )
    } else {
      axios.post ('https://users-crud1.herokuapp.com/users/', newUser)
      .then ( () => {
        getUsers ()
        reset ()} )
      .catch ( error => console.log( error.response) )
    }
    
  }

  useEffect (() => {
    if (selectedUser !== null) {
      setFirstName (selectedUser.first_name)
      setLastName (selectedUser.last_name)
      setEmail (selectedUser.email)
      setPassword (selectedUser.password)
      setBirthday (selectedUser.birthday)
    }},[selectedUser] )

  const reset = () => {
    setFirstName ("")
    setLastName ("")
    setEmail ("")
    setPassword ("")
    setBirthday ("")
  }

  const [show, setShow] = useState(true)
  

  return (
    <form onSubmit={submit} className='user-form'>
      <h1>New User</h1>

      <div className='input-container full-name'>
          <label htmlFor="name">
            <FontAwesomeIcon icon={faUser}/>
          </label>
          <input type="text" value={firstName} onChange={ e => setFirstName (e.target.value)} placeholder="First name" className='input-name'/>
          <input type="text" id='name' value={lastName} onChange={ e => setLastName (e.target.value) } placeholder="Last name" className='input-name'/>
      </div>

      <div className='input-container'>
        <label htmlFor="email">
          <FontAwesomeIcon icon={faEnvelope}/>
        </label>
        <input type="email" id='email' value={email} onChange={ e => setEmail (e.target.value) } required placeholder='Email'/>
      </div>

      <div className='input-container password'>
        <label htmlFor="password">
          <FontAwesomeIcon icon={faLock}/>
        </label>
        <div className='password-input'>
          <input type={ show? "password" : "text" } id='password' value={password} onChange={ e => setPassword (e.target.value) } placeholder='Password' required /> 
          <FontAwesomeIcon icon={faEyeSlash} onClick={ () => setShow ( !show ) }/>
        </div>
      </div>

      <div className='input-container'>
        <label htmlFor="birthday">
          <FontAwesomeIcon icon={faCakeCandles}/>
        </label>
        <input type="date" id='birthday' value={birthday} onChange={ e => setBirthday (e.target.value) } />
      </div>

      <div className='add-user-button'>
      <button type='submit'>{ selectedUser !== null? "Update" : "Add User"}</button>

      </div>

    </form>
  );
};

export default UserForm;