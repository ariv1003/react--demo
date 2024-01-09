import React from 'react'

function App() {
  return (
    <>
      <div className='bg-[#D6D6D6] w-screen h-screen flex justify-center items-center'>
        <div className='flex-col items-center'>
          <h1 className='text-4xl	font-bold text-[#224957] text-center'>Sign In</h1>
          <p className='text-base	font-regular mt-8'>Sign in and start managing your candidates!</p>
          <div className='mt-6'>
            <label for="first_name" className="block mb-2 text-sm font-medium text-black">Username</label>
            <input type="text" id="first_name" className="bg-[#224957] border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter your username" required />
          </div>
          <div className='mt-6'>
            <label for="first_name" className="block mb-2 text-sm font-medium text-black">Password</label>
            <input type="text" id="first_name" className="bg-[#224957] border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter your password" required />
          </div>
          <button className='bg-[#20DF7F] w-full mt-8 py-3 font-semibold text-sm rounded-lg'>Login</button>
        </div>
      </div>
    </>
  )
}

export default App