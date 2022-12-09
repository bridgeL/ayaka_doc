# 快速开始

编写一个星际旅行插件

## 基本使用

| 地点     | 动作        | 效果          |
| -------- | ----------- | ------------- |
| 地球     | drink       | 喝水          |
| 月球     | drink       | 喝土          |
| 太阳     | drink       | 喝太阳风      |
| 任意地点 | move <地名> | 去指定地点    |
| 任意地点 | hi          | 你好, <地名>! |

```py
from pydantic import Field
from ayaka import AyakaApp, AyakaInput

app = AyakaApp("星际旅行")
app.help = "xing ji lv xing"

# 启动应用
app.set_start_cmds("星际旅行", "travel")

# 装饰器的顺序没有强制要求，随便写


# 关闭应用
@app.on_state()
@app.on_deep_all()
@app.on_cmd("退出", "exit")
async def exit_app():
    await app.close()


# 注册各种行动
@app.on_cmd("drink")
@app.on_state("地球")
async def drink():
    '''喝水'''
    await app.send("喝水")


@app.on_state("月球")
@app.on_cmd("drink")
async def drink():
    '''喝土'''
    await app.send("喝土")


@app.on_cmd("drink")
@app.on_state("太阳")
async def drink():
    '''喝太阳风'''
    await app.send("喝太阳风")


class UserInput(AyakaInput):
    where: str = Field(description="你要去的地方")


@app.on_deep_all()
@app.on_state()
@app.on_cmd("move")
async def move(userinput: UserInput):
    '''移动'''
    await app.set_state(userinput.where)
    await app.send(f"前往 {userinput.where}")


@app.on_cmd("hi")
@app.on_deep_all()
@app.on_state()
async def say_hi():
    '''打招呼'''
    await app.send(f"hi I'm in {app.state.keys[2:]}")
```

进一步了解`AyakaInput` [AyakaInput](../develop/input.md)

进一步了解`app.state` [AyakaState](../develop/state.md)

<div id="demo1" class="demo"></div>


## 多层次的回调

在刚才的基础上，我们希望能再加点功能，比如，太阳上新开了一家奶茶店

| 地点          | 动作  | 效果                 |
| ------------- | ----- | -------------------- |
| 太阳.奶茶店   | drink | 喝了一口3000度的奶茶 |
| 太阳.其他地点 | drink | 喝太阳风             |

```py hl_lines="37 45-49"
from pydantic import Field
from ayaka import AyakaApp, AyakaInput

app = AyakaApp("星际旅行")
app.help = "xing ji lv xing"


# 启动应用
app.set_start_cmds("星际旅行", "travel")

# 装饰器的顺序没有强制要求，随便写


# 关闭应用
@app.on_state()
@app.on_deep_all()
@app.on_cmd("退出", "exit")
async def exit_app():
    await app.close()


# 注册各种行动
@app.on_cmd("drink")
@app.on_state("地球")
async def drink():
    '''喝水'''
    await app.send("喝水")


@app.on_state("月球")
@app.on_cmd("drink")
async def drink():
    '''喝土'''
    await app.send("喝土")


@app.on_deep_all()
@app.on_cmd("drink")
@app.on_state("太阳")
async def drink():
    '''喝太阳风'''
    await app.send("喝太阳风")


@app.on_cmd("drink")
@app.on_state(["太阳", "奶茶店"])
async def drink():
    '''喝奶茶'''
    await app.send("喝了一口3000度的奶茶")


class UserInput(AyakaInput):
    where: str = Field(description="你要去的地方")


@app.on_deep_all()
@app.on_state()
@app.on_cmd("move")
async def move(userinput: UserInput):
    '''移动'''
    await app.set_state(userinput.where)
    await app.send(f"前往 {userinput.where}")


@app.on_cmd("hi")
@app.on_deep_all()
@app.on_state()
async def say_hi():
    '''打招呼'''
    await app.send(f"hi I'm in {app.state.keys[2:]}")

```

注意到，目前定义了两个drink

| 地点        | 动作  | 效果                 |
| ----------- | ----- | -------------------- |
| 太阳        | drink | 喝太阳风             |
| 太阳.奶茶店 | drink | 喝了一口3000度的奶茶 |

优先触发最匹配的回调

- 当状态为`太阳.奶茶店`时，触发后者
- 当状态为`太阳.森林公园`、`太阳.巴拉巴拉`、`太阳.我就是来凑个数`、`太阳`时，触发前者

