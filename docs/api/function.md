起看来很是乱因为这是自动生的成

## def app.plugin_storage(*names, default=None):
以app_name划分的独立存储空间，可以实现跨bot、跨群聊的数据共享

## def app.group_storage(*names, default=None):
*timer触发时不可用*

以bot_id、group_id、app_name三级划分分割的独立存储空间

## async app.start():
*timer触发时不可用*

启动应用，并发送提示

## async app.close():
*timer触发时不可用*

关闭应用，并发送提示

## def app.set_state(state: str = INIT_STATE):
*timer触发时不可用*

设置应用|群组当前状态

## def app.on_command(cmds: Union[List[str], str], super=False):
注册闲置命令

## def app.on_state_command(cmds: Union[List[str], str], states: Union[List[str], str] = INIT_STATE):
注册应用运行时不同状态下的命令

## def app.on_text(super=False):
注册闲置消息

## def app.on_state_text(states: Union[List[str], str] = INIT_STATE):
注册应用运行时不同状态下的消息

## def app.on_everyday(h: int, m: int, s: int):
每日定时触发

## def app.on_interval(gap: int, h: int = -1, m: int = -1, s: int = -1):
在指定的时间点后循环触发

## def app.add_listener(user_id: int):
为该群组添加对指定私聊的监听

## def app.remove_listener(user_id: int = 0):
默认移除该群组对其他私聊的所有监听

## async def app.send(message):
发送消息，消息的类型可以是 Message | MessageSegment | str

## async def app.send_many(messages):
发送合并转发消息，消息的类型可以是 List[Message | MessageSegment | str]

## async def app.t_send(bot_id: int, group_id: int, message):
timer触发回调时，想要发送消息必须使用该方法，一些上下文亦无法使用

## def group.get_app(name: str):
根据app名获取该group所启用的app，不存在则返回None

## def group.set_state(name: str, state: str):
设置该group的状态

## def group.permit_app(name: str):
启用指定app

## def group.forbid_app(name: str):
禁用指定app

## def get_bot(bot_id: int):
获取已连接的bot

## def get_group(bot_id: int, group_id: int):
获取对应的AyakaGroup对象，自动增加

## def load_plugins(path: Path, base=""):
导入指定路径内的全部插件，如果是外部路径，还需要指明前置base

## async def get_new_page(size=None, **kwargs) -> AsyncIterator[Page]:
 获取playwright Page对象，size接受二元数组输入，设置屏幕大小 size = [宽,高]

使用示例：
```
async with get_new_page(size=[200,100]) as p:
await p.goto(...)
await p.screenshot(...)
```

## 下一步

<div align="right">
    在这里~ ↘
</div>
