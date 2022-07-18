import React from 'react';
import './userList.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const UserList = ({ users, getUsers, editUser }) => {

   const deleteUser = (id) => {
      alert("Eliminado Usuario")
      axios.delete (`https://users-crud1.herokuapp.com/users/${id}`)
      .then (getUsers)
      .catch ( error => console.log(error.response) )
   }

   return (
      <ul>
         <h1>User List</h1>
         {users.map(user => (
            <li key={user.id} className="user-list">
               <div className='user-data'>
                  <div className='full-name'> {user.fisrt_name} {user.last_name}</div>
                  <div className='email'>{user.email}</div>
                  <p className='birthday'>{user.birthday}</p>
               </div>
               <div className='icon-delete-edit'>
                  <FontAwesomeIcon icon={faTrash} className="icon-trash" onClick={ () => deleteUser(user.id)}/>
                  <FontAwesomeIcon icon={faPencil} onClick={ () => editUser(user) }/>
               </div>
            </li>
         ))
         }
      </ul>
   );
};

export default UserList;