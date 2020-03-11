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
Cypress.Commands.add('login', () => {
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
      username: '297434556@qq.com',
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
    url: Cypress.env('devapi')+'/auth/oauth/token',
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
      username: '297434556@qq.com',
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
