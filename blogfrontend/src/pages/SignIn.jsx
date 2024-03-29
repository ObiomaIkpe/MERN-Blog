import { Button, Label, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Oauth from '../components/Oauth';

function SignIn() {
  const [formData, setFormData] = useState({});
  const [signinError, setsiginError] = useState(null)
  const {loading, error: errorMessage} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

const handleChange = (e) => {
  setFormData({...formData, [e.target.id]: e.target.value})
}
console.log(formData)

const handleSubmit = async (e) => {
e.preventDefault();

if(!formData.email || !formData.password){
  return dispatch(signInFailure('please fill out all fields!'))
}
try {
  dispatch(signInStart());
  const res = await fetch('/api/auth/sign-in', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(formData),    
  });
  const data = await res.json();

  if (data.success === false){
    setsiginError(data.message)
    dispatch(signInFailure(data.message))
  }
  
  if (res.ok){
    dispatch(signInSuccess(data));
    navigate('/');
  }
  console.log(data);
} catch (error) {
  dispatch(signInFailure(error.message))
  console.log(error)
}
};


return (
  <div className='min-h-screen mt-20'>
      
      
        {/* left side */}
        <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
            <div className='flex-1'>
        <Link to="/" className='font-bold dark:text-white text-4xl'>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white text-4xl'>Aigo's Blog</span>
      </Link>

      
      <p className='text-sm mt-5'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores facilis numquam deserunt pariatur vel rerum.
      </p>
        </div>
        {/* right side */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          {
          signinError && <p className='text-[#fff] text-sm mx-auto bg-red-500 p-3 rounded-lg'>{signinError}</p>
      }

            <div className=''>
              <Label value='your email' />
              <TextInput 
              type='email'
              placeholder='yourmail@gmail.com'            
              id='email' onChange={handleChange}/>
            </div>

            <div className=''>
              <Label value='your password' />
              <TextInput 
              type='password'
              placeholder='password'            
              id='password' onChange={handleChange}/>
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' >Sign In</Button>
            <Oauth /> 
          </form>
          <div className='flex flex-row gap-4 text-sm mt-5'>
            <span className=''>Don't have an Account?</span>
            <Link to='/sign-up' className='text-blue-500'>Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn