/* eslint-disable padding-line-between-statements */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add(
  "attach_img",
  {
    prevSubject: "element",
  },
  (input, fileName, fileType) => {
    cy.fixture(fileName).then((content) => {
      const blob = Cypress.Blob.base64StringToBlob(content, fileType);
      const testFile = new File([blob], fileName);
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(testFile);
      input[0].files = dataTransfer.files;
      return input;
    });
  }
);

Cypress.Commands.add('login', (getUrl,acc,pwd) => {
  console.log('开始测试')
  console.log(getUrl)
  cy.request({
    url: getUrl,
    method: 'POST',
    form: true,
    headers: {
      Authorization: 'Basic Z3dlLWFwcDptYWx0',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: {
      grant_type: 'password',
      password: pwd,
      scope: 'app',
      username: acc,
    },
  }).then((response) => {
    const time = new Date().getTime()
    const tokenStr = {
      'dataType': 'string',
      'content': response.body.access_token,
      'datetime': time,
    }
    const tenantStr = {
      'dataType': 'string',
      'content': response.body.tenant_id,
      'datetime': time,
    }
    window.localStorage.setItem('malt-token', JSON.stringify(tokenStr))

    window.localStorage.setItem('tenant_id',
      JSON.stringify(tenantStr))
  })
})


Cypress.Commands.add('innerLogin', () => {
  cy.request({
    url: 'http://ec2-52-220-188-0.ap-southeast-1.compute.amazonaws.com:8080/auth/oauth/token',
    method: 'POST',
    form: true,
    headers: {
      Authorization: 'Basic Z3dlLWFwcDptYWx0',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: {
      grant_type: 'password',
      password: 123456,
      scope: 'app',
      username: 'lish@myhr100.com',
    },
  }).then((response) => {
    const time = new Date().getTime()
    const tokenStr = {
      'dataType': 'string',
      'content': response.body.access_token,
      'datetime': time,
    }
    const tenantStr = {
      'dataType': 'string',
      'content': response.body.tenant_id,
      'datetime': time,
    }
    window.localStorage.setItem('malt-token', JSON.stringify(tokenStr))

    window.localStorage.setItem('tenant_id',
      JSON.stringify(tenantStr))
  })
})
