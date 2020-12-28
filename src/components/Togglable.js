import React, { useState, useImperativeHandle } from 'react';
import '../index.css';

//we can use PropTypes to specify that
//the some of the prop elements must be provided from the parent element
//the App component in this case
import PropTypes from 'prop-types';

//the whole component is wrapped in a React.forwardRef function call
//because we want to access a function created here from outside
//i.e. from the app component
//the component also gets a ref from the app component
const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display : visible ? 'none' : '' };
  const showWhenVisible = { display : visible ? '' : 'none' };

  const toggleVisible = () => {
    setVisible(!visible);
  };

  //the useImperativeHandle function is making sure that the
  //toggleVisible function can be accessed from an outside component
  //i.e. from the App component
  //It is using the ref sent from the App component
  useImperativeHandle(ref, () => {
    return {
      toggleVisible
    };
  });

  return (
    //the props.children will render all the conponents inside the opening and
    //closing tag of the Togglable component
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisible}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisible}>Cancel</button>
      </div>
    </div>
  );
});


//we are declaring here that buttonLabel should be provided in the props
//and that it should be a string
//ther will be error in the console
//if buttonLabel is note sent in the props
Togglable.propTypes = {
  buttonLabel : PropTypes.string.isRequired
};

//this is necessary for eslint
//without this the Togglable component
//will note have any name
Togglable.displayName = 'Togglable';

export default Togglable;