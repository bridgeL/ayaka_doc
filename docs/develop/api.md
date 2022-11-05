
```py
from ayaka import AyakaApp

app = AyakaApp("helloooooo")
```

## app属性

### 常用

| 名称      | 类型                   | 功能                                           |
| --------- | ---------------------- | ---------------------------------------------- |
| help      | `str`                  | 当前应用在当前状态下的帮助                     |
| state     | `bool`                 | 当前应用的状态                                 |
| bot       | `Bot`                  | 当前机器人                                     |
| group     | `AyakaGroup`           | 当前群组                                       |
| event     | `MessageEvent`         | 当前消息事件                                   |
| message   | `Message`              | 当前消息                                       |
| args      | `List[MessageSegment]` | 删除命令后，依照分隔符分割，并移除空数据       |
| group_id  | `int`                  | 当前群聊的群号                                 |
| user_id   | `int`                  | 当前消息的发送者的qq号                         |
| user_name | `str`                  | 当前消息的发送者的群名片或昵称（优先为群名片） |
| cache     | `AyakaCache`           | 为当前群组当前应用提供的独立缓存数据空间       |

### 常不用

| 名称     | 类型      | 功能                           |
| -------- | --------- | ------------------------------ |
| name     | `str`     | 应用名称                       |
| intro    | `str`     | 应用介绍（设置help后自动生成） |
| all_help | `str`     | 当前应用的所有帮助             |
| arg      | `Message` | 删除了命令后剩下的消息部分     |
| cmd      | `str`     | 本次响应是针对哪个命令         |
| bot_id   | `int`     | 当前机器人的qq号               |

## app方法

### 异步方法

| 名称      | 功能             |
| --------- | ---------------- |
| start     | 运行应用         |
| close     | 关闭应用         |
| send      | 发送消息         |
| send_many | 发送合并转发消息 |

定时器触发回调时所使用的专用发送消息方法

| 名称        | 功能             |
| ----------- | ---------------- |
| t_send      | 发送消息         |
| t_send_many | 发送合并转发消息 |

### 同步方法

注册回调

| 名称        | 功能                                  |
| ----------- | ------------------------------------- |
| on.idle     | 注册设备闲置时的回调                  |
| on.state    | 注册应用运行在不同状态时的回调        |
| on.command  | 注册命令回调                          |
| on.text     | 注册消息回调                          |
| on.everyday | 每日定时触发回调（东8区）             |
| on.interval | 在指定的时间点后开始循环触发（东8区） |

读取本地文件数据

| 名称                | 功能                                             |
| ------------------- | ------------------------------------------------ |
| storage.group_path  | 路径`data/groups/<bot_id>/<group_id>/<app_name>` |
| storage.plugin_path | 路径`<create_app_file>/../`                      |

添加对私聊的监听

| 名称            | 功能                     |
| --------------- | ------------------------ |
| add_listener    | 为该群组添加对私聊的监听 |
| remove_listener | 移除该群组对私聊的监听   |

## 下一步

<div align="right">
    在这里~ ↘
</div>
