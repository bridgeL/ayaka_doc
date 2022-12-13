# 快速开始

编写一个星际旅行插件，从简单到复杂

## 基本使用

打开和关闭应用

| 状态           | 动作             | 效果             |
| -------------- | ---------------- | ---------------- |
| 闲置状态       | 星际旅行、travel | 打开星际旅行应用 |
| 运行星际旅行中 | 退出、exit       | 关闭星际旅行应用 |

```py hl_lines="7 9"
from ayaka import AyakaApp

app = AyakaApp("星际旅行")
app.help = "xing ji lv xing"

# 启动应用
app.set_start_cmds("星际旅行", "travel")
# 关闭应用
app.set_close_cmds("退出", "exit")
```

**实现效果**

<div class="demo">
&lt;&lt;&lt; "user" 说：#travel
>>>  "Bot" 说：已打开应用 [星际旅行]
&lt;&lt;&lt; "user" 说：#exit
>>>  "Bot" 说：已关闭应用 [星际旅行]
</div>


## 旅行

实现旅行的功能

| 地点     | 动作        | 效果             |
| -------- | ----------- | ---------------- |
| 地球     | drink       | 喝水             |
| 月球     | drink       | 喝土             |
| 太阳     | drink       | 喝太阳风         |
| 任意地点 | move <地名> | 去指定地点       |
| 任意地点 | hi          | hi I'm in <地名> |

```py hl_lines="1 2 15 16 19 22 23 29 30 36 37 40-46"
from pydantic import Field
from ayaka import AyakaApp, AyakaInput

app = AyakaApp("星际旅行")
app.help = "xing ji lv xing"

# 启动应用
app.set_start_cmds("星际旅行", "travel")
# 关闭应用
app.set_close_cmds("退出", "exit")


# 装饰器的顺序没有强制要求，随便写
# 注册各种行动
@app.on_state("地球")
@app.on_cmd("drink")
async def drink():
    '''喝水'''
    await app.send("喝水")


@app.on_state("月球")
@app.on_cmd("drink")
async def drink():
    '''喝土'''
    await app.send("喝土")


@app.on_state("太阳")
@app.on_cmd("drink")
async def drink():
    '''喝太阳风'''
    await app.send("喝太阳风")


class UserInput(AyakaInput):
    where: str = Field(description="你要去的地方")


@app.on_state()
@app.on_deep_all()
@app.on_cmd("move")
async def move(userinput: UserInput):
    '''移动'''
    await app.set_state(userinput.where)
    await app.send(f"前往 {userinput.where}")


@app.on_state()
@app.on_deep_all()
@app.on_cmd("hi")
async def say_hi():
    '''打招呼'''
    await app.send(f"hi I'm in {app.state[2:]}")
```

**用状态指代地点**

用`root.星际旅行.地球`状态指代`你正处于地球`

用`root.星际旅行.月球`状态指代`你正处于月球`

天然的，我们可以意识到，`root.星际旅行`是其他状态（`root.星际旅行.地球`、`root.星际旅行.月球`等）的基础，是它们的祖先

![图片](./%E5%BF%AB%E9%80%9F%E5%BC%80%E5%A7%8B1.png)

| 状态                      | 意义              |
| ------------------------- | ----------------- |
| root                      | 闲置状态          |
| root.星际旅行             | 开启应用-星际旅行 |
| root.星际旅行.地球        | 到达地球          |
| root.星际旅行.太阳.奶茶店 | 到达太阳奶茶店    |

进一步了解`app.state` [AyakaState](../develop/state.md)

**on_state**

| 代码                                    | 意义                                                        |
| --------------------------------------- | ----------------------------------------------------------- |
| `@app.on_state()`                       | 参数为空，对应`root.星际旅行`，回调在该状态下时响应         |
| `@app.on_state("地球")`                 | 回调在`root.星际旅行.地球`时响应                            |
| `@app.on_state(["地球","中国"])`        | 回调在`root.星际旅行.地球.中国`时响应                       |
| `@app.on_state(["地球","中国"],"月球")` | 回调在`root.星际旅行.地球.中国`或`root.星际旅行.月球`时响应 |

