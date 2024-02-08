import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {getDownloadURL, getStorage, uploadBytesResumable, ref} from 'firebase/storage';
import {app} from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const CreatePost = () => {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({})

  const handleUploadImage = async () => {
    try {
      if (!file){
        setImageUploadError('please select an image')
        return;
      }
      setImageUploadError(null)
      const storage = getStorage(app);
      const filename = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, filename);
      const uploadTask = uploadBytesResumable(storageRef, file)
      //console.log('clicked')
      uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`upload is + ${progress} done`);
        setImageUploadProgress(progress.toFixed(0));

      }, (error) => {
        setImageUploadError('image upload failed');
        setImageUploadProgress(null);        
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUploadProgress(null);
          setImageUploadError(null);
          setFormData({ ...formData, image: downloadURL})
        })
      })
    
    } catch (error) {
      setImageUploadError('image upload failed');
      setImageUploadProgress(null)
    }
  }
  
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7'>Create a Post</h1>

      <form 
      action=''
      className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
        <TextInput 
        type='text'
        placeholder='Title'
        required
        id='title'
        className='flex-1'/>

        <Select>
          <option value="uncategorized">Select a category</option>
          <option value="javascript">Javascript</option>
          <option value="react">React</option>
          <option value="NextJs">NextJs</option>
        </Select>

        </div>

      <div 
      className='flex gap-4 items-center justify-between border-4 boder-teal-500 border-dotted p-3'>

<FileInput 
  type='file' 
  accept='image/*' 
  onChange={(e) => setFile(e.target.files[0])}/>

<Button 
type='button' 
gradientDuoTone='greenToBlue' 
size='sm'
outline 
onClick={handleUploadImage}
disabled={imageUploadProgress}>
  {
    imageUploadProgress ? <div className='w-16 h-16'>
      <CircularProgressbar value={imageUploadProgress} 
      text={`${imageUploadProgress || 0}%`} /> </div>: 'upload image'    
  }

  </Button> 
      </div>

{
  imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>
}
  {formData.image && (
    <img src={formData.image}
    alt='upload'
    className='w-full h-72 object-cover' />
  )}


    <ReactQuill theme="snow" 
    placeholder='write something...'
    className='h-72 mb-12'
    required
    />

    <Button 
    type='submit' 
    gradientDuoTone='greenToBlue'>
      Publish
    </Button>
  </form>
    </div>
  )
}

export default CreatePost
