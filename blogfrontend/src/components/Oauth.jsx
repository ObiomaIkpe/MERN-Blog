import {Button} from 'flowbite-react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {signInSuccess} from '../redux/user/userSlice';

function Oauth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth(app);

    const handleGoogleClick = async () => {
      
        const provider = new GoogleAuthProvider();
        provider.setCustomParameter({prompt: 'select_account'})
        try {
          const resultsFromGoogle = await signInWithPopup(storage, auth);
          console.log(resultsFromGoogle);

          const res = await fetch('/api/auth/google', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
              name: resultsFromGoogle.user.displayName,
              email: resultsFromGoogle.user.email,
              googlePhotoUrl: resultsFromGoogle.user.photoURL
            })
          })
          const data = await res.json();
          if (res.ok){
            dispatch(signInSuccess(data));
            navigate('/');

          }
        } catch (error) {
          console.log(error)
        }
    }
  return (
    <Button 
    type="button" 
    gradientDuoTone='pinkToOrange' 
    outline
    onClick={handleGoogleClick}>
        <AiFillGoogleCircle className='w-6 h-6 mr-2' />
        Continue with google.
    </Button>
  )
}

export default Oauth