**on_cmd**

设置命令

| 代码                           | 意义                            |
| ------------------------------ | ------------------------------- |
| `@app.on_cmd("drink")`         | 回调通过`drink`命令触发         |
| `@app.on_cmd("drink", "喝水")` | 回调通过`drink`或`喝水`命令触发 |

**注册回调**

对不同的状态注册不同的回调 = 在不同的地点做不同的事情

```py
# 在地球喝水
@app.on_state("地球")
@app.on_cmd("drink")
async def drink():
    '''喝水'''
    await app.send("喝水")


# 在月球喝土
@app.on_state("月球")
@app.on_cmd("drink")
async def drink():
    '''喝土'''
    await app.send("喝土")
```

**发送消息**

```py
await app.send("喝水")
# bot发送 喝水
```

**子状态可以触发父状态的回调**

```py
# 该回调注册在 root.星际旅行 状态下，由于设置了on_deep_all，它还对所有子状态生效
# 也就说，当我们位于 root.星际旅行.月球 时，也可以触发move回调
@app.on_state()
@app.on_deep_all()
@app.on_cmd("move")
async def move(userinput: UserInput):
    '''移动'''
    await app.set_state(userinput.where)
    await app.send(f"前往 {userinput.where}")
```

| 状态               | 注册回调 |
| ------------------ | -------- |
| root.星际旅行      | move     |
| root.星际旅行.太阳 | drink    |

| 当位于此状态时     | 可触发的回调 |
| ------------------ | ------------ |
| root.星际旅行      | move         |
| root.星际旅行.太阳 | move,drink   |

**state还可以切片**

```py
    print(app.state)
    # root.星际旅行.太阳

    print(app.state[2:])
    # 太阳
```

但切片后得到的状态结点不位于状态树上

