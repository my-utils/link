const fs = require('fs')
const path = require('path')

const configFilePath = path.join(__dirname, '../', 'config.json')
// 写入配置信息
function writeConfig(data) {
  fs.writeFileSync(configFilePath, JSON.stringify(data, null, '  '), { encoding: 'utf-8' })
  console.log('配置信息写入成功 :>> ');
}

// 读取配置信息
function readConfig() {
  try {
    const list = fs.readFileSync(configFilePath, { encoding: 'utf-8' })
    return JSON.parse(list)
  } catch (err) {
    return {}
  }
}

module.exports = {
  writeConfig,
  readConfig
}
