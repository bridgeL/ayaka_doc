# API

## app属性一览表
| 名称      | 类型                   | 功能                                           |
| --------- | ---------------------- | ---------------------------------------------- |
| intro     | `str`                  | 应用介绍（设置help后自动生成）                 |
| help      | `str`                  | 当前应用在当前状态下的帮助                     |
| all_help  | `str`                  | 当前应用的所有帮助                             |
| state     | `bool`                 | 当前应用的状态                                 |
| valid     | `bool`                 | 应用在当前设备 是否被启用                      |
| bot       | `Bot`                  | 当前机器人                                     |
| group     | `AyakaGroup`           | 当前群组                                       |
| event     | `MessageEvent`         | 当前消息事件                                   |
| message   | `Message`              | 当前消息                                       |
| arg       | `Message`              | 删除了命令后剩下的消息部分                     |
| args      | `List[MessageSegment]` | 删除命令后，依照分隔符分割，并移除空数据       |
| cmd       | `str`                  | 本次响应是针对哪个命令                         |
| bot_id    | `int`                  | 当前机器人的qq号                               |
| group_id  | `int`                  | 当前群聊的群号                                 |
| user_id   | `int`                  | 当前消息的发送者的qq号                         |
| user_name | `str`                  | 当前消息的发送者的群名片或昵称（优先为群名片） |
| cache     | `AyakaCache`           | 为当前群组当前应用提供的独立缓存数据空间       |

## app方法一览表
| 名称             | 功能                                      | 是否异步 |
| ---------------- | ----------------------------------------- | -------- |
| start            | 运行应用                                  | 是       |
| close            | 关闭应用                                  | 是       |
| send             | 发送消息                                  | 是       |
| send_many        | 发送合并转发消息                          | 是       |
| t_send           | 定时器触发回调时所使用的专用发送消息方法  | 是       |
| set_state        | 设置应用状态（在应用运行时可以设置）      | \        |
| on_command       | 注册闲置时的命令回调                      | \        |
| on_state_command | 注册应用运行时在不同状态下的命令回调      | \        |
| on_text          | 注册闲置时的消息回调                      | \        |
| on_state_text    | 注册应用运行时在不同状态下的消息回调      | \        |
| on_everyday      | 每日定时触发回调（东8区）                 | \        |
| on_interval      | 在指定的时间点后开始循环触发（东8区）     | \        |
| add_listener     | 为该群组添加对 指定私聊 的监听            | \        |
| remove_listener  | 移除该群组对 指定私聊/所有其他私聊 的监听 | \        |

## 下一步

<div align="right">
    在这里~ ↘
</div>
