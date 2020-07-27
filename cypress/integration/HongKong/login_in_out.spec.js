describe('香港版-登录登出用例集', function () {
  beforeEach(() => {
    cy.visit(Cypress.env('baseurl'))
  })

  it('登录', function () {
    //输入邮箱
    cy.get('#username').type(Cypress.env('HK_Account'))
    //输入密码
    cy.get('#password').type(Cypress.env('HK_Password'))
    cy.server()
    cy.route('POST', '**/oauth/token').as('getToken')
    
    //点击登录
    cy.get('.ant-btn').click()
    cy.wait('@getToken').its('status').should('eq', 200)

  })

  it('登出', function () {
    //输入邮箱
    cy.get('#username').type(Cypress.env('HK_Account'))
    //输入密码
    cy.get('#password').type(Cypress.env('HK_Password'))
    //点击登录
    cy.get('.ant-btn').click()

    //点击个人头像
    cy.get('a.ant-dropdown-trigger > .ant-avatar').click()
    //点击登出
    cy.get('.ant-dropdown-menu > :nth-child(5)').click()
    //确认登出
    cy.get('.ant-modal-confirm-btns > .ant-btn-primary').click()
  })
})
