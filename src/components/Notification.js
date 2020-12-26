import React from 'react'
import '../index.css'

const Notification = ({successMessage, errorMessage}) => {
  if(successMessage){
    return (
      <div className='success'>
        {successMessage}
      </div>
    )
  }
  if(errorMessage){
    return (
      <div className='error'>
        {errorMessage}
      </div>
    )
  }
  return null;
}

export default Notification