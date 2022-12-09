如果需要临时保存一些数据，以供应用在不同时刻/函数中使用，那么需要使用缓存

`app.cache`中提供了一些有益的api


## 快速上手

```py
@app.on.idle(...)
@app.on.command(...)
async def _():
    ...
    uid = app.user_id
    money = 10
    app.cache.chain(uid,"money").set(money)
    ...

@app.on.idle(...)
@app.on.command(...)
async def _():
    ...
    uid = app.user_id
    # 如果已经设置了值，则返回10，否则返回缺省值0
    money = app.cache.chain(uid, "money").get(0) 
    ...
```


## AyakaCacheCtrl.chain

json文件可以设置多层key，但是读写时往往遇到困难，例如

`data["haha"]["ee"]["your name"]["wtf"] = 2`

你需要先层层设置，最终才可赋值

```py
data = {}
data["haha"] = {}
data["haha"]["ee"] = {}
data["haha"]["ee"]["your name"] = {}
data["haha"]["ee"]["your name"]["wtf"] = 2
```

`AyakaCacheCtrl`被用于解决这一困难

```py
from ayaka.cache import AyakaCacheCtrl

data = AyakaCacheCtrl()
ctrl = data.chain("haha", "ee", "your name", "wtf")
# 读取数据, 缺省值0
print(ctrl.get(0)) # 0
# 设置数据
print(ctrl.set(3)) # 3
# 再次读取
print(ctrl.get(0)) # 3
# 查看整体
print(data) # {"haha":{"ee":{"your name":{"wtf":3}}}}
```

### 链式写法

注意：`AyakaCacheCtrl.chain() -> AyakaCacheCtrl`

chain的返回值，仍然是一个AyakaCacheCtrl对象，因此你可以

```py
ctrl = data.chain("haha", "ee").chain("your name").chain("wtf")
```

### 如何获取AyakaCacheCtrl

无需您自行创建`AyakaCacheCtrl对象`，直接访问`app.cache`即可获取

通过`app.cache`获得的`AyakaCacheCtrl对象`将与当前消息所在的群聊id、机器人id、应用名进行**唯一绑定**，也就是说，当您在其他插件或其他群聊或其他机器人中获取的`AyakaCacheCtrl对象`是相互独立的

通过`app.cache`获得的`AyakaCacheCtrl对象`不会因为当前消息处理结束而销毁，因此可以在同一机器人、同一群聊、同一插件的情况下，通过`app.cache`来保存一些临时性的信息，例如：

- 当用户发送指令A时，通过缓存保存该用户的名称
- 再等到用户发送指令B时，通过缓存获取之前保存的名称

注意：bot重启后，`app.cache`数据会丢失

## 其他用法（不推荐）

```py
print(app.cache.name) # None
app.cache.name = "a"
print(app.cache.name) # a
```

## 下一步

<div align="right">
    在这里~ ↘
</div>

