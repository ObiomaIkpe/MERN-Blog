import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

function SignUp() {
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
          <form className='flex flex-col gap-4'>
            <div className=''>
              <Label value='your username' />
              <TextInput 
              type='text'
              placeholder='username'            
              id='username' />
            </div>

            <div className=''>
              <Label value='your email' />
              <TextInput 
              type='text'
              placeholder='yourmail@gmail.com'            
              id='email' />
            </div>

            <div className=''>
              <Label value='your password' />
              <TextInput 
              type='text'
              placeholder='password'            
              id='password' />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit'>Sign Up</Button>
          </form>
          <div className='flex flex-row gap-4 text-sm mt-5'>
            <span className=''>Have an Account?</span>
            <Link to='/sign-in' className='text-blue-500'>Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp