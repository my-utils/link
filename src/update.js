const exec = require('child_process').exec

function update() {
  exec(`npm install -g @y-npm/link`, function (error) {
    if (!error) {
      console.log('更新完成')
    } else {
      console.log('更新失败', error)
    }
  })
}

module.exports = {
  update
}