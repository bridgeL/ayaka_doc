# AyakaApp

首先，你需要导入并初始化一个`AyakaApp`对象

```py
from ayaka import AyakaApp

app = AyakaApp("测试一下")
```

详细api：[https://bridgel.github.io/nonebot-plugin-ayaka/](https://bridgel.github.io/nonebot-plugin-ayaka/)


## bot、event、message

御 三 家

| 名称        | 类型           | 功能         |
| ----------- | -------------- | ------------ |
| app.bot     | `Bot`          | 当前机器人   |
| app.event   | `MessageEvent` | 当前消息事件 |
| app.message | `Message`      | 当前消息     |


## cmd、arg、args

二 代 御 三 家

_在有了[AyakaInput](./input.md)后，args已经没落了（悲（我装的_

| 名称     | 类型                   | 功能                                     |
| -------- | ---------------------- | ---------------------------------------- |
| app.cmd  | `str`                  | 本次响应是针对哪个命令                   |
| app.arg  | `Message`              | 删除了命令后剩下的消息部分               |
| app.args | `List[MessageSegment]` | 删除命令后，依照分隔符分割，并移除空数据 |


## user_name、user_id、group_id

懒 人 三 件 套

| 名称          | 类型  | 功能                                           |
| ------------- | ----- | ---------------------------------------------- |
| app.group_id  | `int` | 当前群聊的群号                                 |
| app.user_id   | `int` | 当前消息的发送者的qq号                         |
| app.user_name | `str` | 当前消息的发送者的群名片或昵称（优先为群名片） |

## start、close、send、send_many

四 大 天 王

都是异步方法

| 名称          | 功能             |
| ------------- | ---------------- |
| app.start     | 运行应用         |
| app.close     | 关闭应用         |
| app.send      | 发送消息         |
| app.send_many | 发送合并转发消息 |

特别的，start可以设置参数，令app运行后进入指定状态

## set_start_cmds

设置启动应用的命令

## state、get_state

详见[AyakaState](./state.md)

## set_state、goto、back

状态转移方法，也都是异步方法

| 名称          | 功能                                   |
| ------------- | -------------------------------------- |
| app.set_state | 令当前群组的状态变为指定的另一状态     |
| app.goto      | 与app.set_state一样                    |
| app.back      | 令当前群组的状态变为其当前状态的父状态 |

## on_xxx 注册回调

- on_cmd
- on_state
- on_deep_all
- on_no_block

鸽了

## add_listener、remove_listener

| 名称                | 功能                     |
| ------------------- | ------------------------ |
| app.add_listener    | 为该群组添加对私聊的监听 |
| app.remove_listener | 移除该群组对私聊的监听   |

## 其他

| 名称       | 类型                   | 功能                                     |
| ---------- | ---------------------- | ---------------------------------------- |
| app.name   | `str`                  | 应用名称                                 |
| app.bot_id | `int`                  | 当前机器人的qq号                         |
| app.group  | `AyakaGroup`           | 当前群组                                 |
| app.cache  | `Dict[str,AyakaCache]` | 为当前群组当前应用提供的独立缓存数据空间 |

<!--
## t_send、t_send_many


 ## 闲置

在没有任何应用运行时，群聊处于闲置状态，此时注册的所有`on.idle`回调都可以响应，而`on.state`则无法响应，因为它们都依赖于相关应用的状态，而闲置时没有应用运行

运行应用后，注册在对应应用下的`on.state`回调可以响应，而普通的`on.idle`无法响应，但对于设置了`super=True`的特殊的`on.idle`仍可以响应

这种设计可以帮助一些有特殊需要的`无状态应用`在`有状态应用`运行时仍可响应用户的指令

## 时间驱动

定时器定时触发回调

触发时，回调无法通过分析消息得到各类信息（bot/group/message/event/sender等）

因此有很多方法和属性都无法访问

发送消息请使用专用的`app.t_send`/`app.t_send_many`，并且需要提供目标bot和群组的id

### app.on.interval(gap: int, h: int = -1, m: int = -1, s: int = -1)
在指定的时间点后循环触发

### app.on.everyday(h: int, m: int, s: int)
每日定时触发 -->

## 下一步

<div align="right">
    在这里~ ↘
</div>
