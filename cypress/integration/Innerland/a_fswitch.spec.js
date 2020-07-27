/// <reference types="Cypress" />

describe('内地版-基础切换用例集', function () {
  beforeEach(() => {
    cy.login(Cypress.env('fat_token_api'),Cypress.env('IN_Account'),Cypress.env('IN_Password'))
  })
  it('切换租户', function () {
    cy.request({
      url: `${Cypress.env('devapi')}/auth/oauth/token`,
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

      let token = response.body.access_token
      let tenant_id = response.body.tenant_id

      cy.request({
        url: `${Cypress.env('devapi')}/admin/tenants/switch/16827cc9c56231793f0fcb29d2a65e7b`,
        method: 'GET',
        // form:true,
        headers: {
          Authorization: `Bearer${token}`,
          'Content-Type': 'application/json;charset=UTF-8',
          TENANT_ID: tenant_id,
        },
      })
    }).should((response) => {
      expect(response).to.have.property('headers')
      expect(response).to.have.property('duration')
    })
  })
})

