import React from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';
//import '../index.css';

const Notification = () => {
  const { successMessage, errorMessage } = useSelector(state => state.notifications);
  if(successMessage){
    return (
      <Alert variant='success'>
        {successMessage}
      </Alert>
    );
  }
  if(errorMessage){
    return (
      <Alert variant='danger'>
        {errorMessage}
      </Alert>
    );
  }
  return null;
};

export default Notification;