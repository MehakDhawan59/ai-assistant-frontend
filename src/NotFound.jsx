import React from 'react'

const NotFound = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen gap-4'>

        <h5>404 Page Not Found</h5>
        <button onClick={()=>window.location.href="/"} className='cursor-pointer px-3 py-2 bg-blue-500 text-white hover:bg-blue-700 rounded-md'>Go Back To Home Page</button>
    </div>
  )
}

export default NotFound