# 已废弃界面

# AyakaApp

首先，你需要导入并初始化一个`AyakaApp`对象

```py
from ayaka import AyakaApp

app = AyakaApp("测试一下")
```

## bot、event、message

御 三 家

| 名称        | 类型           | 功能         |
| ----------- | -------------- | ------------ |
| app.bot     | `Bot`          | 当前机器人   |
| app.event   | `MessageEvent` | 当前消息事件 |
| app.message | `Message`      | 当前消息     |


## cmd、arg、args

二 代 御 三 家

| 名称     | 类型                   | 功能                                     |
| -------- | ---------------------- | ---------------------------------------- |
| app.cmd  | `str`                  | 本次响应是针对哪个命令                   |
| app.arg  | `Message`              | 删除了命令后剩下的消息部分               |
| app.args | `List[MessageSegment]` | 删除命令后，依照分隔符分割，并移除空数据 |

<div class="demo">
"user" 说：#得到的 水电费   来看看
"sys" 说：app.cmd = "得到的"
"sys" 说：app.arg = "水电费   来看看"
"sys" 说：app.args = ["水电费","来看看"]
</div>


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


| 名称             | 功能                                               |
| ---------------- | -------------------------------------------------- |
| app.on_cmd       | 注册为命令回调，参数表可以写多个命令（默认为阻断） |
| app.on_text      | 注册为消息回调（默认为不阻断）                     |
| app.on_state     | 注册在指定状态下，参数表可以写多个状态             |
| app.on_idle      | 注册在闲置状态下                                   |
| app.on_deep_all  | 声明该回调对所有子状态生效                         |
| app.on_no_block  | 设置该回调触发后不阻断上溯查找                     |
| app.on_cmd_regex | 注册为命令回调，通过正则表达式匹配命令             |
| app.on_everyday  | 注册每日定时任务，可设置起点                       |
| app.on_interval  | 注册定时任务，可设置起点和周期                     |

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

## t_send、t_send_many

都是异步方法

| 名称            | 功能             |
| --------------- | ---------------- |
| app.t_send      | 发送消息         |
| app.t_send_many | 发送合并转发消息 |

在定时任务时发送消息请使用该方法，而不是send和send_many

因为定时器触发时，回调无法通过分析消息（压根就没有消息）得到各类信息（bot/group/message/event/sender等）

因此有很多方法和属性都无法访问

发送消息请使用专用的`app.t_send`/`app.t_send_many`，并且需要提供目标bot和群组的id

## 下一步

<div align="right">
    在这里~ ↘
</div>
