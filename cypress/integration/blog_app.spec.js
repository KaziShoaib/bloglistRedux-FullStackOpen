//to run the tests run the cypress script defined in the package.json file

//it is advised not to use arrow functions here

//this is a custom command that logs in a user
//by directly sending post request to the backend
//the command also saves the token and other login data
//returned by the login router in the windows local storage
//then reloads the page
Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', { username, password })
    .then(({ body }) => {
      localStorage.setItem('loggedBlogappUser', JSON.stringify(body));
      cy.visit('http://localhost:3000');
    });
});

//this is another custom command that will post a blog
//by directly sending a POST request to the backend
//the command uses the token saved in the windows local storage during login to
//create a bearer token that is sent as a part of the Authorization header
//then the page is reloaded
Cypress.Commands.add('createBlog', ({ title, author, url, likes } ) => {
  cy.request({
    url:'http://localhost:3001/api/blogs',
    method:'POST',
    body:{ title, author, url, likes },
    headers: { 'Authorization' : `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}` }
  });
  cy.visit('http://localhost:3000');
});


describe('Blog App', function(){
  beforeEach(function(){
    //sending post request to the backend for removing all users
    //and blogs from the test database
    cy.request('POST','http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    };
    //sending post request to the backend for adding a new user
    cy.request('POST','http://localhost:3001/api/users', user);
    cy.visit('http://localhost:3000');
  });


  it('log in form is shown', function(){
    cy.contains('Log in to application');
    cy.get('button').contains('Log in');
  });


  it('user can log in', function(){
    cy.get('#username').type('mluukkai');
    cy.get('#password').type('salainen');
    cy.get('#login-button').click();
    cy.contains('Matti Luukkainen logged in');
  });


  it('fails to log in with wrong credentials', function(){
    cy.get('#username').type('mluukkai');
    cy.get('#password').type('wrong');
    cy.get('#login-button').click();

    cy.get('.error')
      .should('contain', 'Invalid username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid');

    cy.get('html').should('not.contain', 'Matti Luukkainen logged in');
  });


  //this describe block is inside the outer describe block
  describe('when logged in', function(){
    beforeEach(function(){
      //we are using the cypress custom command defined above
      cy.login({ username:'mluukkai', password:'salainen' });
    });


    it('a blog can be created', function(){
      cy.contains('Add a Blog').click();

      cy.get('#title').type('How To Work With Singletons in JavaScript');
      cy.get('#author').type('Vijay Prasanna');
      cy.get('#url').type('https://www.digitalocean.com/community/tutorials/js-js-singletons');
      cy.get('#submit-blog-button').click();

      cy.contains('How To Work With Singletons in JavaScript');
      cy.contains('Vijay Prasanna');
    });


    //this describe block is inside the two outer describe blogs
    describe('and there is already one blog', function(){

      const newBlog = {
        title:'How To Create a Fade-In Page Transition Effect with JavaScript and CSS',
        author:'Alligator.io',
        url:'https://www.digitalocean.com/community/tutorials/js-simple-page-fade-in',
        likes:5
      };

      beforeEach(function(){
        cy.createBlog(newBlog);
      });


      it('like can be incresed by clikcing like button', function(){
        cy.get('.view-button').click();
        cy.get('.like-button').click();
        cy.get('.like-count').should('not.contain','5');
        cy.get('.like-count').should('contain','6');
      });


      it('a blog can be deleted by it\'s creator', function(){
        cy.get('.view-button').click();
        cy.get('.delete-button').click();
        cy.on('window:confirm', () => true);
        cy.get('.blog').should('not.exist');
      });


      it('a blog cannot be deleted by anyone else', function(){
        cy.contains('Log out').click();
        const newUser = {
          name:'ada lovelace',
          username:'alovelace',
          password: 'sekret'
        };
        cy.request('POST', 'http://localhost:3001/api/users', newUser);
        cy.login({ username: newUser.username, password:newUser.password });
        cy.get('.view-button').click();
        cy.get('.delete-button').should('have.css', 'display', 'none');
      });
    });


    describe('and there are multiple blogs', function(){
      beforeEach(function(){
        cy.createBlog({ title:'blog1', author:'author1', url:'url_1', likes:8 });
        cy.createBlog({ title:'blog2', author:'author2', url:'url_2', likes:15 });
        cy.createBlog({ title:'blog3', author:'author3', url:'url_3', likes:10 });
      });


      it('blogs can be sorted by likes in decreasing order', function(){
        cy.get('.view-button').click({ multiple: true });
        cy.get('#sort-button').click();
        cy.get('.blogDetail').then(blogs => {
          cy.wrap(blogs[0]).contains('Likes 15');
          cy.wrap(blogs[1]).contains('Likes 10');
          cy.wrap(blogs[2]).contains('Likes 8');
        });
      });
    });
  });
});