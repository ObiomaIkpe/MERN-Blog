import { Link } from 'react-router-dom'
import CallToAction from '../components/CallToAction'
import { useEffect, useState } from 'react';
import Postcard from '../components/Postcard';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts)
    }
    fetchPosts()
  }, [])
  return (
    <div>
      <div className='flex flex-col gap-6 px-3 p-28 max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold lg:text-6xl'>welcome to my blog</h1>
        <p className='text-gray-500 text-xs sm:text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque pariatur quo doloribus quam recusandae, voluptatum exercitationem obcaecati perferendis blanditiis quasi. Voluptatibus ad culpa tenetur rerum illo consectetur ex cumque animi?</p>
      <Link to='/search' className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'>
        View all posts.
      </Link>
      </div>

      <div className='p-3 bg-amber-100 dark:bg-slate-700'>
        
      </div>
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {
          posts && posts.length > 0 && (
            <div className='flex flex-col gap-6'>
              <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
              <div className='flex flex-wrap gap-4'>
                  {
                    posts.map((post) => (
                      <Postcard key={post._id} post={post}/>
                    ))
                  }
              </div>
              <div>
                <Link to='/search' className='text-lg text-teal-500 hover:underline text-center'>View all posts</Link>
              </div>
            </div>
          )}
          <CallToAction />
      </div>
    </div>
  )}

export default Home