进一步了解`上溯查询` [上溯查询](../develop/how-does-it-work.md#_3)

<div id="demo2" class="demo"></div>


## 缓存

宇宙旅游公司又开设了一个新项目：耀斑表演

我们需要先去售票处买耀斑表演的门票，然后才能看表演


| 地点          | 动作  | 效果           |
| ------------- | ----- | -------------- |
| 太阳.售票处   | buy   | 耀斑表演门票+1 |
| 太阳.任意地点 | watch | 看表演         |

```py hl_lines="2 73-94"
from pydantic import Field
from ayaka import AyakaApp, AyakaInput, AyakaCache

app = AyakaApp("星际旅行")
app.help = "xing ji lv xing"


# 启动应用
app.set_start_cmds("星际旅行", "travel")

# 装饰器的顺序没有强制要求，随便写


# 关闭应用
@app.on_state()
@app.on_deep_all()
@app.on_cmd("退出", "exit")
async def exit_app():
    await app.close()


# 注册各种行动
@app.on_cmd("drink")
@app.on_state("地球")
async def drink():
    '''喝水'''
    await app.send("喝水")


@app.on_state("月球")
@app.on_cmd("drink")
async def drink():
    '''喝土'''
    await app.send("喝土")


@app.on_deep_all()
@app.on_cmd("drink")
@app.on_state("太阳")
async def drink():
    '''喝太阳风'''
    await app.send("喝太阳风")


@app.on_cmd("drink")
@app.on_state(["太阳", "奶茶店"])
async def drink():
    '''喝奶茶'''
    await app.send("喝了一口3000度的奶茶")


class UserInput(AyakaInput):
    where: str = Field(description="你要去的地方")


@app.on_deep_all()
@app.on_state()
@app.on_cmd("move")
async def move(userinput: UserInput):
    '''移动'''
    await app.set_state(userinput.where)
    await app.send(f"前往 {userinput.where}")


@app.on_cmd("hi")
@app.on_deep_all()
@app.on_state()
async def say_hi():
    '''打招呼'''
    await app.send(f"hi I'm in {app.state.keys[2:]}")


class Cache(AyakaCache):
    ticket: int = 0


@app.on_state(["太阳", "售票处"])
@app.on_cmd("buy", "买票")
async def buy_ticket(cache: Cache):
    '''买门票'''
    cache.ticket += 1
    await app.send("耀斑表演门票+1")


@app.on_deep_all()
@app.on_state("太阳")
@app.on_cmd("watch", "看表演")
async def watch(cache: Cache):
    '''看表演'''
    if cache.ticket <= 0:
        await app.send("先去售票处买票！")
    else:
        cache.ticket -= 1
        await app.send("10分甚至9分的好看")
```

进一步了解`AyakaCache` [AyakaCache](../develop/cache.md)

<div id="demo3" class="demo"></div>

## 命令触发 vs 消息触发

刚才的所有回调都是由具体的、指定的命令来触发运行的

然而，你也可以使用消息触发

比如，你在奶茶店随便说了一句话，就能触发该回调运行

```py hl_lines="97-100"
from pydantic import Field
from ayaka import AyakaApp, AyakaInput, AyakaCache

app = AyakaApp("星际旅行")
app.help = "xing ji lv xing"


# 启动应用
app.set_start_cmds("星际旅行", "travel")

# 装饰器的顺序没有强制要求，随便写


# 关闭应用
@app.on_state()
@app.on_deep_all()
@app.on_cmd("退出", "exit")
async def exit_app():
    await app.close()


# 注册各种行动
@app.on_cmd("drink")
@app.on_state("地球")
async def drink():
    '''喝水'''
    await app.send("喝水")


@app.on_state("月球")
@app.on_cmd("drink")
async def drink():
    '''喝土'''
    await app.send("喝土")


@app.on_deep_all()
@app.on_cmd("drink")
@app.on_state("太阳")
async def drink():
    '''喝太阳风'''
    await app.send("喝太阳风")


@app.on_cmd("drink")
@app.on_state(["太阳", "奶茶店"])
async def drink():
    '''喝奶茶'''
    await app.send("喝了一口3000度的奶茶")


class UserInput(AyakaInput):
    where: str = Field(description="你要去的地方")


@app.on_deep_all()
@app.on_state()
@app.on_cmd("move")
async def move(userinput: UserInput):
    '''移动'''
    await app.set_state(userinput.where)
    await app.send(f"前往 {userinput.where}")


@app.on_cmd("hi")
@app.on_deep_all()
@app.on_state()
async def say_hi():
    '''打招呼'''
    await app.send(f"hi I'm in {app.state.keys[2:]}")


class Cache(AyakaCache):
    ticket: int = 0


@app.on_state(["太阳", "售票处"])
@app.on_cmd("buy", "买票")
async def buy_ticket(cache: Cache):
    '''买门票'''
    cache.ticket += 1
    await app.send("耀斑表演门票+1")


@app.on_deep_all()
@app.on_state("太阳")
@app.on_cmd("watch", "看表演")
async def watch(cache: Cache):
    '''看表演'''
    if cache.ticket <= 0:
        await app.send("先去售票处买票！")
    else:
        cache.ticket -= 1
        await app.send("10分甚至9分的好看")


@app.on_state(["太阳", "奶茶店"])
async def handle():
    '''令人震惊的事实'''
    await app.send("你发现这里只卖热饮")

```

消息触发的优先级低于命令触发

进一步了解`app.on_xxx()` [on_xxx](../develop/app.md#on_xxx)

<div id="demo4" class="demo"></div>

## 插件帮助

现在，我们写完了一个小插件了，那么该为它编写帮助了

不幸的是，你已经在上述代码中完成了它

通过分析 注册回调的注释(`__doc__`)，ayaka内置插件[ayaka_master](master.md)会自动生成对应的帮助

现在，你只需发送命令`help` 

进一步了解`app.help` [help](../develop/app.md#help)

`[*]` 代表它匹配任意状态，`*` 代表它匹配任意命令（=消息触发）

<div id="demo5" class="demo"></div>

## 下一步

<div align="right">
    在这里~ ↘
</div>




