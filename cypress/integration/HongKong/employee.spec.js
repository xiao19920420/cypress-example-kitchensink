/// <reference types="Cypress" />

describe('香港版-员工栏用例集', function () {
  beforeEach(() => {
    cy.login(Cypress.env('token_api'),Cypress.env('HK_Account'),Cypress.env('HK_Password'))
  })

  it('新增员工', function () {
    cy.server()
    cy.route('**/admin/employee?q=**').as('getEmployee')
    cy.visit(`${Cypress.env('base')}employee`)
    cy.wait('@getEmployee').its('status').should('eq', 200)

    //点击新增员工
    // cy.get('.toolbar > :nth-child(2)').click()
    cy.get('.ant-btn-primary').click()
    //输入姓名（身份证）
    cy.get('#englishName').type('NG KE')
    //输入员工编号
    // cy.get("#code").type("HD" + Math.random());

    //点击区号选择框
    cy.get('#phone > div > div > div').click()
    //点击选择香港区号
    cy.get('li:nth-child(1) > ul > li:nth-child(2)').click()
    //输入电话号码
    cy.get('.ant-input-group > #phone').type('123')
    //输入个人电邮
    cy.get('#email').type(
      `${Math.floor(Math.random() * 1000 + 1)}k1@ya.com`
    )

    //点击假期规则选择框
    // cy.get("#regularType > .ant-select-selection", { timeout: 5000 }).click();
    // cy.route("**/leave/leave_regulation/**").as("getLeavePage");
    // cy.wait("@getLeavePage");

    //选择第一种假期规则
    // cy.get("div.field-name__regularType>div>div>ul>li:nth-child(1)").click();

    //选择入职日期
    cy.get('#entryDate > div > input').click()
    //入职日期选择去年
    cy.get('.ant-calendar-prev-year-btn').click()
    //选择默认入职日期
    cy.get(
      'div.ant-calendar-date-panel > div.ant-calendar-body > table > tbody > tr.ant-calendar-active-week > td:nth-child(4) > div'
    ).click()

    //点击受雇形式
    // cy.get(
    //   "#hireType > .ant-select-selection > .ant-select-selection__rendered"
    // ).click();
    //点击选择全职形式
    // cy.get("div.field-name__hireType> div>ul>li:nth-child(1)").click();

    //点击职位选择框
    cy.get('#positionId >.ant-select-selection', { timeout: 5000 }).click()
    cy.route('**/admin/position?**').as('getPositionPage')
    cy.wait('@getPositionPage')

    //选择第一个职位
    cy.get('div.field-name__positionId>div>div>ul>li:nth-child(1)', {
      timeout: 5000,
    }).click()

    //点击办公打卡点选择框
    cy.route('**/admin/attendanceAddress?**').as('getAddress')
    cy.get(
      '#attendCalculationIdTempList > .ant-select-selection > .ant-select-selection__rendered'
    )
      .click()
      .then(($btn) => {
        cy.wait('@getAddress')
        //选择第一个办公打卡点
        cy.get(
          'div.field-name__attendCalculationIdTempList>div>div>ul>li:nth-child(1)'
        ).click()
        cy.get('#attendCalculationIdTempList > .ant-select-selection > .ant-select-selection__rendered').dblclick()
        cy.wait(1000)
      })

    //点击部门选择框
    // cy.route("**/admin/department?**").as("getDepartment");
    // cy.get(
    //   "#departmentId > .ant-select-selection > .ant-select-arrow > .ant-select-arrow-icon > svg"
    // ).click();
    // cy.wait("@getDepartment");
    //选择第一个部门
    // cy.get("div.field-name__departmentId>div>div>ul>li:nth-child(1)", {
    //   timeout: 5000
    // }).click();

    //点击成本中心选择框
    // cy.route("**/admin/biz_cost_center/page?**").as("getCenterPage");
    // cy.get("#costCenterId > .ant-select-selection").click();
    // cy.wait(1000);

    //选择第一个成本中心
    // cy.wait("@getCenterPage");
    // cy.get("div.field-name__costCenterId >div>div>ul>li:nth-child(1)", {
    //   timeout: 5000
    // }).click();

    //输入基本薪酬
    cy.get('#basicPay > .ant-input-number-input-wrap > .ant-input-number-input').type('138')

    //点击计薪形式选择框
    // cy.get(
    //   "#calculateSalaryType > .ant-select-selection > .ant-select-selection__rendered"
    // ).click();
    //选择月薪
    // cy.get(
    //   "div.field-name__calculateSalaryType >div>ul>li:nth-child(1)"
    // ).click();

    //点击薪酬规则选择框
    cy.route('**/payroll_regulation/list?**').as('getPayrollRegulation')
    cy.get('#payrollRegulationId > .ant-select-selection').click()
    cy.wait(500)
    cy.wait('@getPayrollRegulation')
    //点击第一种薪酬规则
    cy.get('div.field-name__payrollRegulationId>div>ul>li:nth-child(1)', {
      timeout: 5000,
    }).click()
    cy.route('POST', '**/admin/employee**').as('saveEmployee')

    //点击保存
    cy.get('.toolbar > :nth-child(1)').click()
    cy.wait('@saveEmployee').its('status').should('eq', 200)

    //解雇员工
    cy.route('POST', '**/admin/employee/operationEmployee**').as('fire')
    cy.get('.ant-card-body > .ant-btn').click()
    cy.get('#lastWorkingDate > div > .ant-calendar-picker-input').click()
    cy.get(' tr.ant-calendar-current-week.ant-calendar-active-week > td:nth-child(3) > div').click()
    cy.get('.ant-modal-footer > div > .ant-btn-primary').click()
    cy.wait('@fire').its('status').should('eq', 200)

    cy.route('DELETE','**/admin/employee/**').as('deleteEmployee')
    //新增员工之后选择删除
    cy.get('.toolbar > .ant-btn-default').click()

    //点击确认删除
    cy.get('.btn-group > .ant-btn-primary').click()

    //确认删除接口返回内容，是否删除成功
    cy.wait('@deleteEmployee').its('status').should('eq', 200)
  })
})
