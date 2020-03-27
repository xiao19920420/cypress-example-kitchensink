/// <reference types="Cypress" />

describe("内地版-登录登出用例", function() {
  beforeEach(() => {
    cy.visit(Cypress.env('baseurl'))
  });

  it("登录", function () {
    //输入邮箱
    cy.get("#username").type(Cypress.env("email"));
    //输入密码
    cy.get("#password").type(Cypress.env("password"));
    //点击登录
    cy.get(".ant-btn").click();
  });

  it("登出", function () {
    //输入邮箱
    cy.get("#username").type(Cypress.env("email"));
    //输入密码
    cy.get("#password").type(Cypress.env("password"));
    //点击登录
    cy.get(".ant-btn").click();

    //点击个人头像
    cy.get('a.ant-dropdown-trigger > .ant-avatar').click();
    //点击登出
    cy.get('.ant-dropdown-menu > :nth-child(5)').click()
    //确认登出
    cy.get('.ant-modal-confirm-btns > .ant-btn-primary').click()
  });
});
