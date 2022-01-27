#!/usr/bin/env node
const { create } = require('./src/create')
const { update } = require('./src/update')
const { writeCache, readCache, addCache, removeCacheByName } = require('./src/utils')
const package = require('./package.json')

const gitList = [
  { value: 1, gitUrl: 'ssh://git@code.jms.com:2222/yl-web/jms-common.git', name: '国内jms' },
  { value: 2, gitUrl: 'ssh://git@code.jms.com:2222/project/jfs/web/jfs-common-web-front.git', name: '印尼jfs' },
  { value: 3, gitUrl: 'ssh://git@code.jms.com:2222/project/jfsmy/web/jfsmy-common-web-front.git', name: '马来jfs' },
  { value: 4, gitUrl: 'ssh://git@code.jms.com:2222/framework/framework1.0/web/components/micro-web-common.git', name: '埃及jms' }
]

const type = process.argv[2]

switch (type) {
  case '-v':
    console.log('当前版本号', package.version)
    break
  case 'init':
    writeCache(gitList)
    break
  case 'create':
    const list = readCache()
    if (list.length === 0) {
      console.log('请先初始化数据')
    } else {
      create(list)
    }
    break
  case 'update':
    update()
    break
  case 'del':
    const delName = process.argv[3]
    removeCacheByName(delName)
    break
  case 'add':
    const name = process.argv[3]
    const gitUrl = process.argv[4]
    if (name && gitUrl) {
      addCache({ gitUrl: gitUrl, name: name })
    } else {
      console.log('添加的数据不完整')
    }
    break
  case '--help':
    console.log('link-jms-common 是为了快速添加 jms-common 组件的脚本命令')
    console.log('init 初始化命令行工具')
    console.log('create 关联 jms-common 组件库')
    console.log('update 更新当前命令行工具')
    console.log('add [name] [url] 添加jms版本库')
    console.log('del [name] 删除jms版本库')
    console.log('感谢使用')
    break
  default:
    console.log('欢迎使用 link-jms-common 来添加 jms-common 组件');
    console.log('--help 获取帮助');
    break
}
