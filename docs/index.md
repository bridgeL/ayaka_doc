# Ayaka - 文字游戏开发辅助插件

适用于[nonebot2机器人](https://github.com/nonebot/nonebot2)的文字游戏开发辅助插件 

<img src="https://img.shields.io/pypi/pyversions/nonebot-plugin-ayaka">

ayaka 二次封装nonebot2提供的api，提供了专用api

从而为其他文字游戏插件（衍生插件）的编写提供支持

单独安装本插件没有意义，本插件的意义在于帮助衍生插件实现功能

## 注意

1. ayaka默认插件工作在群聊中，其默认仅监听群聊消息；若想监听私聊消息，请使用[add_listener](https://bridgel.github.io/nonebot-plugin-ayaka/ayaka/ayaka.html#AyakaApp.add_listener)
2. 本站搜索栏如果搜不到数据，可以尝试将关键词分割为更小的单位（MkDocs对中文搜索的支持较差）

## 简单介绍

nonebot默认是以一次会话为单位处理事务，会话结束后东西就丢掉了，而且同一群聊内的多个会话之间的数据也是不互通的

如果想实现多人的在同一群聊内的交互，还是比较麻烦的，需要写个全局字典，保存不同群聊的临时数据

因此写了ayaka来解决这个问题

- ayaka为每个群聊设计了一个`AyakaGroup`类，提供了一个状态机和一个全局字典，帮助实现命令空间的隔离、数据空间的隔离
- ayaka增加了`AyakaConfig`、`AyakaDB`等类，帮助插件读写配置文件和数据库等
- ayaka为一些常见的需要获取的值（例如user_id，user_name）设置了快捷访问的方法

## 相关链接

[ayaka仓库](https://github.com/bridgeL/nonebot-plugin-ayaka)

[ayaka文档仓库](https://github.com/bridgeL/ayaka_doc) 

[基于ayaka的小游戏合集](https://github.com/bridgeL/nonebot-plugin-ayaka-games)

## 下一步

<div align="right">
    在这里~ ↘
</div>
