const LRU = require('lru-cache')

const cachePage = new LRU({
  max: 10,
  maxAge: 1000 * 60 * 15
})

module.exports = cachePage