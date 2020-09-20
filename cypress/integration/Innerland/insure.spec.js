/// <reference types="Cypress" />

describe('内地版-保险福利栏用例集', function () {
  beforeEach(() => {
    cy.login(Cypress.env('token_api'),Cypress.env('HK_Account'),Cypress.env('HK_Password'))
  })

  it('保险福利主流程', function () {

    //点击保险福利栏
    cy.visit(`${Cypress.env('base')}benefit/benefit-overview`)
    // cy.get(':nth-child(8) > .ant-menu-submenu-title',{ timeout: 15000 }).click();

    cy.server()
    cy.route('**/payroll/insurance_benefits_record/**').as('getInsurance')
    //点击档案
    cy.get(':nth-child(2) > .menu-content > .menu-content__title').click()
    cy.wait('@getInsurance')

    //选择第一个档案
    cy.wait(1000)//等待前端数据渲染
    cy.get('div.ant-table-body > table > tbody > tr:nth-child(1)').dblclick()
    cy.wait('@getInsurance')
    //点击编辑按钮
    cy.wait(1500)

    // cy.get('.ant-card-extra > :nth-child(1) > div > :nth-child(1)')
   //判断姓名上有内容展示
    cy.get('#englishName').then((values) => {
      expect(values.val()).to.not.be.empty
    })

  })
})
