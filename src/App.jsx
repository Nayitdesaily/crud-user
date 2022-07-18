import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.scss'
import UserForm from './components/UserForm'
import UserList from './components/UserList'


function App() {

const [users, setUsers] = useState ([])
const [selectedUser, setSelectedUser] = useState (null)

useEffect (() => {
  axios.get ('https://users-crud1.herokuapp.com/users/')
  .then ( res => setUsers ( res.data ) )
}, [] )

const getUsers = () => {
  axios.get ('https://users-crud1.herokuapp.com/users/')
  .then ( res => setUsers ( res.data ) )
}

console.log(users);

const editUser = (selectedUser) => {
  setSelectedUser (selectedUser)
}

const deselectUser = () => {
  setSelectedUser ( null )
}

  return (
    <div className="App">
      < UserForm 
        getUsers = {getUsers}
        selectedUser = {selectedUser}
        deselectUser = {deselectUser}
      />
      

      < UserList 
          users = {users}
          getUsers = {getUsers}
          editUser = {editUser}
      />
    </div>
  )
}

export default App
