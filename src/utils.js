const fs = require('fs')

// 写入缓存信息
function writeCache(data) {
  const res = fs.writeFileSync('cache.json', JSON.stringify(data, null, '  '), { encoding: 'utf-8' })
  console.log('res :>> ', res);
}

// 读取缓存信息
function readCache() {
  try {
    const list = fs.readFileSync('cache.json', { encoding: 'utf-8' })
    return JSON.parse(list)
  } catch (err) {
    return []
  }
}

// 添加数据到缓存中
function addCache(data) {
  const list = readCache()
  const item = list.find(i => i.name === data.name)
  if (item) {
    console.log(`${data.name} 这个名称已经被使用`)
    return
  }
  list.push({ value: list.length + 1, ...data })
  writeCache(list)
}

function removeCacheByName(name) {
  if (!name) {
    console.log('缺少必要的参数')
    return
  }
  const list = readCache()
  const newList = list.filter(i => i.name !== name)
  writeCache(newList)
}

module.exports = {
  writeCache,
  readCache,
  addCache,
  removeCacheByName
}
