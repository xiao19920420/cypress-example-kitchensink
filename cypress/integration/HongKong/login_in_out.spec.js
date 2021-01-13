import testData from '/Users/elephant/Documents/GitHub/cypress-example-kitchensink/cypress/fixtures/export_json.json'

describe('香港版-登录登出用例集', function () {
  beforeEach(() => {
    cy.visit(Cypress.env('base'))
  })

  it.skip('登录验证脚本', function () {
    // cy.server()
    // cy.route('POST', '**/oauth/token').as('getToken')
    cy.log(testData)
    for (const data in testData) {
      cy.log(testData[data].email)
       //输入邮箱
       cy.get('#username').type(testData[data].email)
       //输入密码
       cy.get('#password').type(Cypress.env('HK_Password'))
 
     
       //点击登录
       cy.contains('登 录').click()
           //点击个人头像
    cy.get('a.ant-dropdown-trigger > .ant-avatar').click()
    //点击登出
    cy.get('.ant-dropdown-menu > :nth-child(5)').click()
    //确认登出
    cy.get('.ant-modal-confirm-btns > .ant-btn-primary').click()
      //  cy.wait('@getToken').its('status').should('eq', 200)

      // it(`测试外部数据${data}`, function () {
      //     cy.log(testData[data].email)
      //      //输入邮箱
      //     cy.get('#username').type(testData[data].email)
      //     //输入密码
      //     cy.get('#password').type(Cypress.env('HK_Password'))
    
        
      //     //点击登录
      //     cy.contains('登 录').click()
      //     cy.wait('@getToken').its('status').should('eq', 200)
      // });
  }
    
  })

  it('登录', function () {
    cy.server()
    cy.route('POST', '**/oauth/token').as('getToken')
    
    //输入邮箱
    cy.get('#username').type(Cypress.env('HK_Account'))
    //输入密码
    cy.get('#password').type(Cypress.env('HK_Password'))
    
    
    //点击登录
    cy.contains('登 录').click()
    cy.wait('@getToken').its('status').should('eq', 200)
    
  })

  it('登出', function () {
    //输入邮箱
    cy.get('#username').type(Cypress.env('HK_Account'))
    //输入密码
    cy.get('#password').type(Cypress.env('HK_Password'))

    cy.server()
    cy.route('**/admin/subscriberInfo/getInfo').as('getInfo')

    //点击登录
    cy.contains('登 录').click()
    
    cy.wait('@getInfo')
    //判断当前登录的租户
    cy.get('div.ant-row-flex.ant-row-flex-center > div.company-info.ant-row > div').then((values) => {
      expect(values.text()).to.equal(Cypress.env('HK_Tenant_Name'))
    })

    //点击个人头像
    cy.get('a.ant-dropdown-trigger > .ant-avatar').click()
    //点击登出
    cy.get('.ant-dropdown-menu > :nth-child(5)').click()
    //确认登出
    cy.get('.ant-modal-confirm-btns > .ant-btn-primary').click()
  })
})
