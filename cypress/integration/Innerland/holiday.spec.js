/// <reference types="Cypress" />

describe('内地版-假期栏用例集', function () {
  beforeEach(() => {
    cy.innerLogin()
  })
  it('检查假期申请', function () {
    cy.server()
    cy.route('**/leave/holiday/page**').as('getDetail')
    //跳转假期余额URL
    cy.visit(`${Cypress.env('base')}holiday/holiday_application`)
    cy.wait('@getDetail')
    //点击假期申请
    // cy.get('.ant-menu-submenu-open > .ant-menu > :nth-child(2)').click();
    //点击假期申请第一项
    cy.route('**admin/bizActivityLog?current=1&**').as('getDetail')
    cy.get(' div.ant-table-body > table > tbody > tr:nth-child(1) > td:nth-child(2)').dblclick()
    cy.wait(2000)
    //判断日期控件上有内容展示
    cy.get('.ant-calendar-picker-input').then((values) => {
      expect(values.val()).to.not.be.empty
    })

    //判断假期类型上有内容展示
    cy.get('#holidayType > div > div > div.ant-select-selection-selected-value').then((values) => {
      expect(values.text()).to.not.be.empty
    })
  })
})

