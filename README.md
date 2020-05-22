# 微信活码

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### 页面回显文件
```
show.html
```

```
微信活码系统

该系统使用Vue.js结合element-ui来做前端页面的展示。
微信群二维码存在有效期，和扫描次数限制，实现一个活码，可以让二维码一直生效，不受有效期和扫描次数限制。
主要功能：
  活码管理，子码管理，用户管理
  用户新建一个活码时，可以把对应的子码，阈值，有效期等一并传递到后台，生成一个活码返回给前台，
  当活码扫描次数用完后，可以给当前活码添加子码以保证一直有活码可以使用。
  数据主要存储，通过VueX状态管理器来保存数据，数据持久化存储通过Vuex-persist插件来实现。
  活码，子码的预览只要通过v-viewer插件来实现。
```
