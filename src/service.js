const axios = require('axios')

async function query() {
  // const data = await axios.get('https://config.winnerwly.top/jms/link-jms-common.json?t=' + Date.now())
  const data = await axios.get('http://wangliuyin.jms.com/api/cache/link-jms-common?t=' + Date.now())
  return data.data
}

module.exports = { query }
