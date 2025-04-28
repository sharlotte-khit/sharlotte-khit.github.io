import React from 'react'
import "./Loader.css"
import { FaSpinner } from 'react-icons/fa'

const Loader = () => {
  return (
    <div className='loader'>
      <div className='loader-content'>
        <FaSpinner className='spinner-icon' />
        <p className='loading-text'>Loading books...</p>
      </div>
    </div>
  )
}

export default Loader