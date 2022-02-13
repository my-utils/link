#!/usr/bin/env node
const { create } = require('./src/create')
const { update } = require('./src/update')
const { query } = require('./src/service')
const { writeConfig, readConfig } = require('./src/utils')
const package = require('./package.json')
const ora = require('ora');

const mySpinner = ora('获取远程数据中')
const type = process.argv[2]

async function start() {
  const { url } = readConfig()
  if (!url) {
    console.log('请先通过 link-jms-common config 配置git仓库地址')
    return
  }
  mySpinner.start()
  const data = await query()
  mySpinner.stop()
  if (!data && data.length === 0) {
    console.log('请配置远程数据')
    return
  }
  const option = data.map(i => {
    i.gitUrl = url + i.gitUrl
    return i
  })
  create(option)
}

async function config(url) {
  writeConfig({ url })
}

switch (type) {
  case '-v':
    console.log('当前版本号', package.version)
    break
  case 'update':
    update()
    break
  case 'config':
    const url = process.argv[3]
    if (url) {
      config(url)
    } else {
      console.log('缺少必要的参数')
    }
    break
  case '--help':
    console.log('link-jms-common 是为了快速添加 jms-common 组件的脚本命令')
    console.log('create 关联 jms-common 组件库')
    console.log('update 更新当前命令行工具')
    console.log('-v 获取当前命令行版本号')
    console.log('感谢使用')
    break
  default:
    console.log('欢迎使用 link-jms-common 来添加 jms-common 组件');
    console.log('--help 获取帮助');
    start()
    break
}
