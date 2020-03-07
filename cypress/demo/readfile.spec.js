/// <reference types="Cypress" />
describe('数据驱动用例集', function() {
    it("读取json文件", function() {
        cy.readFile('cypress/integration/MyTests/newdata.json').its('companyname').should('eq', "let's_begin10.320-1")
    })
})
