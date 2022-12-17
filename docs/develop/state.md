# AyakaState

状态结点

## 如何获取状态结点

```py
from ayaka import AyakaApp

app = AyakaApp("test")
s0 = app.root_state
s1 = app.plugin_state
s2 = app.get_state()
s3 = app.get_state("测试")
s4 = app.get_state(["test","ok"])
s5 = app.get_state("test.ok")

print(s0)
# root

print(s1)
# root.test
print(s2)
# root.test

print(s3)
# root.test.测试

print(s4)
# root.test.test.ok
print(s5)
# root.test.test.ok
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
<<< "user" 说：#对吗
<<< "user" 说：#test
>>>  "Bot" 说：已打开应用 [test]
<<< "user" 说：#对吗
>>>  "Bot" 说：对的
</div>

## 注册进入回调、退出回调

注意：不要在进入、退出回调函数内，调用`app.goto`或`app.set_state`方法

```py
@s1.on_enter()
async def func():
    print("进入s1状态前")

@s1.on_exit()
async def func():
    print("退出s1状态后")
```

## 可以切片

```py
print(app.state)
# root.星际旅行.太阳

print(app.state[2:])
# 太阳
```

但切片后得到的状态结点不位于状态树上

## 下一步

<div align="right">
    在这里~ ↘
</div>
