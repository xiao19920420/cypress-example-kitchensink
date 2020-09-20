/// <reference types="Cypress" />
// import 'cypress-file-upload'

describe('香港版-公司栏用例集', function () {

  beforeEach(() => {
    cy.login(Cypress.env('token_api'),Cypress.env('HK_Account'),Cypress.env('HK_Password'))
  })

  it('编辑公司信息', function () {
    cy.server()
    cy.route('**/admin/subscriberInfo/getInfo**').as('getCompany')
    cy.log('跳转公司栏')
    cy.visit(`${Cypress.env('base')}settings/company`)

    cy.wait('@getCompany')

    cy.route('POST', '**/admin/file/**').as('upload')

    const fileName = 'my_logo.png'
    cy.log('上传图片')
    // cy.get('#logo > div > span > input[type=file]').attachFile(fileName)
    
    cy.get('#logo > div > span > input[type=file]')
    .attach_img(fileName, 'image/jpg')
    .trigger('change', { force: true });

    // 确认上传接口返回内容
    cy.wait('@upload').its('status').should('eq', 200)

    cy.route('PUT', '**/admin/tenants**').as('save')
    cy.log('输入商业登记号,先选中全部再输入内容')
    cy.get('#businessRegistrationNumber').type('{selectall}').type(12345678)
    cy.log('点击保存按钮')
    cy.contains('保 存').click()
    // cy.get(':nth-child(4) > .ant-btn').click();
    cy.wait('@save').its('status').should('eq', 200)

  })
  it('新增部门', function () {
    cy.server()
    cy.route('**/admin/department?q=**').as('getDepartment')
    cy.log('跳转部门链接')
    cy.visit(`${Cypress.env('base')}department`)

    cy.wait('@getDepartment').its('status').should('eq', 200)
    cy.log('新增部门')
    // cy.get('.toolbar > .ant-btn').click()
    cy.route('**/admin/department**').as('getList')
    cy.get('.ant-btn-primary').click()
    //选择父级部门
    cy.get('#parentId > .ant-select-selection > .ant-select-selection__rendered').click()
    cy.wait('@getList').its('status').should('eq', 200)
    // cy.get('body > div:nth-child(14) > div > div > div > div > ul > li:nth-child(1)').click()
    // cy.contains('新测试9187部门').click()
    //输入新增部门名称
    cy.get('#name').type(`新测试${Math.floor(Math.random() * 10000 + 1)}部门`)
    cy.route('POST', '**/admin/department**').as('saveDepartment')

    //点击保存
    cy.get('div:nth-child(2) > button.ant-btn.ant-btn-primary').click()
    cy.wait('@saveDepartment').its('status').should('eq', 200)
  })

  it('新增职位', function () {
    cy.log('跳转职位链接')
    cy.server()
    cy.route('**admin/position?q=&**').as('getPosition')
    cy.visit(`${Cypress.env('base')}position`)

    cy.log('新增职位')
    cy.get('.toolbar > .ant-btn').click()
    //输入新增职位名称
    cy.get('#name').type(`新测试${Math.floor(Math.random() * 10000 + 1)}岗位`)
    //点击保存
    cy.route('POST', '**/admin/position**').as('savePosition')
    cy.get('div:nth-child(2) > button.ant-btn.ant-btn-primary').click()
    cy.wait('@savePosition').its('status').should('eq', 200)
  })

  it('新增办公打卡点', function () {
    cy.request({
      url: `${Cypress.env('token_api')}`,
      method: 'POST',
      form: true,
      headers: {
        Authorization: 'Basic Z3dlLWFwcDptYWx0',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: {
        grant_type: 'password',
        password: Cypress.env('HK_Password'),
        scope: 'app',
        username: Cypress.env('HK_Account'),
      },
    }).then((response) => {

      let token = response.body.access_token
      let tenant_id = response.body.tenant_id

      cy.request({
        url: Cypress.env('baseapi')+'/admin/attendanceAddress',
        method: 'POST',
        // form:true,
        headers: {
          Authorization: `Bearer${token}`,
          'Content-Type': 'application/json;charset=UTF-8',
          TENANT_ID: tenant_id,
        },
        body: {
          attendanceAddressCode: '1234',
          name: 'jianchen123',
          info: '',
          address: '详细地址123',
          latitude: 22.296651386513652,
          longitude: 114.17285457241837,
          region: 500,
        },
      })
    }).should((response) => {
      expect(response).to.have.property('headers')
      expect(response).to.have.property('duration')
      expect(response.body.message).to.equal('Code or Name already exists')

    })
  })

  it('新增成本中心', function () {
    cy.log('跳转成本中心链接')
    cy.server()
    cy.route('**/admin/biz_cost_center/page**').as('getCenter')
    cy.visit(`${Cypress.env('base')}cost-center`)

    cy.wait('@getCenter').its('status').should('eq', 200)

    //点击添加成本中心
    cy.get('.toolbar > .ant-btn').click()

    //输入新成本中心
    cy.get('#name').type(`测试${Math.floor(Math.random() * 10000 + 1)}成本中心`)
    cy.route('POST', '**/admin/biz_cost_center**').as('saveCenter')

    cy.get('div:nth-child(2) > button.ant-btn.ant-btn-primary').click()
    cy.wait('@saveCenter').its('status').should('eq', 200)

  })
})
