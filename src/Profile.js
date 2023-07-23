import './profile.css'
import {useAuthValue} from './AuthContext'
import { signOut } from 'firebase/auth' 
import { auth } from './firebase'
import Button from "@mui/material/Button";  
import Logout  from '@mui/icons-material/Logout'; 



function Profile() {
  const {currentUser} = useAuthValue()
  console.log(`currentUser profile ${auth.currentUser.uid}`)

  return (
      <div className='center'>
        <div className='profile'>
          <h1>Profile</h1>   
          <div className='row'><span>Name: </span>{`${currentUser?.displayName.split(',')[0]}`}</div>
          <div className='row'><span>Username: </span>{`${currentUser?.displayName.substring(currentUser?.displayName.indexOf(', ') + 2, currentUser?.displayName.lastIndexOf('|'))}`}</div>
          <div className='row'><span>Country: </span>{`${currentUser?.displayName.substring(currentUser?.displayName.indexOf('| ') + 1, currentUser?.displayName.lastIndexOf('.'))}`}</div>
          <div className='row'><span>Email: </span>{currentUser?.email}</div>
          <div className='row'>
            <span>Email verified: </span>
            {`${currentUser?.emailVerified}`}
          </div>
          <Button onClick={() => signOut(auth)} variant="outlined"  endIcon={<Logout />}>Sign Out</Button>  
         </div>
      </div>
  )
}

export default Profile