进一步了解状态树 [状态树](../develop/how-does-it-work.md#ayakaappayakastate)

**修改当前状态**

```py
await app.set_state("地球")
# 当前状态 -> root.星际旅行.地球

await app.set_state("月球")
# 当前状态 -> root.星际旅行.月球

await app.set_state(["地球","中国"])
# 当前状态 -> root.星际旅行.地球.中国

await app.set_state("地球.中国")
# 当前状态 -> root.星际旅行.地球.中国
```

**AyakaInput**

```py
class UserInput(AyakaInput):
    where: str = Field(description="你要去的地方")
```

进一步了解`AyakaInput` [AyakaInput](../develop/input.md)

**实现效果**

<div class="demo">
<<< "user" 说：#travel
>>>  "Bot" 说：已打开应用 [星际旅行]
<<< "user" 说：#hi
>>>  "Bot" 说：hi I'm in 
<<< "user" 说：#move 地球
>>>  "Bot" 说：前往 地球
<<< "user" 说：#hi
>>>  "Bot" 说：hi I'm in 地球
<<< "user" 说：#drink
>>>  "Bot" 说：喝水
<<< "user" 说：#move 月球
>>>  "Bot" 说：前往 月球
<<< "user" 说：#drink
>>>  "Bot" 说：喝土
<<< "user" 说：#move 太阳
>>>  "Bot" 说：前往 太阳
<<< "user" 说：#drink
>>>  "Bot" 说：喝太阳风
<<< "user" 说：#hi
>>>  "Bot" 说：hi I'm in 太阳
<<< "user" 说：#exit
>>>  "Bot" 说：已关闭应用 [星际旅行]
</div>


## 多层次

在刚才的基础上，我们希望能再加点功能，比如，太阳上新开了一家奶茶店

| 地点          | 动作  | 效果                 |
| ------------- | ----- | -------------------- |
| 太阳.奶茶店   | drink | 喝了一口3000度的奶茶 |
| 太阳.其他地点 | drink | 喝太阳风             |

```py hl_lines="30 58-62"
from pydantic import Field
from ayaka import AyakaApp, AyakaInput

app = AyakaApp("星际旅行")
app.help = "xing ji lv xing"

# 启动应用
app.set_start_cmds("星际旅行", "travel")
# 关闭应用
app.set_close_cmds("退出", "exit")


# 装饰器的顺序没有强制要求，随便写
# 注册各种行动
@app.on_state("地球")
@app.on_cmd("drink")
async def drink():
    '''喝水'''
    await app.send("喝水")


@app.on_state("月球")
@app.on_cmd("drink")
async def drink():
    '''喝土'''
    await app.send("喝土")


@app.on_state("太阳")
@app.on_deep_all()
@app.on_cmd("drink")
async def drink():
    '''喝太阳风'''
    await app.send("喝太阳风")


class UserInput(AyakaInput):
    where: str = Field(description="你要去的地方")


@app.on_state()
@app.on_deep_all()
@app.on_cmd("move")
async def move(userinput: UserInput):
    '''移动'''
    await app.set_state(userinput.where)
    await app.send(f"前往 {userinput.where}")


@app.on_state()
@app.on_deep_all()
@app.on_cmd("hi")
async def say_hi():
    '''打招呼'''
    await app.send(f"hi I'm in {app.state[2:]}")


@app.on_state(["太阳", "奶茶店"])
@app.on_cmd("drink")
async def drink():
    '''喝奶茶'''
    await app.send("喝了一口3000度的奶茶")
```

注意到，目前定义了两个drink

| 地点        | 动作  | 效果                 |
| ----------- | ----- | -------------------- |
| 太阳        | drink | 喝太阳风             |
| 太阳.奶茶店 | drink | 喝了一口3000度的奶茶 |

优先触发最匹配的回调

- 当状态为`太阳.奶茶店`时，触发后者
- 当状态为`太阳`、`太阳.森林公园`、`太阳.巴拉巴拉.我就是来凑个数`时，触发前者

进一步了解`上溯查询` [上溯查询](../develop/how-does-it-work.md#_3)

**实现效果**

<div class="demo">
<<< "user" 说：#travel
>>>  "Bot" 说：已打开应用 [星际旅行]
<<< "user" 说：#move 太阳
>>>  "Bot" 说：前往 太阳
<<< "user" 说：#drink
>>>  "Bot" 说：喝太阳风
<<< "user" 说：#move 太阳.森林公园
>>>  "Bot" 说：前往 太阳.森林公园
<<< "user" 说：#drink
>>>  "Bot" 说：喝太阳风
<<< "user" 说：#move 太阳.奶茶店
>>>  "Bot" 说：前往 太阳.奶茶店
<<< "user" 说：#drink
>>>  "Bot" 说：喝了一口3000度的奶茶
<<< "user" 说：#hi
>>>  "Bot" 说：hi I'm in 太阳.奶茶店
<<< "user" 说：#exit
>>>  "Bot" 说：已关闭应用 [星际旅行]
</div>


## 缓存

宇宙旅游公司又开设了一个新项目：耀斑表演

我们需要先去售票处买耀斑表演的门票，然后才能看表演，一张票不能用多次

| 地点          | 动作  | 效果           |
| ------------- | ----- | -------------- |
| 太阳.售票处   | buy   | 耀斑表演门票+1 |
| 太阳.任意地点 | watch | 看表演         |

```py hl_lines="2 65 66 69-74 77-86"
from pydantic import Field
from ayaka import AyakaApp, AyakaInput, AyakaCache

app = AyakaApp("星际旅行")
app.help = "xing ji lv xing"

# 启动应用
app.set_start_cmds("星际旅行", "travel")
# 关闭应用
app.set_close_cmds("退出", "exit")


# 装饰器的顺序没有强制要求，随便写
# 注册各种行动
@app.on_state("地球")
@app.on_cmd("drink")
async def drink():
    '''喝水'''
    await app.send("喝水")


@app.on_state("月球")
@app.on_cmd("drink")
async def drink():
    '''喝土'''
    await app.send("喝土")


@app.on_state("太阳")
@app.on_deep_all()
@app.on_cmd("drink")
async def drink():
    '''喝太阳风'''
    await app.send("喝太阳风")


class UserInput(AyakaInput):
    where: str = Field(description="你要去的地方")


@app.on_state()
@app.on_deep_all()
@app.on_cmd("move")
async def move(userinput: UserInput):
    '''移动'''
    await app.set_state(userinput.where)
    await app.send(f"前往 {userinput.where}")


@app.on_state()
@app.on_deep_all()
@app.on_cmd("hi")
async def say_hi():
    '''打招呼'''
    await app.send(f"hi I'm in {app.state[2:]}")


@app.on_state(["太阳", "奶茶店"])
@app.on_cmd("drink")
async def drink():
    '''喝奶茶'''
    await app.send("喝了一口3000度的奶茶")


class Cache(AyakaCache):
    ticket: int = 0


@app.on_state(["太阳", "售票处"])
@app.on_cmd("buy", "买票")
async def buy_ticket(cache: Cache):
    '''买门票'''
    cache.ticket += 1
    await app.send("耀斑表演门票+1")


@app.on_state("太阳")
@app.on_deep_all()
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

**实现效果**

<div class="demo">
<<< "user" 说：#travel
>>>  "Bot" 说：已打开应用 [星际旅行]
<<< "user" 说：#move 太阳
>>>  "Bot" 说：前往 太阳
<<< "user" 说：#watch
>>>  "Bot" 说：先去售票处买票！
<<< "user" 说：#move 太阳.售票处
>>>  "Bot" 说：前往 太阳.售票处
<<< "user" 说：#buy
>>>  "Bot" 说：耀斑表演门票+1
<<< "user" 说：#watch
>>>  "Bot" 说：10分甚至9分的好看
<<< "user" 说：#watch
>>>  "Bot" 说：先去售票处买票！
<<< "user" 说：#exit
>>>  "Bot" 说：已关闭应用 [星际旅行]
</div>

## 命令触发 vs 消息触发

刚才的所有回调都是由具体的、指定的命令来触发运行的

然而，你也可以使用消息触发

比如，你在奶茶店随便说了一句话，就能触发该回调运行

```py hl_lines="89-94"
from pydantic import Field
from ayaka import AyakaApp, AyakaInput, AyakaCache

app = AyakaApp("星际旅行")
app.help = "xing ji lv xing"

# 启动应用
app.set_start_cmds("星际旅行", "travel")
# 关闭应用
app.set_close_cmds("退出", "exit")


# 装饰器的顺序没有强制要求，随便写
# 注册各种行动
@app.on_state("地球")
@app.on_cmd("drink")
async def drink():
    '''喝水'''
    await app.send("喝水")


@app.on_state("月球")
@app.on_cmd("drink")
async def drink():
    '''喝土'''
    await app.send("喝土")


@app.on_state("太阳")
@app.on_deep_all()
@app.on_cmd("drink")
async def drink():
    '''喝太阳风'''
    await app.send("喝太阳风")


class UserInput(AyakaInput):
    where: str = Field(description="你要去的地方")


@app.on_state()
@app.on_deep_all()
@app.on_cmd("move")
async def move(userinput: UserInput):
    '''移动'''
    await app.set_state(userinput.where)
    await app.send(f"前往 {userinput.where}")


@app.on_state()
@app.on_deep_all()
@app.on_cmd("hi")
async def say_hi():
    '''打招呼'''
    await app.send(f"hi I'm in {app.state[2:]}")


@app.on_state(["太阳", "奶茶店"])
@app.on_cmd("drink")
async def drink():
    '''喝奶茶'''
    await app.send("喝了一口3000度的奶茶")


class Cache(AyakaCache):
    ticket: int = 0


@app.on_state(["太阳", "售票处"])
@app.on_cmd("buy", "买票")
async def buy_ticket(cache: Cache):
    '''买门票'''
    cache.ticket += 1
    await app.send("耀斑表演门票+1")


@app.on_state("太阳")
@app.on_deep_all()
@app.on_cmd("watch", "看表演")
async def watch(cache: Cache):
    '''看表演'''
    if cache.ticket <= 0:
        await app.send("先去售票处买票！")
    else:
        cache.ticket -= 1
        await app.send("10分甚至9分的好看")


@app.on_state(["太阳", "奶茶店"])
@app.on_text()
async def handle():
    '''令人震惊的事实'''
    await app.send("你发现这里只卖热饮")
```

消息触发的优先级低于命令触发

进一步了解`app.on_xxx()` [on_xxx](../develop/app.md#on_xxx)

**实现效果**

<div class="demo">
<<< "user" 说：#travel
>>>  "Bot" 说：已打开应用 [星际旅行]
<<< "user" 说：#move 太阳
>>>  "Bot" 说：前往 太阳
<<< "user" 说：#hi
>>>  "Bot" 说：hi I'm in 太阳
<<< "user" 说：#move 太阳.奶茶店
>>>  "Bot" 说：前往 太阳.奶茶店
<<< "user" 说：嗯？
>>>  "Bot" 说：你发现这里只卖热饮
<<< "user" 说：#hi
>>>  "Bot" 说：hi I'm in 太阳.奶茶店
<<< "user" 说：#exit
>>>  "Bot" 说：已关闭应用 [星际旅行]
</div>

## 数据库

你在太阳上的森林公园里捡到了一块金子，但是一旦重启bot，你就会失去它，这意味着你需要一个数据库来持久地保存数据

```py hl_lines="2 96-98 101-107"
from pydantic import Field
from ayaka import AyakaApp, AyakaInput, AyakaCache, AyakaUserDB

app = AyakaApp("星际旅行")
app.help = "xing ji lv xing"

# 启动应用
app.set_start_cmds("星际旅行", "travel")
# 关闭应用
app.set_close_cmds("退出", "exit")


# 装饰器的顺序没有强制要求，随便写
# 注册各种行动
@app.on_state("地球")
@app.on_cmd("drink")
async def drink():
    '''喝水'''
    await app.send("喝水")


@app.on_state("月球")
@app.on_cmd("drink")
async def drink():
    '''喝土'''
    await app.send("喝土")


@app.on_state("太阳")
@app.on_deep_all()
@app.on_cmd("drink")
async def drink():
    '''喝太阳风'''
    await app.send("喝太阳风")


class UserInput(AyakaInput):
    where: str = Field(description="你要去的地方")


@app.on_state()
@app.on_deep_all()
@app.on_cmd("move")
async def move(userinput: UserInput):
    '''移动'''
    await app.set_state(userinput.where)
    await app.send(f"前往 {userinput.where}")


@app.on_state()
@app.on_deep_all()
@app.on_cmd("hi")
async def say_hi():
    '''打招呼'''
    await app.send(f"hi I'm in {app.state[2:]}")


@app.on_state(["太阳", "奶茶店"])
@app.on_cmd("drink")
async def drink():
    '''喝奶茶'''
    await app.send("喝了一口3000度的奶茶")


class Cache(AyakaCache):
    ticket: int = 0


@app.on_state(["太阳", "售票处"])
@app.on_cmd("buy", "买票")
async def buy_ticket(cache: Cache):
    '''买门票'''
    cache.ticket += 1
    await app.send("耀斑表演门票+1")


@app.on_state("太阳")
@app.on_deep_all()
@app.on_cmd("watch", "看表演")
async def watch(cache: Cache):
    '''看表演'''
    if cache.ticket <= 0:
        await app.send("先去售票处买票！")
    else:
        cache.ticket -= 1
        await app.send("10分甚至9分的好看")


@app.on_state(["太阳", "奶茶店"])
@app.on_text()
async def handle():
    '''令人震惊的事实'''
    await app.send("你发现这里只卖热饮")


class Data(AyakaUserDB):
    __table_name__ = "gold"
    gold_number: int = 0


@app.on_state(["太阳", "森林公园"])
@app.on_cmd("pick")
async def get_gold(data: Data):
    '''捡金子'''
    data.gold_number += 1
    data.save()
    await app.send(f"喜加一 {data.gold_number}")
```

进一步了解`AyakaUserDB` [AyakaUserDB](../develop/db.md)

**实现效果**

<div class="demo">
&lt;&lt;&lt; "user" 说：#星际旅行
>>>  "Bot" 说：已打开应用 [星际旅行]
&lt;&lt;&lt; "user" 说：#move 太阳.森林公园
>>>  "Bot" 说：前往 太阳.森林公园
&lt;&lt;&lt; "user" 说：#pick
>>>  "Bot" 说：喜加一 1
&lt;&lt;&lt; "user" 说：#pick
>>>  "Bot" 说：喜加一 2
&lt;&lt;&lt; "user" 说：#pick
>>>  "Bot" 说：喜加一 3
&lt;&lt;&lt; "user" 说：#pick
>>>  "Bot" 说：喜加一 4
&lt;&lt;&lt; "user" 说：#exit
>>>  "Bot" 说：已关闭应用 [星际旅行]
>>>  "sys" 说：重启bot后
&lt;&lt;&lt; "user" 说：#星际旅行
>>>  "Bot" 说：已打开应用 [星际旅行]
&lt;&lt;&lt; "user" 说：#move 太阳.森林公园
>>>  "Bot" 说：前往 太阳.森林公园
&lt;&lt;&lt; "user" 说：#pick
>>>  "Bot" 说：喜加一 5
</div>

## 配置

一次捡1个金块已经不能满足你了，现在你想要一次捡10个，或者更多！

```py hl_lines="2 101-103 106 113"
from pydantic import Field
from ayaka import AyakaApp, AyakaInput, AyakaCache, AyakaUserDB, AyakaConfig

app = AyakaApp("星际旅行")
app.help = "xing ji lv xing"

# 启动应用
app.set_start_cmds("星际旅行", "travel")
# 关闭应用
app.set_close_cmds("退出", "exit")


# 装饰器的顺序没有强制要求，随便写
# 注册各种行动
@app.on_state("地球")
@app.on_cmd("drink")
async def drink():
    '''喝水'''
    await app.send("喝水")


@app.on_state("月球")
@app.on_cmd("drink")
async def drink():
    '''喝土'''
    await app.send("喝土")


@app.on_state("太阳")
@app.on_deep_all()
@app.on_cmd("drink")
async def drink():
    '''喝太阳风'''
    await app.send("喝太阳风")


class UserInput(AyakaInput):
    where: str = Field(description="你要去的地方")


@app.on_state()
@app.on_deep_all()
@app.on_cmd("move")
async def move(userinput: UserInput):
    '''移动'''
    await app.set_state(userinput.where)
    await app.send(f"前往 {userinput.where}")


@app.on_state()
@app.on_deep_all()
@app.on_cmd("hi")
async def say_hi():
    '''打招呼'''
    await app.send(f"hi I'm in {app.state[2:]}")


@app.on_state(["太阳", "奶茶店"])
@app.on_cmd("drink")
async def drink():
    '''喝奶茶'''
    await app.send("喝了一口3000度的奶茶")


class Cache(AyakaCache):
    ticket: int = 0


@app.on_state(["太阳", "售票处"])
@app.on_cmd("buy", "买票")
async def buy_ticket(cache: Cache):
    '''买门票'''
    cache.ticket += 1
    await app.send("耀斑表演门票+1")


@app.on_state("太阳")
@app.on_deep_all()
@app.on_cmd("watch", "看表演")
async def watch(cache: Cache):
    '''看表演'''
    if cache.ticket <= 0:
        await app.send("先去售票处买票！")
    else:
        cache.ticket -= 1
        await app.send("10分甚至9分的好看")


@app.on_state(["太阳", "奶茶店"])
@app.on_text()
async def handle():
    '''令人震惊的事实'''
    await app.send("你发现这里只卖热饮")


class Data(AyakaUserDB):
    __table_name__ = "gold"
    gold_number: int = 0


class Config(AyakaConfig):
    __app_name__ = app.name
    gold_number: int = 1


config = Config()


@app.on_state(["太阳", "森林公园"])
@app.on_cmd("pick")
async def get_gold(data: Data):
    '''捡金子'''
    data.gold_number += config.gold_number
    data.save()
    await app.send(f"喜加一 {data.gold_number}")


class UserInput2(AyakaInput):
    number: int = Field(description="一次捡起的金块数量")


@app.on_state(["太阳", "森林公园"])
@app.on_cmd("change")
async def change_gold_number(userinput: UserInput2):
    '''修改捡金子配置'''
    config.gold_number = userinput.number
    await app.send("修改成功")
```


**实现效果**

<div class="demo">
&lt;&lt;&lt; "user" 说：#travel
>>>  "Bot" 说：已打开应用 [星际旅行]
&lt;&lt;&lt; "user" 说：#move 太阳.森林公园
>>>  "Bot" 说：前往 太阳.森林公园
&lt;&lt;&lt; "user" 说：#pick
>>>  "Bot" 说：喜加一 53
&lt;&lt;&lt; "user" 说：#pick
>>>  "Bot" 说：喜加一 54
&lt;&lt;&lt; "user" 说：#change 10
>>>  "Bot" 说：修改成功
&lt;&lt;&lt; "user" 说：#pick
>>>  "Bot" 说：喜加一 64
"sys" 说：bot重启后
&lt;&lt;&lt; "user" 说：#travel
>>>  "Bot" 说：已打开应用 [星际旅行]
&lt;&lt;&lt; "user" 说：#move 太阳.森林公园
>>>  "Bot" 说：前往 太阳.森林公园
&lt;&lt;&lt; "user" 说：#pick
>>>  "Bot" 说：喜加一 74
</div>

查看`data/ayaka/ayaka_setting.json`

```json
{
    "星际旅行": {
        "gold_number": 10
    },
    // ...
}
```

## 插件帮助

现在，我们写完了一个小插件了，那么该为它编写帮助了

不幸的是，你已经在上述代码中完成了它

通过分析 注册回调的注释(`__doc__`)，ayaka内置插件[ayaka_master](../develop/master.md)会自动生成对应的帮助

现在，你只需发送命令`help` 

**实现效果**

<div class="demo">
&lt;&lt;&lt; "user" 说：#help 星际旅行
>>>  "Bot" 说：[星际旅行]
xing ji lv xing
- 星际旅行/travel | 打开应用
[星际旅行]
- 退出/exit | 关闭应用
- move &lt;where> | 移动
    &lt;where> 你要去的地方
- hi | 打招呼
[星际旅行.地球]
- drink | 喝水
[星际旅行.月球]
- drink | 喝土
[星际旅行.太阳]
- drink | 喝太阳风
- watch/看表演 | 看表演
[星际旅行.太阳.奶茶店]
- drink | 喝奶茶
- &lt;任意文字> | 令人震惊的事实
[星际旅行.太阳.售票处]
- buy/买票 | 买门票
[星际旅行.太阳.森林公园]
- pick | 捡金子
- change &lt;number> | 修改捡金子配置
    &lt;number> 一次捡起的金块数量
</div>

<div class="demo">
&lt;&lt;&lt; "user" 说：#星际旅行
>>>  "Bot" 说：已打开应用 [星际旅行]
&lt;&lt;&lt; "user" 说：#move 太阳.森林公园
>>>  "Bot" 说：前往 太阳.森林公园
&lt;&lt;&lt; "user" 说：#help
>>>  "Bot" 说：[星际旅行.太阳.森林公园]
- pick | 捡金子
- change &lt;number> | 修改捡金子配置
    &lt;number> 一次捡起的金块数量
[星际旅行.太阳]
- drink | 喝太阳风
- watch/看表演 | 看表演
[星际旅行]
- 退出/exit | 关闭应用
- move &lt;where> | 移动
    &lt;where> 你要去的地方
- hi | 打招呼
</div>

## 下一步

<div align="right">
    在这里~ ↘
</div>




