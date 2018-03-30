# spa 框架快速同步配置生成接口(angular2 篇) 

## 背景
随着 angular, vue, react 等 spa 框架的普及，前后端分离的开发方式已经成为了主流，而由于前后端的并行开发，接口联调则成为了经常会出现问题的环节。前后端接口（Interface）的调用本身实际上可看作前后端数据的调用过程，而 http 只是实现前后端接口调用的手段而已。我们应讲

## 使用 [Easy-mock](https://github.com/easy-mock/easy-mock/blob/dev/README.zh-CN.md) 书写接口文档
Easy Mock 是一个可视化，并且能快速生成模拟数据的持久化服务，具有以下特性：
* 支持接口代理
* 支持快捷键操作
* 支持协同编辑
* 支持团队项目
* 支持 RESTful
* 支持 Swagger | OpenAPI Specification (1.2 & 2.0 & 3.0)
* 基于 Swagger 快速创建项目
* 支持显示接口入参与返回值
* 支持显示实体类
* 支持灵活性与扩展性更高的响应式数据开发
* 支持自定义响应配置（例：status/headers/cookies）
* 支持 Mock.js 语法
* 支持 restc 方式的接口预览

Easy Mock 可通过 Swagger 同步接口，并可使用 Mock.js 语法生成丰富的接口数据供前端调用，满足了接口文档和 mock 服务器所需的全部功能。

## 从 Easy-mock 同步接口配置生成 angular service
前后端接口（Interface）的调用本身实际上可看作前后端数据的调用过程，而 http 只是实现前后端接口调用的手段而已，所以我们