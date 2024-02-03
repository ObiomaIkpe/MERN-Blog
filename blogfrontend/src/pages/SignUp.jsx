import { Button, Label, TextInput, Alert, Spinner } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();



const handleChange = (e) => {
  setFormData({...formData, [e.target.id]: e.target.value.trim() })
}
console.log(formData);

const handleClick = () => {
  setTimeout(() => {
    console.log('clicked')
    setLoading(true)
  }, 6000)
}

const handleSubmit = async (e) => {
e.preventDefault();
if (!formData.username || !formData.password || !formData.email){
return setErrorMessage('please fill out all form fields!')
}
try {
  setLoading(true);
  setErrorMessage(null)
  const res = await fetch('/api/auth/sign-up', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(formData),    
  });
  
  const data = await res.json();
  if (data.success === false) {
    return setErrorMessage('something went wrong, try again!')
  }
  setLoading(false);
  if (res.ok){
    navigate('/sign-in')
  }
  console.log(data);
} catch (err) {
  setErrorMessage(err.message);
  setLoading(false)
}
}






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
            <div className=''>
              <Label value='your username' />
              <TextInput 
              type='text'
              placeholder='username'            
              id='username' onChange={handleChange}/>
            </div>

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
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading} onClick={handleClick}>
              { loading ? (
               <>
               <Spinner size='sm' /><span className='pl-3'>Loading...</span>
               </>
              ): 'Sign Up'}
            </Button>
          </form>
          <div className='flex flex-row gap-4 text-sm mt-5'>
            <span className=''>Have an Account?</span>
            <Link to='/sign-in' className='text-blue-500'>Sign In</Link>
            { errorMessage && (
              <Alert className='mt-5' color='failure'>{errorMessage}</Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp