const { Nuxt, Builder } = require('nuxt');
const app = require('express')();
const dotenv = require('dotenv');
dotenv.config();

// 传入配置初始化 Nuxt.js 实例
const config = require('./nuxt.config.js')

async function start(){
  const nuxt = new Nuxt(config);

  // 刷新缓存接口
  // app.get('/refreshCache', (req, res, next) => {
  //   cachePage.set('index', null)
  //   res.sendStatus(200)
  // })

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
