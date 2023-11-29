# p77-nuxt-app

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```


Uncaught Exception 	{"errorType":"Error","errorMessage":"Could not load Nuxt configuration. Make sure all dependencies are listed in package.json dependencies or in serverFiles within builder options:\n Error: Cannot find module 'esm'\nRequire stack:\n- /var/task/vercel__launcher.js\n- /var/runtime/index.mjs","stack":["Error: Could not load Nuxt configuration. Make sure all dependencies are listed in package.json dependencies or in serverFiles within builder options:"," Error: Cannot find module 'esm'","Require stack:","- /var/task/vercel__launcher.js","- /var/runtime/index.mjs","    at Object.<anonymous> (/var/task/vercel__launcher.js:23:13)","    at Module._compile (node:internal/modules/cjs/loader:1256:14)","    at Module._extensions..js (node:internal/modules/cjs/loader:1310:10)","    at Module.load (node:internal/modules/cjs/loader:1119:32)","    at Module._load (node:internal/modules/cjs/loader:960:12)","    at Module.require (node:internal/modules/cjs/loader:1143:19)","    at require (node:internal/modules/cjs/helpers:119:18)","    at _tryRequireFile (file:///var/runtime/index.mjs:1002:37)","    at _tryRequire (file:///var/runtime/index.mjs:1052:25)","    at _loadUserApp (file:///var/runtime/index.mjs:1081:22)"]}
INIT_REPORT Init Duration: 488.22 ms	Phase: invoke	Status: error	Error Type: Runtime.ExitError
Unknown application error occurred
Runtime.Unknown