import { Alert, Button, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {app} from '../firebase'
import {getDownloadURL, getStorage, uploadBytesResumable, ref}from 'firebase/storage'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function DashProfile() {
    const {currentUser} = useSelector(state => state.user)
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(0);
    const [imageFileUploadError, setImageFileUploadError] = useState(false);
    const filePickerRef = useRef();

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file){
            setImageFile(e.target.files[0]);
            setImageFileUrl((URL.createObjectURL(file)))
        }
    }
    //console.log(imageUrl, imageFileUrl)

    useEffect(() => {
        if(imageFile){
            uploadImage()
        }
    }, [imageFile]);

const uploadImage = () => {
    setImageFileUploadError(null)
    const storage = getStorage(app);
    const filename = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, imageFile)

    uploadTask.on(
        'state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred) /snapshot.totalBytes * 100;
            setImageFileUploadProgress(progress.toFixed(0))
            console.log(imageFileUploadProgress)
        },
        (error) => {
            setImageFileUploadError('could not upload image (file must be less than 2mb')
            setImageFileUploadProgress(null)
            setImageFile(null)
            setImageFileUrl(null)
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downLoadURL) => {
                setImageFileUrl(downLoadURL)
            })
        }
    )

}


  return (
    <div className='max-w-lg p-3 mx-auto w-full'>
        <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
        <form className='flex flex-col gap-4'>
            <input type='file' accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden/>

            <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' onClick={() => filePickerRef.current.click()}>

                {imageFileUploadProgress && (
                    <CircularProgressbar value={imageFileUploadProgress || 0} text={`${imageFileUploadProgress}%`} 
                    strokeWidth={5}
                    styles={{
                        root: {
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            top: 0,
                            left: 0
                        },
                        path: {
                            stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})`
                        }
                    }}/>
                )}

            <img src={imageFileUrl || currentUser.profilePicture} alt='user'
            className={`rounded-full w-full h-full object-cover  border-8 border-[lightgray] ${imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60'}`} />
            </div>

            { imageFileUploadError && (
                <Alert color='failure'>
                    {imageFileUploadError}
                </Alert>
            )}
            

            <TextInput type='text' placeholder='username'defaultValue={currentUser.username} id='username'/>
            <TextInput type='email' placeholder='yourmail@gmail.com'defaultValue={currentUser.email} id='email'/>
            <TextInput type='password' placeholder='password' id='password' />

            <Button 
            type='button' 
            gradientDuoTone='purpleToBlue' 
            outline>
                Update
            </Button>
        </form>
        <div className='text-red-500 flex justify-between mt-5'>
            <span className='cursor-pointer'>Delete Account</span>
            <span className='cursor-pointer'>Sign Out</span>
        </div>
    </div>
  )
}

export default DashProfile