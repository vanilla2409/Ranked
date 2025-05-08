import { useState } from 'react'

function App() {
  const [backendMessage, setBackendMessage] = useState('')
  const backendConnect = () => {
    fetch('/api/test', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      setBackendMessage(data.message)
    })
  }
  return (
    <>
      <div className='flex flex-col items-center p-10 h-screen bg-gray-900'>
        <h1 className='text-5xl text-amber-600 font-bold'>Ranked frontend</h1>
        <button
          className='bg-amber-600 text-white px-4 py-2 rounded mt-5'
          onClick={backendConnect}
        >
          Test backend
        </button>
        <div className='text-white text-2xl mt-5'>
          {backendMessage}
        </div>
      </div>
    </>
  )
}

export default App
