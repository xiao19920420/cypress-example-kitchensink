/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
}

//plugins/index.js
const fs = require('fs-extra')
const path = require('path')

function getConfigurationByFile (file) {
  const pathToConfigFile = path.resolve('..', 'cypress-example-kitchensink/cypress/config', `cypress.${file}.json`)
  console.log(pathToConfigFile)
  return fs.readJson(pathToConfigFile)
}

// plugins file
module.exports = (on, config) => {
  // 指定一个环境配置，如没有指定，则使用cypress.dev.json
  const file = config.env.configFile || 'dev'
  console.log('开始测试')
  console.log(file)
  return getConfigurationByFile(file)
}