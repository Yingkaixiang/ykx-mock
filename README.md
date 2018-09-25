# ykx-mock

## 说明

一个简易的 `Mock` 服务器。虽然 `webpack` 的 `devServer` 也可以提供相同的[钩子](https://webpack.docschina.org/configuration/dev-server/#devserver-before)。但是当我们修改 `Mock` 接口相关的代码时 `devServer` 并不会自动重启服务。如果需要实现自动重启就需要借助 `webpack-dev-middleware` 或是 `gulp` 这样的第三方工具才能实现。

## 功能

- [x] 使用 `cors` 跨域
- [ ] 提供常用场景相关 `Mock` 接口

## 安装

```bash
git clone git@github.com:Yingkaixiang/ykx-mock.git

cd ykx-mock && yarn install
```

## 如何使用

```bash
# 默认为 3000 端口
yarn start -p 3001

# http://127.0.0.1:3000
# 将你的项目中的请求地址替换为上方地址既可实现 Mock 功能
```
