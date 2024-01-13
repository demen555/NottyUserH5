const { Nuxt, Builder } = require('nuxt');
const app = require('express')();
const dotenv = require('dotenv');
dotenv.config();

const cachePage = require('./lruCache.js')

// 传入配置初始化 Nuxt.js 实例
const config = require('./nuxt.config.js')

async function start(){
  const nuxt = new Nuxt(config);

  // 刷新缓存接口
  app.get('/refreshCache', (req, res, next) => {
    cachePage.reset()
    res.status(200).json({
      status: 100, 
      message: 'Cache refreshed successfully',
    })
  })

  app.get('/getCache', (req, res, next) => {
    const data = cachePage.get('indexPage')
    res.status(200).json({
      status: 100, 
      data: data ? data : null,
    })
  })


  await nuxt.ready();

  app.use(nuxt.render)
  
  // 在开发模式下进行编译
  if (config.dev) {
    new Builder(nuxt).build()
  }
  
  // 监听指定端口
  app.listen(3000, '0.0.0.0')
  console.log('服务器运行于 localhost:3000')
}
start();
