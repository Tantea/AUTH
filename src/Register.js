import {useState} from 'react'
import './forms.css'
import {auth} from './firebase'
import {useNavigate, Link} from 'react-router-dom'
import {createUserWithEmailAndPassword, sendEmailVerification, updateProfile} from 'firebase/auth'
import {useAuthValue} from './AuthContext'  
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select"; 
import TextField from "@mui/material/TextField"; 
import Button from "@mui/material/Button";  
import Fingerprint  from '@mui/icons-material/Fingerprint';
import countries from "i18n-iso-countries";  
import customLocale from "./dropdown_Test.json"; 

function Register() {

  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userName, setUserName] = useState('') 
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const {setTimeActive} = useAuthValue()
  

  const [selectedCountry, setSelectedCountry] = useState("");

  const selectCountryHandler = (value) => setSelectedCountry(value);

  // Have to register the languages you want to use
  countries.registerLocale(customLocale); 

  // Returns an object not a list
  const countryObj = countries.getNames("en", { select: "official" });

  const countryArr = Object.entries(countryObj).map(([key, value]) => {
    return {
      label: value,
      value: key
    };
  });


  const validatePassword = () => {
    let isValid = true
    if (password !== '' && confirmPassword !== ''){
      if (password !== confirmPassword) {
        isValid = false
        setError('Passwords does not match')
      }
    }
    return isValid
  }  

  const register = e => {
    e.preventDefault()
    setError('')
    if(validatePassword()) { 
        createUserWithEmailAndPassword(auth, email, password) 
        .then(() => {
          
    console.log(`registrer ${auth.currentUser.uid}`)
   updateProfile(auth.currentUser, {
      displayName: firstName + ' ' + lastName + ', ' + userName + '| ' + selectedCountry + '.'
    });
    console.log(`currentUser profile updated  ${auth.currentUser.displayName}`) 


          sendEmailVerification(auth.currentUser)  
           
          .then(() => {
            setTimeActive(true)
            navigate('/verify-email')
          }).catch((err) => alert(err.message))
        })
        .catch(err => setError(err.message))
    }   

    setEmail('')
    setFirstName('')
    setLastName('')
    setUserName('')
    setSelectedCountry('')
    setPassword('')
    setConfirmPassword('')
  } 


  return (
    <div className='center'>
      <div className='auth'>
        <h1>Register</h1>
        {error && <div className='auth__error'>{error}</div>}
        <form onSubmit={register} name='registration_form'>  
          <TextField 
            id="outlined-basic" 
            label="First Name" 
            variant="outlined"
            value={firstName}
            placeholder="First Name"
            onChange={e => setFirstName(e.target.value)} />
 
          <TextField 
            id="outlined-basic" 
            label="Last Name" 
            variant="outlined"
            value={lastName}
            placeholder="Last Name"
            onChange={e => setLastName(e.target.value)} />

          <TextField 
            id="outlined-basic" 
            label="User Name" 
            variant="outlined"
            value={userName}
            placeholder="User Name"
            onChange={e => setUserName(e.target.value)} /> 
  
          <Select 
            value={selectedCountry}
            onChange={(e) => selectCountryHandler(e.target.value)}
          >
            {!!countryArr?.length &&
              countryArr.map(({ label, value }) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
          </Select>  

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
            

          <TextField 
            id="outlined-basic" 
            label="Confirm Password" 
            variant="outlined"
            type='password'
            value={confirmPassword} 
            required
            placeholder='Confirm password'
            onChange={e => setConfirmPassword(e.target.value)} />    
 
          <Button type='submit' variant="outlined"  endIcon={<Fingerprint />}>Register</Button> 

        </form> 
        
        <div className='bottom-info'>
          <span>Already have an account?  </span>
          <Link to='/login'>login</Link>
        </div>
      </div>
    </div>
  )
}

export default Register