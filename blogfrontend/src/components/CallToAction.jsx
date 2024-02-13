import { Button } from 'flowbite-react'

const CallToAction = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div 
    className='flex-1'>
            <h2 className='text-2xl'>Want to learn more about javascript?</h2>
            <p className='text-gray-500 my-2'>Check out these resources with 100 js projects</p>
            <Button gradientDuoTone='blueToGreen' className='rounded-tl-xl rounded-bl-none'>Learn more 
            <a href='#' target='_blank' rel='noopener noreferrer'>100 js projects.</a></Button>
        </div>
            <div className='p-7 flex-1 justify-center flex flex-col'>
                <img src='https://codingartistweb.com/wp-content/uploads/2022/09/100-JS-Projects-Part-1-01.png' alt=''/>
            </div>
        
    </div>
  )
}

export default CallToAction