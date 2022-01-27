
const exec = require('child_process').exec
const inquirer = require('inquirer')

function create(gitList) {
  inquirer
    .prompt([{
      type: 'list',
      name: 'value',
      message: '请选择需要应用的版本:',
      default: 0,
      choices: gitList
    }, {
      type: 'list',
      name: 'branch',
      message: '请选择需要应用的代码分支:',
      default: 'master',
      choices: [
        { value: 'hotfix', name: 'hotfix' },
        { value: 'master', name: 'master' },
        { value: 'test', name: 'test' },
        { value: 'dev', name: 'dev' },
      ]
    }])
    .then(answers => {
      const item = gitList.find(i => i.value === answers.value)
      console.log('仓库地址 >> ', item.gitUrl)
      console.log('需要应用的分支 :>> ', answers.branch);
      confirm(item)
    })
    .catch(error => {
      console.log('error :>> ', error)
    })

  function confirm(item) {
    inquirer
      .prompt([{
        type: 'list',
        name: 'bool',
        message: `请确认是否将 ${item.name} 的组件库应用到本地`,
        default: 0,
        choices: [
          { value: true, name: '确认' },
          { value: false, name: '取消' },
        ]
      }])
      .then(answers => {
        if (answers.bool) {
          clone(item.gitUrl, answers.branch)
        } else {
          console.log('取消操作 :>> ')
        }
      })
      .catch(error => {
        console.log('error :>> ', error)
      })
  }

  function clone(gitUrl, branch) {
    function clear(fn) {
      exec(`rm -rf src/jms-common`, function (error) {
        if (!error) {
          console.log('清除完成')
          fn()
        } else {
          console.log('清除目录异常', error)
        }
      })
    }

    clear(function () {
      const shell = `git clone -b ${branch} ${gitUrl} src/jms-common`
      console.log('克隆中 :>> ', shell)
      exec(shell, function (error) {
        if (!error) {
          console.log('克隆完成')
        } else {
          console.log('克隆失败', error)
        }
      })
    })
  }
}

module.exports = { create }
