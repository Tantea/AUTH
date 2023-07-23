import {useState} from 'react'
import { Link } from 'react-router-dom'
import './forms.css'
import {signInWithEmailAndPassword, sendEmailVerification} from 'firebase/auth'
import {auth} from './firebase'
import {useNavigate} from 'react-router-dom'
import {useAuthValue} from './AuthContext'
import TextField from "@mui/material/TextField"; 
import Button from "@mui/material/Button";  
import SendIcon from '@mui/icons-material/Send';
import FavoriteBorderTwoToneIcon from '@mui/icons-material/FavoriteBorderTwoTone';

function Login(){

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('') 
  const [error, setError] = useState('')
  const {setTimeActive} = useAuthValue()
  const navigate = useNavigate()

  const login = e => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      if(!auth.currentUser.emailVerified) {
        sendEmailVerification(auth.currentUser)
        .then(() => {
          setTimeActive(true)
          navigate('/verify-email')
        })
      .catch(err => alert(err.message))
    }else{
      navigate('/')
    }
    })
    .catch(err => setError(err.message))
  }

  return(
    <div className='center'>
      <div className='auth'>
        <h1>Log in</h1>
        {error && <div className='auth__error'>{error}</div>}
        <form onSubmit={login} name='login_form'>
        
        <TextField 
            id="outlined-basic" 
            label="Email" 
            variant="outlined"
            type='email' 
            value={email}
            placeholder="Email"
            required
            onChange={e => setEmail(e.target.value)}/> 

        <TextField 
            id="outlined-basic" 
            label="Password" 
            variant="outlined"
            type='password'
            value={password} 
            required
            placeholder='Enter your password'
            onChange={e => setPassword(e.target.value)} />  

        <Button type='submit' variant="outlined"  endIcon={<SendIcon />}>Login</Button> 
        
        </form>
        <div className='bottom-info'>
          <span>Don't have and account? </span>
          <Link to='/register'>Create one here</Link>
        </div>
      </div>
      <a href="https://www.linkedin.com/in/tatiana-dubrovskaya-66118827a"  className='with-love' target='_blank'><label>Tantea with </label><FavoriteBorderTwoToneIcon /></a>
    </div>
  )
}

export default Login