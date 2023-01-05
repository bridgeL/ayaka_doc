# AyakaBox

首先，你需要导入并初始化一个`AyakaBox`对象

```py
from ayaka import AyakaBox

box = AyakaBox("test")
```

## 常用计算属性

| 名称        | 类型                 | 功能                       |
| ----------- | -------------------- | -------------------------- |
| box.bot     | `Bot`                | 当前机器人                 |
| box.event   | `MessageEvent`       | 当前消息事件               |
| box.message | `Message`            | 当前消息                   |
| box.arg     | `Message`            | 删除了命令后剩下的消息部分 |
| box.args    | `list[MessageSegment | str]`                      | 删除命令后，依照分隔符分割，并移除空数据 |

<div class="demo">
"user" 说：#test 水电费   来看看
"sys" 说：box.arg = "水电费   来看看"
"sys" 说：box.args = ["水电费","来看看"]
</div>


## user_name、user_id、group_id

| 名称          | 类型  | 功能                                           |
| ------------- | ----- | ---------------------------------------------- |
| box.group_id  | `int` | 当前群聊的群号                                 |
| box.user_id   | `int` | 当前消息的发送者的qq号                         |
| box.user_name | `str` | 当前消息的发送者的群名片或昵称（优先为群名片） |

## start、close、send、send_many、set_state

都是异步方法

| 名称          | 功能                               |
| ------------- | ---------------------------------- |
| box.start     | 运行盒子                           |
| box.close     | 关闭盒子                           |
| box.set_state | 令当前群组的状态变为指定的另一状态 |
| box.send      | 发送消息                           |
| box.send_many | 发送合并转发消息                   |

特别的，box.start可以设置参数，令box运行后进入指定状态

## set_start_cmds、set_close_cmds

| 名称               | 功能               |
| ------------------ | ------------------ |
| box.set_start_cmds | 设置打开盒子的命令 |
| box.set_close_cmds | 设置关闭盒子的命令 |


## on_xxx 注册回调

| 名称        | 功能                                               |
| ----------- | -------------------------------------------------- |
| box.on_cmd  | 注册为命令回调，参数表可以写多个命令（默认为阻断） |
| box.on_text | 注册为消息回调（默认为不阻断）                     |

## add_listener、remove_listener

| 名称                | 功能                     |
| ------------------- | ------------------------ |
| box.add_listener    | 为该群组添加对私聊的监听 |
| box.remove_listener | 移除该群组对私聊的监听   |

## 其他

| 名称       | 类型         | 功能                                     |
| ---------- | ------------ | ---------------------------------------- |
| box.name   | `str`        | 盒子名称                                 |
| box.bot_id | `int`        | 当前机器人的qq号                         |
| box.group  | `AyakaGroup` | 当前群组                                 |
| box.cache  | `dict`       | 为当前群组当前盒子提供的独立缓存数据空间 |

## 下一步

<div align="right">
    在这里~ ↘
</div>
