## 无参数

注册的回调函数必须是没有参数的异步函数

若需要获取参数，请直接访问对应app属性

例如：

- 获取事件 app.event
- 获取消息 app.message
- 获取分割后的消息 app.args
- 获取用户id app.user_id
- 获取用户名 app.user_name
- ...

## 消息驱动

在收到消息后触发的回调

### app.on.idle(super=False)
注册设备闲置时的回调

### app.on.state(*states:str)
注册应用运行在不同状态时的回调

### app.on.command(*cmds: str)
注册命令回调

### app.on.text()
注册消息回调

## 使用顺序

必须是如下的先后顺序

```py
@app.on.state(...) / @app.on.idle(...)
@app.on.command(...) / @app.on.text()
async def handle():
    ...
```

4种组合皆可

## 闲置

在没有任何应用运行时，群聊处于闲置状态，此时注册的所有`on.idle`回调都可以响应，而`on.state`则无法响应，因为它们都依赖于相关应用的状态，而闲置时没有应用运行

运行应用后，注册在对应应用下的`on.state`回调可以响应，而普通的`on.idle`无法响应，但对于设置了`super=True`的特殊的`on.idle`仍可以响应

这种设计可以帮助一些有特殊需要的`无状态应用`在`有状态应用`运行时仍可响应用户的指令

## 时间驱动

定时触发回调

触发时，回调无法通过分析消息得到各类信息（bot/group/message/event/sender等）

因此有很多方法和属性都无法访问

发送消息请使用专用的`app.t_send`/`app.t_send_many`，并且需要提供目标bot和群组的id

### app.on.interval(gap: int, h: int = -1, m: int = -1, s: int = -1)
在指定的时间点后循环触发

### app.on.everyday(h: int, m: int, s: int)
每日定时触发

## 下一步

<div align="right">
    在这里~ ↘
</div>
