/// <reference types="Cypress" />

describe("香港版-保险福利栏用例集", function() {
  beforeEach(() => {
     cy.login()
  });

  it("保险福利主流程", function() {
    this.retries(2);

    //点击保险福利栏
    cy.visit('http://stg.workoncue.com/benefit/benefit-overview')
    // cy.get(':nth-child(8) > .ant-menu-submenu-title',{ timeout: 15000 }).click();

    cy.server()
    cy.route('**/payroll/insurance_benefits_record/**').as('getInsurance')
    //点击档案
    cy.get(':nth-child(2) > .menu-content > .menu-content__title').click();
    cy.wait('@getInsurance')

    //选择employ li
    cy.contains('employee,li').dblclick()

    //判断供款编号上有内容展示
    cy.get('#paymentNumber').then((values) => {
      expect(values.html).not.to.be.empty
    })

  });
});
