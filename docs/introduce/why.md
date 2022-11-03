# 为什么使用ayaka

ayaka希望帮助开发者更轻松地控制应用状态，并避免不同插件间的命令重名导致的冲突问题

## 命令隔离

ayaka将每一个`插件`都视为一个`应用`，每一个`群聊`视为一个`设备`

设备平时处于`闲置状态`，你可以通过命令打开一个应用，令其运行

随后，该设备将 **只响应** 该应用相关的命令

例如：插件A（应用A）和插件B（应用B）都使用了一个`查询`的命令，那么设备将响应哪一个呢？

ayaka的解决方式是，你需要先运行`应用A`和`应用B`中的一个，之后才可以使用`查询`命令，正在运行的应用进行响应

## 状态机

假设我们现在需要做一个旅游小游戏插件，你在不同的星球（状态）可以干不同的事，产生不同的后果，那么应该怎么做呢？

### 需求如下

| 地点     | 动作        | 效果                     |
| -------- | ----------- | ------------------------ |
| 地球     | jump        | 一跳两米高               |
| 地球     | hit         | 你全力一击，制造了大地震 |
| 月球     | jump        | 你离开了月球...永远的... |
| 太阳     | drink       | 你感觉肚子暖洋洋的       |
| 任意地点 | goto <名字> | 去另一个星球             |
| 任意地点 | hi          | 你好, <名字>!            |

### 编写代码

```py
from ayaka import AyakaApp

app = AyakaApp("星际旅行")
app.help = "xing ji lv xing"


# 启动应用
@app.on.idle()
@app.on.command("星际旅行")
async def app_start():
    '''打开应用'''
    # 设置初始状态为地球
    await app.start("地球")


# 星球
earth = app.on.state("地球")
moon = app.on.state("月球", "月亮")
sun = app.on.state("太阳")
all = app.on.state("*")

# 动作
hi = app.on.command("hi", "你好")
hit = app.on.command("hit", "打")
jump = app.on.command("jump", "跳")
drink = app.on.command("drink", "喝")


@earth
@jump
async def handle():
    '''跳一跳'''
    await app.send("一跳两米高")


@earth
@hit
async def handle():
    '''打一打'''
    await app.send("你全力一击，制造了大地震")


@moon
@jump
async def handle():
    '''跳一跳'''
    await app.send("你离开了月球...永远的...")


@sun
@drink
async def handle():
    '''drink 1 drink'''
    await app.send("你感觉肚子暖洋洋的")


@all
@hi
async def handle():
    '''打个招呼'''
    await app.send(f"你好, {app.state}!")


@all
@app.on.command("goto")
async def handle():
    '''去其他地方转转'''
    name = str(app.arg)
    print(f"[{name}]")
    app.state = name
    await app.send(f"你动身前往{name}")


# 关闭应用
@all
@app.on.command("exit", "quit", "退出")
async def handle():
    '''退出'''
    await app.close()
```

TO BE CONTINUE
<!-- 
## 多层次的状态

在刚才的旅游小游戏的基础上，我们希望能再加点功能，比如，可以在地球上去饮品店买奶茶，可以去地心管理局买地心公园的门票

### 需求如下

| 地点            | 动作 | 效果                     |
| --------------- | ---- | ------------------------ |
| 地球.奶茶店     | jump | 一跳两米高               |
| 地球.地心售票处 | hit  | 你全力一击，制造了大地震 | -->

