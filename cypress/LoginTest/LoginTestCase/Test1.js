describe('User Authentication and Actions on web page', () => {

  beforeEach(() => {
    cy.restoreLocalStorage();
  });
  
  afterEach(() => {
    cy.saveLocalStorage();
    
    });

  it('user should not move to Login page if username and password are not entered',()=>
  {
     //user should not move to Login page if username and password are not entered
    cy.visit('https://gayathribalaji1609.github.io/EmptyRepo/');
    cy.get('.login-btn').click();
    cy.get('#error').should('be.visible').contains("Please enter username and password");

  });

  it('verify login is unsuccessfull and redirect to Signup Page to create new account and login with correct credentials', () => {

  //The user should be redirected to the signin page if not authenticated
  cy.visit('https://gayathribalaji1609.github.io/EmptyRepo/'); 
   
  // Interact with the login form with incorrect credentials
  cy.get('#username').type('invalid_username@gmail.com');
  cy.get('#password').type('invalid_password');
  cy.get('.login-btn').click();


  // Verify that there is an error message indicating unsuccessful login)
  cy.get('#error').should('be.visible');
  cy.get('#error').then(($errorMessage) => {

  if ($errorMessage.is(':visible')) {

// Login unsuccessful, navigate to the sign-up page

  cy.log('Login unsuccessful, navigating to sign-up page');
  cy.get('.create-account-btn').click();

// user landed up to Sign up Page
  cy.title('/body > form').should('include', 'Signup');

//Enter username
  
  cy.get('#username').type('Gayathri');

//Enter email
  cy.get('#email').type('Gayathri@gmail.com');

  cy.get('#email').invoke('val').then(email => {
  cy.log('Email:', email);
  });

//Enter password
  cy.get('#password').type('123');

  cy.get('#password').invoke('val').then(password => {
  cy.log('Password:', password);
  });
  
//Click on Signup button

  cy.get('.signup-btn').click();

//if Successfull sign up, display Sign up sucessfull
  cy.get('#error').invoke('text').should('eq', 'Signup successful!');

//click on back to login button and verify user redirect to  login page
cy.get('.login-btn').click();
  
};
  });
});

  it('verify login is successfull and user landed into webpage',()=>{

  cy.visit('https://gayathribalaji1609.github.io/EmptyRepo/'); 
   
  cy.title('/body > form > h2').should('include', 'Login');

  //enter email & password which user created in signup page
  cy.get('#username').type('Gayathri@gmail.com');
  cy.get('#password').type('123');

  //click login button in login page
  cy.get('.login-btn').click();

 
  //  After login condition is successfull , user should Navigate to the Cypress Automation Testing page and edit an item
cy.title().then((pageTitle) => {
    
    cy.log('Page Title:', pageTitle);

    
    expect(pageTitle).to.include('Cypress Automation Testing Practice Page');
  });
});

it('Verify fields are editable on webpage', () => {


  cy.visit('https://gayathribalaji1609.github.io/EmptyRepo/'); 
   
  cy.title('/body > form > h2').should('include', 'Login');

  //enter email & password which user created in signup page
  cy.get('#username').type('Gayathri@gmail.com');
  cy.get('#password').type('123');

  //click login button in login page
  cy.get('.login-btn').click();


// Populate Username Field
cy.get('#dataInput').type('Gayathri');

//The user should be able to edit UserName field present on 'Cypress Automation Testing Practice Page'

cy.get('#dataInput').clear().type('New Item Name');

//Click on Save button present behind Username field.The user should be able to save the changes.
cy.get('body > div > button:nth-child(4)').click();

// Click on the currently edited item to ensure the changes were saved.updated Username field value saved.
let expectedUserName="New Item Name";
cy.get("#para > p").then((x)=>{
  let actualUserName=x.text();
  expect(actualUserName).to.equal(expectedUserName)
})

// After value got saved ,display success message
let expectedSuccessmessage1="Value saved successfully!";
cy.get("#successMessage1").then((y)=>{
  let actualSuccessmessage1=y.text();
  expect(actualSuccessmessage1).to.equal(expectedSuccessmessage1)
});


// Initially, the submit button should be disabled for 'Add Item' field
cy.get('#addItemBtn').should('be.disabled');

// Type a name into the name field
cy.get('#item').type('John Doe');

// Now, the submit button should be enabled
cy.get('#addItemBtn').should('not.be.disabled');

// Clear the name field
cy.get('#item').clear();

// Now, the submit button should be disabled again
cy.get('#addItemBtn').should('be.disabled');



//populate 'Add Item' List Field

cy.get('#item').click();

cy.get('#item').type('ListItem1');

//Save Added Item
// user should able to add an item in 'Add Item' field value 

let fieldvalue;
cy.get('#item').then(($input)=>{
fieldvalue=$input.val();

});
cy.log(fieldvalue);
// Click on Submit to save the value entered in Add Item list
cy.get('#addItemBtn').click();

//user getting successfull message for adding item

let expectedSuccessmessage2="Item successfully added: ListItem1";
cy.get("#successMessage").then((z)=>{
  let actualSuccessmessage2=z.text();
  expect(actualSuccessmessage2).to.equal(expectedSuccessmessage2)
});

// Attempt to edit an Add Item List field with an existing name
cy.get('#item').type('ListItem1');

// Click on Submit 
cy.get('#addItemBtn').click();

//items will not saved as the user entered existing item in list and user will get alert message
cy.on('window:alert',(t)=>{
  //assertions
  expect(t).to.contains('Item already exists: ListItem1');
});


//Edit an existing 'Add item' field and populate new value
cy.get('#item').clear();
cy.get('#item').type('ListItem2');
cy.get('#addItemBtn').click();

let expectedSuccessmessage3="Item successfully added: ListItem2";
cy.get("#successMessage").then((z)=>{
  let actualSuccessmessage3=z.text();
  expect(actualSuccessmessage3).to.equal(expectedSuccessmessage3)
});


// User should be able to click on an existing item and have the drawer open
// Open the 'Select Item' Dropdown item drawer
cy.get('#dropdown').should('exist');


//Edit the 'Select Item' Dropdown 

cy.get('#dropdown').select('Item 3');

// Save the edited item
cy.get('body > div > div:nth-child(8) > button').click();

// verify Success Message for saving field value
let expectedSuccessmessage4="Item successfully saved: Item 3";
cy.get("#dropdownsuccess").then((a)=>{
  let actualSuccessmessage4=a.text();
  expect(actualSuccessmessage4).to.equal(expectedSuccessmessage4)
});

//The user should be able to edit dropdown field

cy.get('#dropdown').select('Item 2');

//Click on currently edited item to ensure save changes
cy.get('#dropdown').should('have.value', 'Item 2');

//Click the Logout button and verify user able to logout successfully

cy.get('#logout').click();

// once user logged out , will landed into login page again

cy.title().should('include', 'Login');



});


  });
