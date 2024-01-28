import { Footer } from 'flowbite-react'
import React from 'react'
import { FaFacebook, FaGithub, FaRedditAlien, FaTwitter } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function FooterCom() {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
        <div className='w-full max-w-7xl mx-auto'>
            <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
                <div className=''>
                    <Link to='/'
                    className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
                    <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white text-4xl'>Aigo's Blog</span>
                    </Link>
                </div>
                <div className='grid grid-cols-2 gap-8 sm: mt-4 sm:grid-cols-3 sm:gap-6'>
                    
                    {/* links Div */}
                    <div>
                    <Footer.Title title='about' />
                    <Footer.LinkGroup col>
                        <Footer.Link href='#' target='_blank' rel='noopener noreferer'>
                            my blog
                        </Footer.Link>

                        <Footer.Link href='/about'>
                            about
                        </Footer.Link>

                        <Footer.Link href='/projects' target='_blank' rel='noopener noreferer'>
                            projects
                        </Footer.Link>
                    </Footer.LinkGroup>
                </div>
                    {/* socials Div */}
                <div>
                    <Footer.Title title='Follow me' />
                    <Footer.LinkGroup col>
                        <Footer.Link href='#' target='_blank' rel='noopener noreferer'>
                            github
                        </Footer.Link>

                        <Footer.Link href='/about'>
                            twitter
                        </Footer.Link>

                        <Footer.Link href='/projects' target='_blank' rel='noopener noreferer'>
                            reddit
                        </Footer.Link>
                    </Footer.LinkGroup>
                </div>
                    
                    {/* div Legals */}
                <div>
                    <Footer.Title title='Legal' />
                    <Footer.LinkGroup col>
                        <Footer.Link href='#'>
                            copyright
                        </Footer.Link>

                        <Footer.Link href='/about'>
                            privacy policy
                        </Footer.Link>

                        <Footer.Link href='/projects' target='_blank' rel='noopener noreferer'>
                         terms &amp; conditions
                        </Footer.Link>
                    </Footer.LinkGroup>
                </div>
            <Footer.Divider />

            <div className='w-full sm:flex sm:items-center sm:justify-center'>
                <Footer.Copyright href='#' by="Tommy" year={new Date().getFullYear()}/>
            </div>

            <div className='flex flex-row gap-3 sm:mt-0 md:mt-4 sm:justify-center'>
                <Footer.Icon  href='#' icon={FaFacebook}/>
                <Footer.Icon  href='#' icon={FaGithub}/>
                <Footer.Icon  href='#' icon={FaTwitter}/>
                <Footer.Icon  href='#' icon={FaRedditAlien}/>
            </div>

                </div>
            </div>
        </div>
    </Footer>
  )
}

export default FooterCom