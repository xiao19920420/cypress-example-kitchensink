/// <reference types="Cypress" />

describe('内地版-薪酬栏用例集', function () {
  beforeEach(() => {
    cy.login(Cypress.env('token_api'),Cypress.env('HK_Account'),Cypress.env('HK_Password'))
  })

  it('薪酬运算', function () {
    // Cypress.config('chromeWebSecurity',false);
    //薪酬运算的url
    cy.visit(`${Cypress.env('base')}payroll/payroll-calculation`)
    //判断url的改变
    cy.url().should('include', '/payroll/payroll-calculation')
    //点击新增运算
    cy.get('div.toolbar > button.ant-btn.ant-btn-primary', { timeout: 5000 }).click()
    cy.server()
    //点击薪酬规则选择框
    cy.route('**/payroll/payroll_regulation/list**').as('payroll_choose')
    cy.get('#payrollRegulationId > .ant-select-selection').click()
    cy.wait('@payroll_choose')

    //选择第一种薪酬规则
    cy.contains('系统默认薪酬').click()
    // cy.get('div.field-name__payrollRegulationId > div >ul >li:nth-child(2)').click()

    //点击支付日期选择框
    cy.get('#payrollDate > div > .ant-calendar-picker-input').click()

    //选择支付日期
    cy.get('tr:nth-child(4) > td:nth-child(3)').click()
    //等待前端渲染数据
    cy.wait(1000)
    cy.route('**/payroll/payroll_plan/**').as('payroll_detail')
    //点击运算操作
    cy.get('div:nth-child(2) > div.toolbar > button').click()
    cy.get('div:nth-child(2) > div.toolbar > button:nth-child(1)', { timeout: 10000 })

    //判断运算后界面是否跳转
    cy.url().should('include', '/payroll/payroll-calculation-detail?id=')
    //等待运算接口完成
    cy.wait('@payroll_detail').its('status').should('eq', 200)
    //判断列表接口返回内容
    cy.route({
      url: '**/payroll/payroll_plan_summary/**',
      onResponse: (xhr) => {
        // do something with the
        // raw XHR object when the
        // response comes back
        expect(xhr.response.body.data.total).to.be.greaterThan(0)
      },
    }).as('payroll_list')

    cy.route('**payroll/payroll_plan/**').as('payroll_detail')

    cy.url().should('include', '/payroll/payroll-calculation-detail?id=')
    cy.wait('@payroll_detail').its('status').should('eq', 200)

    cy.log('进行薪酬运算第三步')
    cy.wait('@payroll_detail').its('status').should('eq', 200)
    cy.contains('下一步').click()
    cy.wait('@payroll_detail').its('status').should('eq', 200)

    // cy.get('.ant-btn-primary').click()
    cy.contains('上一步').click()
    cy.wait('@payroll_detail').its('status').should('eq', 200)

    cy.contains('上一步').click()
    cy.wait('@payroll_detail').its('status').should('eq', 200)

    //点击删除按钮
    cy.get('.toolbar > .ant-btn-default').click()
    cy.route('DELETE', '**/payroll/payroll_plan/**').as('delete_payroll')

    //点击确认按钮
    cy.get('.action-wrapper > .ant-btn-primary').click()
    cy.wait('@delete_payroll').its('status').should('eq', 200)
  })
})
