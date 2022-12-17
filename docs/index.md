# Ayaka - 为群聊插件开发提供状态机支持

基于[nonebot2](https://github.com/nonebot/nonebot2)和[OnebotV11协议](https://github.com/botuniverse/onebot-11)，为群聊插件开发提供状态机支持

<img src="https://img.shields.io/pypi/pyversions/nonebot-plugin-ayaka">

单独安装本插件没有意义，本插件的意义在于帮助衍生插件实现功能

## 简单介绍

ayaka可以提供：

- 命令隔离
- 数据隔离
- 状态机

ayaka为每个群聊设计了一个`AyakaGroup`类，提供了一个状态机和一个全局字典，帮助实现命令空间的隔离、数据空间的隔离

更多：

- ayaka为一些常见的需要获取的值（例如user_id，user_name）设置了快捷访问的方法
- ayaka增加了`AyakaConfig`、`AyakaDB`等类，帮助插件读写配置文件和数据库等
- ayaka能自动生成帮助
- 可以通过`ayaka_test`在离线环境下对插件进行简单测试

## 注意

- ayaka默认插件工作在群聊中，其默认仅监听群聊消息。不过，可以使用[add_listener](./api/ayaka/ayaka.html#AyakaApp.add_listener)，令ayaka接受某私聊的消息，ayaka将该消息视为来自群聊
- 本站搜索栏如果搜不到想要的内容，可以尝试将关键词分割为更小的单位（MkDocs对中文搜索的支持较差）

## 相关链接

[ayaka仓库](https://github.com/bridgeL/nonebot-plugin-ayaka)

[ayaka文档仓库](https://github.com/bridgeL/ayaka_doc) 

[基于ayaka的小游戏合集](https://github.com/bridgeL/nonebot-plugin-ayaka-games)

## 下一步

<div align="right">
    在这里~ ↘
</div>
