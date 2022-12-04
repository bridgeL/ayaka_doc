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

`app = AyakaApp("示例插件")`

ayaka为每个群聊提供了一个状态机，通过`app.on.command()`,`app.on.text()`,`app.on.idle()`,`app.on.state()`等API的组合，你可以为每个状态设定回调函数和触发指令等等，而回调函数内也可以通过`app.state = "其他状态一号"`或`app.set_state("其他状态一号")`让群聊进入其他状态

ayaka也为每个群聊提供了一个公用字典，通过`app.cache.变量一号`和`app.cache.变量一号 = 10`即可读写数据（不过，更推荐使用`app.cache.get("变量一号")`和`app.cache.set("变量一号", 10)`

这样，在开发多人交互的小游戏时，节约了写全局字典和状态机的时间

## 相关链接

[ayaka仓库](https://github.com/bridgeL/nonebot-plugin-ayaka)

[ayaka文档仓库](https://github.com/bridgeL/ayaka_doc) 

[基于ayaka的小游戏合集](https://github.com/bridgeL/nonebot-plugin-ayaka-games)

## 下一步

<div align="right">
    在这里~ ↘
</div>
