/// <reference types="Cypress" />
import 'cypress-file-upload';

describe('香港版-公司栏用例集', function() {

    beforeEach(() => {
      cy.login()
    })

    it('编辑公司信息', function () {
      cy.server()
      cy.route('**/admin/subscriberInfo/getInfo**').as('getCompany')
      cy.visit('http://stg.workoncue.com/settings/company')
      cy.wait('@getCompany')
      // //点击公司栏
      // cy.get(':nth-child(2) > .ant-menu-submenu-title > .menu-content > .menu-content__title').click()
      // //点击公司tab
      // cy.get('.ant-menu-submenu-open > .ant-menu > :nth-child(1) > .menu-content > .menu-content__title').click()
      // cy.wait(1000)

      cy.route('POST', "**/admin/file/**").as("upload");
      const fileName = 'my_logo.jpg';
      //上传图片
      cy.fixture(fileName).then(fileContent => {
        //input标签上传图片
        cy.get('#logo > div > span > input[type=file]').upload({
          fileContent,
          fileName,
          mimeType: 'image/jpg'
        });
      });

      // 确认上传接口返回内容
      cy.wait('@upload').its('status').should('eq', 200);

      cy.route('PUT', "**/admin/tenants**").as("save");
      //输入商业登记号,先选中全部再输入内容
      cy.get('#businessRegistrationNumber').type('{selectall}').type(12345678)
      //点击保存按钮
      cy.contains('保 存').click()
      // cy.get(':nth-child(4) > .ant-btn').click();
      cy.wait('@save').its('status').should('eq', 200);

    })
    it('新增部门',function () {
      cy.server()
      cy.route('**/admin/department?q=**').as('getDepartment')
      //跳转部门链接
      cy.visit('http://stg.workoncue.com/department');
      cy.wait('@getDepartment').its('status').should('eq', 200);

      //新增部门
      cy.get(".toolbar > .ant-btn").click()
      //输入新增部门名称
      cy.get('#name').type("新测试" + Math.floor(Math.random() * 10000 + 1) + "部门")
      cy.route('POST','**/admin/department**').as('saveDepartment')

      //点击保存
      cy.get("div:nth-child(2) > button.ant-btn.ant-btn-primary").click()
      cy.wait('@saveDepartment').its('status').should('eq', 200);
    })

    it('新增职位', function () {
      //跳转职位链接
      cy.server()
      cy.route('**admin/position?q=&**').as('getPosition')
      cy.visit('http://stg.workoncue.com/position')
    
      //点击新增职位
      cy.get('.toolbar > .ant-btn').click()
      //输入新增职位名称
      cy.get('#name').type("新测试" + Math.floor(Math.random() * 10000 + 1) + "岗位")
      //点击保存
      cy.route('POST', '**/admin/position**').as('savePosition')
      cy.get('div:nth-child(2) > button.ant-btn.ant-btn-primary').click()
      cy.wait('@savePosition').its('status').should('eq', 200);
    })

    it('新增办公打卡点', function () {
      cy.request({
        url: 'http://ec2-52-220-188-0.ap-southeast-1.compute.amazonaws.com:8080/auth/oauth/token',
        method: 'POST',
        form: true,
        headers: {
          Authorization: 'Basic Z3dlLWFwcDptYWx0',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: {
          grant_type: 'password',
          password: 123456,
          scope: 'app',
          username: '297434556@qq.com',
        }
      }).then((response) => {

        var token = response.body.access_token
        var tenant_id = response.body.tenant_id
        cy.request({
          url: 'http://ec2-52-220-188-0.ap-southeast-1.compute.amazonaws.com:8080/admin/attendanceAddress',
          method: 'POST',
          // form:true,
          headers: {
            Authorization: 'Bearer' + token,
            'Content-Type': 'application/json;charset=UTF-8',
            TENANT_ID: tenant_id
          },
          body: {
            attendanceAddressCode: '1234',
            name: 'jianchen123',
            info: '',
            address: '详细地址123',
            latitude: 22.296651386513652,
            longitude: 114.17285457241837,
            region: 500
          }
        })
      }).should((response) => {
        expect(response).to.have.property('headers')
        expect(response).to.have.property('duration')
      })
    })

    it('新增成本中心', function () {
      //跳转成本中心链接
      cy.server()
      cy.route('**/admin/biz_cost_center/page**').as('getCenter')
      cy.visit('http://stg.workoncue.com/cost-center')
      cy.wait('@getCenter').its('status').should('eq', 200);

      //点击添加成本中心
      cy.get('.toolbar > .ant-btn').click()

      //输入新成本中心
      cy.get('#name').type("测试" + Math.floor(Math.random() * 10000 + 1) + "成本中心")
      cy.route('POST','**/admin/biz_cost_center**').as('saveCenter')

      cy.get('div:nth-child(2) > button.ant-btn.ant-btn-primary').click()
      cy.wait('@saveCenter').its('status').should('eq', 200);

    })
})