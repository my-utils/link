const exec = require('child_process').exec
const inquirer = require('inquirer')
const path = require('path')
const del = require('del')
const ora = require('ora');

const mySpinner = ora('获取远程数据中')

function create(gitList) {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'gitUrl',
        message: '请选择需要应用的版本:',
        default: 0,
        choices: gitList
      }, {
        type: 'list',
        name: 'branch',
        message: '请选择需要应用的代码分支:',
        default: 'master',
        choices: [
          {value: 'production', name: 'production'},
          {value: 'hotfix', name: 'hotfix'},
          {value: 'master', name: 'master'},
          {value: 'test', name: 'test'},
          {value: 'dev', name: 'dev'},
        ]
      },
      {
        type: 'list',
        name: 'bool',
        message: `请确认是否将组件库应用到本地`,
        default: 0,
        choices: [
          {value: true, name: '确认'},
          {value: false, name: '取消'},
        ]
      }
    ])
    .then(answers => {
      const item = gitList.find(i => i.value === answers.gitUrl)
      console.log('仓库地址:', item.gitUrl)
      console.log('需要应用的分支:', answers.branch);
      if (answers.bool) {
        clone(item.gitUrl, answers.branch)
      } else {
        console.log('操作已取消')
      }
    })
    .catch(error => {
      console.log('错误信息:', error)
    })
  
  function clone(gitUrl, branch) {
    function clear(fn) {
      try {
        const delinfo = del.sync(path.join(process.cwd(), 'src/jms-common'))
        console.log('清除完成', delinfo)
        fn()
      } catch (error) {
        console.log('错误信息:', error)
      }
    }
    
    clear(function () {
      const shell = `git clone -b ${branch} ${gitUrl} src/jms-common`
      console.log('克隆中:', shell)
      mySpinner.start()
      exec(shell, function (error) {
        mySpinner.stop()
        if (!error) {
          console.log('克隆成功')
          del.sync(path.join(process.cwd(), 'src/jms-common/.git'))
          console.log('自动清楚 jms-common中的 .git')
        } else {
          console.log('克隆失败', error)
        }
      })
    })
  }
}

module.exports = {create}
