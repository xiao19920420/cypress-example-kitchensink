/// <reference types="Cypress" />

describe("香港版-假期栏用例集", function() {
  beforeEach(() => {
    cy.login()
  });
  
  it("检查假期申请", function() {
    //点击假期栏
    // cy.get(':nth-child(6) > .ant-menu-submenu-title > .menu-content', { timeout: 10000 }).click();
    cy.server();
    cy.route('**/leave/holiday/page**').as('getDetail');
    //跳转假期余额URL
    cy.visit('http://stg.workoncue.com/holiday/holiday_application')
    cy.wait('@getDetail');
    //点击假期申请
    // cy.get('.ant-menu-submenu-open > .ant-menu > :nth-child(2)').click();
    //点击假期申请第一项
    cy.get(' div.ant-table-body > table > tbody > tr:nth-child(1) > td:nth-child(2)').dblclick();
    cy.wait(2000)
    //判断日期控件上有内容展示
    cy.get('.ant-calendar-picker-input').then((values) => {
      expect(values.html).not.to.be.empty
    })
  });
});

