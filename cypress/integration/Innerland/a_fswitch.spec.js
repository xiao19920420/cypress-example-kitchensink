/// <reference types="Cypress" />

describe('内地版-基础切换用例集', function () {
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
                username: 'lish@myhr100.com',
            }
        }).then((response) => {

            var token = response.body.access_token
            var tenant_id = response.body.tenant_id
            cy.request({
                url: Cypress.env('devapi') + '/admin/tenants/switch/16827cc9c56231793f0fcb29d2a65e7b',
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
    // it("确认当前是内地租户", function () {
    //     cy.server();
    //     var getName = '';

    //     //获取info请求
    //     cy.route({
    //         url: '**/admin/users/info**',
    //         onResponse: (xhr) => {
    //             getName = xhr.response.body.data.tenant.name
    //         },
    //     }).as('get_info')

    //     cy.visit(Cypress.env('base') + 'schedule');
    //     cy.wait('@get_info')

    //     if (getName === "内地专用01") {

    //     } else {
    //         cy.route('**/admin/tenants/switch/**').as('switch')
    //         cy.get('.current-company').click()
    //         cy.contains('内地专用').dblclick()
    //         // cy.wait('@switch').its('status').should('eq', 200);
    //     }

    //     // cy.get('div.company-info.ant-row > div').then((values) => {
    //     //     expect(values.html).to.include('内地专用')
    //     // })
    //     // expect(cy.get('div.company-info.ant-row > div')).to.include('内地专用')
    //     // cy.wait(2000)
    //     // cy.get('.current-company').contains('内地专用') 
    //     // cy.get('.current-company')
    //     //     .should(($div) => {
    //     //     expect($div.html).to.include('内地专用')
    //     // })

    // });
})

