//these tests have not been modified for redux controls

//test command -> set CI=true && npm test
//test coverage -> set CI=true && npm test -- --coverage
//report can be found on coverage/lcov-report

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BlogForm from './BlogForm';


test('<BlogForm/> calls the event handler function onSubmit with correct data', () => {
  const testBlog = {
    title:'How to Build an Autocomplete Component in React',
    author:'joshtronic',
    url:'https://www.digitalocean.com/community/tutorials/react-react-autocomplete',
    likes:9,
    user: {
      name:'super user',
      username:'root',
      id: 'is1i923ie24942loswe93002'
    }
  };

  const addBlog = jest.fn();

  const component = render(<BlogForm addBlog={addBlog}/>);

  const form = component.container.querySelector('form');

  const title = component.container.querySelector('#title');
  const author = component.container.querySelector('#author');
  const url = component.container.querySelector('#url');

  fireEvent.change(title, { target : { value : testBlog.title } });
  fireEvent.change(author, { target : { value : testBlog.author } });
  fireEvent.change(url, { target : { value : testBlog.url } });

  fireEvent.submit(form);

  expect(addBlog.mock.calls).toHaveLength(1);
  expect(addBlog.mock.calls[0][0].title).toBe(testBlog.title);
  expect(addBlog.mock.calls[0][0].author).toBe(testBlog.author);
  expect(addBlog.mock.calls[0][0].url).toBe(testBlog.url);
});