import { Sidebar } from 'flowbite-react'
import {HiUser, HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiChartPie} from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {  useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { signOutSuccess, signOutFailure } from '../redux/user/userSlice';


function DashSidebar() {
  const location = useLocation();
  const { currentUser} = useSelector((state) => state.user)
  const [tab, setTab] = useState('')
  const dispatch = useDispatch();


  const handleSignOut = async () => {
    try {
      const res = await fetch('/api/user/signout',
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

          {
            currentUser && currentUser.isAdmin && (
              <Link to='/dashboard?tab=dash'>
                <Sidebar.Item
                active={tab === 'dash' || !tab}
                icon={HiChartPie}
                as='div'
                >
                  Dashboard
                </Sidebar.Item>
              </Link>
            )
          }

            <Link to='/dashboard?tab=profile' >
            <Sidebar.Item active={tab === 'profile'} icon={HiUser} 
            label={currentUser.isAdmin ? 'Admin' : 'User'} labelColor='dark' as='div'>
                Profile
            </Sidebar.Item>
            </Link>

          {currentUser.isAdmin && (
            <Link to='/dashboard?tab=posts' >
            <Sidebar.Item active={tab === 'posts'} icon={HiDocumentText} 
             as='div'>
                Posts
            </Sidebar.Item>
            </Link>
        )}

{currentUser.isAdmin && (
  <>
            <Link to='/dashboard?tab=users' >
            <Sidebar.Item active={tab === 'users'} icon={HiOutlineUserGroup} 
             as='div'>
                Users
            </Sidebar.Item>
            </Link>
        
         <Link to='/dashboard?tab=comments'>
                <Sidebar.Item
                  active={tab === 'comments'}
                  icon={HiAnnotation}
                  as='div'
                >
                  Comments
                </Sidebar.Item>
              </Link>
              </>
)}
            <Sidebar.Item 
            active 
            icon={HiArrowSmRight}
             className='cursor-pointer' 
             onClick={handleSignOut}>
                sign out
            </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar
