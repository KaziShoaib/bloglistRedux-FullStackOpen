//these tests have not been modified for redux controls

//test command -> set CI=true && npm test
//test coverage -> set CI=true && npm test -- --coverage
//report can be found on coverage/lcov-report


import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';


describe('tests for <Blog/>', () => {


  let component;
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
  const addLike = jest.fn();


  beforeEach(() => {
    component = render(
      <Blog blog={testBlog} addLike={addLike}/>
    );
  });


  test('initially displays title, author but not url and likes', () => {
    const summaryDiv = component.container.querySelector('.blogSummary');
    const detailDiv = component.container.querySelector('.blogDetail');
    expect(summaryDiv).not.toHaveStyle('display : none');
    expect(detailDiv).toHaveStyle('display : none');
  });


  test('url, likes are displayed when the view button is clicked', () => {
    const summaryDiv = component.container.querySelector('.blogSummary');
    const detailDiv = component.container.querySelector('.blogDetail');

    const viewButton = component.getByText('view');
    fireEvent.click(viewButton);

    expect(summaryDiv).toHaveStyle('display : none');
    expect(detailDiv).not.toHaveStyle('display : none');
  });


  test('if the like button is clicked twice, the event handler is also clicked twice', () => {
    const likeButton = component.getByText('Like');
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);
    expect(addLike.mock.calls).toHaveLength(2);
  });
});