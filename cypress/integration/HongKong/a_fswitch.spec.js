/// <reference types="Cypress" />

describe('香港版-切换用例集', function () {
    beforeEach(() => {
        cy.innerLogin()
    })
    it('切换租户', function () {
        cy.request({
            url: Cypress.env('devapi') + '/auth/oauth/token',
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
            }
        }).then((response) => {

            var token = response.body.access_token
            var tenant_id = response.body.tenant_id
            cy.request({
                url: Cypress.env('devapi') + '/admin/tenants/switch/0031b79afddb2ab5268349d7f82f0065',
                method: 'GET',
                // form:true,
                headers: {
                    Authorization: 'Bearer' + token,
                    'Content-Type': 'application/json;charset=UTF-8',
                    TENANT_ID: tenant_id
                }
            })
        }).should((response) => {
            expect(response).to.have.property('headers')
            expect(response).to.have.property('duration')
        })
    })
})

