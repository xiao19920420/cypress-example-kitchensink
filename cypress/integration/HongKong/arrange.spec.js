/// <reference types="Cypress" />

describe('香港版-排班栏用例集', function () {
  beforeEach(() => {
    cy.login(Cypress.env('token_api'),Cypress.env('HK_Account'),Cypress.env('HK_Password'))
  })

  it('新增排班',function () {
    cy.intercept('**/admin/**').as('queryEmployee')
    cy.intercept('POST', '**/attendCalculationDetail/**').as('queryEmployeeAfter')
    cy.log('通过链接跳转排班界面')
    cy.visit(`${Cypress.env('base')}schedule`)

    //加载数据
    cy.wait('@queryEmployee').then(({ request,response }) => {
      expect(response.statusCode).to.eq(200)
    })

    cy.wait('@queryEmployeeAfter');



    cy.wait(1000)//等待前端数据渲染
    cy.get(
      'div.ant-col-21.right-bottom > div > div > div:nth-child(1) > div:nth-child(1) '
    ).then(($btn) => {
      if ($btn.children().hasClass('schedule__add')) {
        console.log($btn.children())
        cy.log('新增排班')
        cy.intercept('POST', '**/admin/attendCalculationDetail').as('saveArrange')
        cy.get(
          'div > div > div:nth-child(1) > div:nth-child(1) > div.schedule__add'
        ).click()
        cy.get('#shiftIn > input').type('09:00')
        cy.get('#shiftOff > input').type('18:00')
        cy.get('.ant-btn-primary').click()
        
        // cy.intercept('POST', '**/admin/attendCalculationDetail**',{
        //   statusCode: 200
        // })
        //选择保存排班
       
        
        // 判断保存排班接口返回是否正常
        cy.wait('@saveArrange');
        
        // .then(({ request,response }) => {
        //   console.log('response')
        //   console.log(response)
        //   expect(response.statusCode).to.eq(200)
        // })
      }
    })
  })

  it('确认排班导出接口', function () {
    //点击排班栏
    // cy.get(
    //   ":nth-child(4) > .ant-menu-submenu-title > .menu-content > .menu-content__title",
    //   { timeout: 10000 }
    // ).click();

    // cy.route('**/admin/**').as('queryEmployee');
    // cy.route('POST','**/attendCalculationDetail/**').as('queryEmployeeAfter');

    // //点击排班栏下的排班项
    // cy.get(
    //   ".ant-menu-submenu-open > .ant-menu > :nth-child(1) > .menu-content > .menu-content__title"
    // ).click();

    // //加载数据
    // cy.wait('@queryEmployee');

    cy.log('点击排班导出')
    cy.log('通过链接跳转排班界面')
    cy.visit(`${Cypress.env('base')}schedule`)
    cy.intercept('**/admin/attendCalculationDetail/export?**').as('downloadExcel')

    cy.get('.download-box').click()
    //点击确认导出按钮
    cy.get('.ant-modal-confirm-btns > .ant-btn-primary').click()
    cy.wait('@downloadExcel').then(({ request,response }) => {
      expect(response.statusCode).to.eq(200)
    })

  })


  it('判断打卡界面接口返回是否正常', function () {
    //点击考勤栏
    // cy.get(':nth-child(5) > .ant-menu-submenu-title', {
    //   timeout: 10000
    // }).click()
    //点击打卡数据
    // cy.get('.ant-menu-submenu-open > .ant-menu > :nth-child(2)',{
    //   timeout: 10000
    // }).click()

    cy.intercept('**/admin/bizMobileCard?q=&current=1&size=10**').as('queryNormal')

    cy.log('跳转打卡数据界面')
    cy.visit(`${Cypress.env('base')}attendance/clock_data`)

    cy.wait('@queryNormal').then(({ request,response }) => {
      expect(response.statusCode).to.eq(200)
    })
    cy.intercept('**mobileCardStatusFilter**').as('queryError')  
    //点击打卡异常数据界面
    cy.get('[aria-selected="false"]').click()
      
    // cy.wait('@queryError').then(({ request,response  }) => {
    //   expect(response.statusCode).to.eq(200)
    // })
  })

  it('进行考勤汇总计算', function () {
    cy.log('跳转考勤汇总计算链接')
    cy.intercept('**/admin/bizAttendCalculation**').as('getbiz')
    cy.visit(`${Cypress.env('base')}attendance/overview`)


    //点击考勤汇总
    // cy.get("ul > li.ant-menu-submenu > ul > li:nth-child(1) > div").click();
    cy.wait('@getbiz')

    cy.log('点击计算按钮')
    cy.get('[style="width: 88px;"] > .ant-btn').click()
    cy.intercept('**/admin/employee/selectionList**').as('getEmployee')

    cy.log('点击员工选择框')
    cy.get(
      ' div:nth-child(3) > div.ant-collapse-content.ant-collapse-content-active > div > span > div > div > div'
    ).click()
    cy.wait('@getEmployee')

    cy.log('选择第一个员工')
    cy.get('div.field-name__employeeFilter >div>div>ul>li:nth-child(1)').dblclick()
    cy.get(' div.ant-modal-wrap.attendance-filter-modal > div > div.ant-modal-content > div.ant-modal-body > div > div > div > div:nth-child(3) > div.ant-collapse-content.ant-collapse-content-active > div > span > i > svg').click()

    cy.log('点击确定按钮')
    cy.get(
      ' div.ant-modal-footer > div > button.ant-btn.ant-btn-primary'
    ).click()
    cy.wait('@getbiz')


    cy.log('判断应出勤小时数')
    cy.get(
      ' div.ant-table-body > table > tbody > tr:nth-child(1) > td:nth-child(6) > span:nth-child(1)',
      { timeout: 5000 }
    ).then((values) => {
      let getNumber = Number(values.text())

      if (getNumber >= 9) {
        expect(1).to.equal(1)
      } else {
        expect(1).to.equal(0)
      }
    })

  })
})
