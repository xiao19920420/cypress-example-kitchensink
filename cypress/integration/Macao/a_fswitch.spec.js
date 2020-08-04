/// <reference types="Cypress" />

describe('-基础切换用例集', function () {
  // beforeEach(() => {
  //   cy.login(Cypress.env('token_api'),Cypress.env('IN_Account'),Cypress.env('IN_Password'))
  // })
  it('切换租户', function () {
    cy.request({
      url: `${Cypress.env('token_api')}`,
      method: 'POST',
      form: true,
      headers: {
        Authorization: 'Basic Z3dlLWFwcDptYWx0',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: {
        grant_type: 'password',
        password: Cypress.env('IN_Password'),
        scope: 'app',
        username: Cypress.env('IN_Account'),
      },
    }).then((response) => {

      let token = response.body.access_token
      let tenant_id = response.body.tenant_id

      cy.request({
        url: `${Cypress.env('baseapi')}/admin/tenants/switch/`+Cypress.env('MA_Tenant_ID'),
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
      expect(response.body.message).to.equal('success')

    })
  })
})

