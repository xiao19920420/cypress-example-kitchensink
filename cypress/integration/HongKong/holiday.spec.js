/// <reference types="Cypress" />

describe('香港版-假期栏用例集', function () {
  beforeEach(() => {
    cy.login()
  })
  it('检查假期申请', function () {
    cy.server()
    cy.route('**/leave/holiday/page**').as('getDetail')
    //跳转假期余额URL
    cy.visit('http://stg.workoncue.com/holiday/holiday_application')
    cy.wait('@getDetail')

    //点击假期申请第一项
    cy.route('**admin/bizActivityLog?current=1&**').as('getDetail')
    cy.get(' div.ant-table-body > table > tbody > tr:nth-child(1) > td:nth-child(2)').dblclick()
    cy.wait(2000)

    //判断日期控件上有内容展示
    cy.get('.ant-calendar-picker-input').then((values) => {
      expect(values.text).not.to.be.empty
    })

    //判断假期类型上有内容展示
    cy.get('#holidayType > .ant-select-selection').then((values) => {
      expect(values.text).not.to.be.empty
    })
  })
})

