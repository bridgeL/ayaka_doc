# AyakaState

状态结点

## 如何获取状态结点

```py
from ayaka import AyakaApp

app = AyakaApp("test")
s1 = app.get_state()
s2 = app.get_state("测试")
s3 = app.get_state("test", "ok")

print(s1)
# root.test

print(s2)
# root.test.测试

print(s3)
# root.test.test.ok
```

## 如何获取根状态结点

```py
from ayaka import AyakaApp

app = AyakaApp("test")
s0 = app.root_state

print(s0)
# root
```

## 注册命令回调、消息回调

状态结点也可以直接注册命令回调、消息回调

事实上，`app.on_xxx`系列装饰器就是直接对相应的状态结点操作的

```py
from ayaka import AyakaApp

app = AyakaApp("test")
s0 = app.root_state
s1 = app.get_state()


@s0.on_cmd(["test"], app)
async def func():
    await app.start()


@s1.on_cmd(["对吗"], app)
async def func():
    await app.send("对的")
```

<div class="demo">
<<< "user" 说：对吗
<<< "user" 说：test
>>>  "Bot" 说：已打开应用 [test]
<<< "user" 说：对吗
>>>  "Bot" 说：对的
</div>

## 注册进入回调、退出回调

注意：不要在进入、退出回调函数内，调用`app.goto`或`app.set_state`方法

## 下一步

<div align="right">
    在这里~ ↘
</div>
