/// <reference types="Cypress" />
import 'cypress-file-upload';

describe("员工录入用例", function () {
    beforeEach(() => {
        cy.visit(Cypress.env('baseurl'))
        cy.get("#username").type(Cypress.env('email'));
        cy.get("#password").type(Cypress.env('password'));
        cy.get(".ant-btn").click();
    });

    it("新增员工", function () {
        cy.get('.ant-menu > :nth-child(3)', {
            timeout: 10000
        }).click();
        cy.server();
        cy.route('**admin**').as('update');
        cy.get('.toolbar > :nth-child(1)', {
            timeout: 10000
        }).click();
        const fileName = 'English.xls';
        //上传图片
        cy.fixture(fileName).then(fileContent => {
            //input标签上传图片
            cy.get('div.ant-upload.ant-upload-drag > span > input[type=file]').upload({
                fileContent,
                fileName,
                mimeType: 'application/vnd.ms-excel',
                encoding: 'utf-8'
            });
        });
        cy.get('.ant-modal-footer > div > .ant-btn-primary').click();
        cy.wait('@update');
    });
});
