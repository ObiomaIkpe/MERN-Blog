import { Sidebar } from 'flowbite-react'
import {HiUser, HiArrowSmRight, HiDocumentText} from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {  useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


function DashSidebar() {
  const location = useLocation();
  const { currentUser} = useSelector((state) => state.user)
  const [tab, setTab] = useState('')
  const dispatch = useDispatch();


  const handleSignOut = async () => {
    try {
      const res = await fetch('/api/user/sign-out',
      {
            method: 'POST'
        })
        
        const data = await res.json();
        if (!res.ok){
            console.log(data.message);
            dispatch(signOutFailure(data.message))
        }else{
            dispatch(signOutSuccess())
        }
    } catch (error) {
        dispatch(signOutFailure(error.message))
        console.log(error.message)
    }
  }
  
  

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    console.log(tabFromUrl)
    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
  }, [location.search])

  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col gap-1'>

            <Link to='/dashboard?tab=profile' >
            <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={'User'} labelColor='dark' as='div'>
                Profile
            </Sidebar.Item>
            </Link>

            <Link to='/dashboard?tab=posts' >
            <Sidebar.Item active={tab === 'posts'} icon={HiDocumentText} label={currentUser.isAdmin ? 'Admin' : 'user'} labelColor='dark' as='div'>
                Posts
            </Sidebar.Item>
            </Link>

            <Sidebar.Item active icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignOut}>
                sign out
            </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar
