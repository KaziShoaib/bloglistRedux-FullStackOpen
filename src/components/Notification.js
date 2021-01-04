import React from 'react';
import { useSelector } from 'react-redux';
import '../index.css';

const Notification = () => {
  const { successMessage, errorMessage } = useSelector(state => state.notifications);
  if(successMessage){
    return (
      <div className='success'>
        {successMessage}
      </div>
    );
  }
  if(errorMessage){
    return (
      <div className='error'>
        {errorMessage}
      </div>
    );
  }
  return null;
};

export default Notification;