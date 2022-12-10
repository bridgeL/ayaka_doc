# 快速开始

编写一个星际旅行插件

假设所有消息都是群消息

## 基本使用

打开和关闭应用

| 状态           | 动作             | 效果             |
| -------------- | ---------------- | ---------------- |
| 闲置状态       | 星际旅行、travel | 打开星际旅行应用 |
| 运行星际旅行中 | 退出、exit       | 关闭星际旅行应用 |

```py hl_lines="7 17"
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
```

### 群组状态

收到`星际旅行`或`travel`命令后，群组会从`闲置状态`变为`运行星际旅行应用`（即从`root`状态变为`root.星际旅行`状态）

收到`退出`或`exit`命令后，群组会从`运行星际旅行应用`变为`闲置状态`（即从`root.星际旅行`状态变为`root`状态）

## 旅行

实现旅行的功能

| 地点     | 动作        | 效果             |
| -------- | ----------- | ---------------- |
| 地球     | drink       | 喝水             |
| 月球     | drink       | 喝土             |
| 太阳     | drink       | 喝太阳风         |
| 任意地点 | move <地名> | 去指定地点       |
| 任意地点 | hi          | hi I'm in <地名> |

```py hl_lines="14 15 43 44 47 48 50 56 57 61"
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


@app.on_cmd("drink")
@app.on_state("太阳")
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

### 用状态指代地点

如果我们用`root.星际旅行.地球`状态指代`你正处于地球`

那么打开应用后，你处于`root.星际旅行`状态，这一状态是一切其他状态（`root.星际旅行.地球`、`root.星际旅行.月球`等）的基础

### on_state

| 代码                             | 对应的state                                    |
| -------------------------------- | ---------------------------------------------- |
| `@app.on_state()`                | 参数为空，对应`root.星际旅行`                  |
| `@app.on_state("地球")`          | 对应`root.星际旅行.地球`                       |
| `@app.on_state(["地球","中国"])` | 对应`root.星际旅行.地球.中国`                  |
| `@app.on_state("地球","月球")`   | 对应`root.星际旅行.地球`和`root.星际旅行.月球` |

### 注册回调

对不同的状态注册不同的回调 = 在不同的地点做不同的事情

```py
# 在地球喝水
@app.on_state("地球")
@app.on_cmd("drink")
async def drink():
    '''喝水'''
    await app.send("喝水")


# 在月球喝水
@app.on_state("月球")
@app.on_cmd("drink")
async def drink():
    '''喝土'''
    await app.send("喝土")
```

### 子状态可以触发父状态的回调

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

### state还可以切片

```py
    print(app.state)
    # root.星际旅行.太阳

    print(app.state[2:])
    # 太阳
```

进一步了解`app.state` [AyakaState](../develop/state.md)

### AyakaInput

```py
class UserInput(AyakaInput):
    where: str = Field(description="你要去的地方")
```

进一步了解`AyakaInput` [AyakaInput](../develop/input.md)

实现效果

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
@app.on_cmd("退出", "exit")
@app.on_deep_all()
async def exit_app():
    await app.close()


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
@app.on_deep_all()
async def drink():
    '''喝太阳风'''
    await app.send("喝太阳风")


@app.on_state(["太阳", "奶茶店"])
@app.on_cmd("drink")
async def drink():
    '''喝奶茶'''
    await app.send("喝了一口3000度的奶茶")


class UserInput(AyakaInput):
    where: str = Field(description="你要去的地方")


@app.on_state()
@app.on_cmd("move")
@app.on_deep_all()
async def move(userinput: UserInput):
    '''移动'''
    await app.set_state(userinput.where)
    await app.send(f"前往 {userinput.where}")


@app.on_state()
@app.on_cmd("hi")
@app.on_deep_all()
async def say_hi():
    '''打招呼'''
    await app.send(f"hi I'm in {app.state[2:]}")

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

实现效果

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

```py hl_lines="2 73 74 77-82 85-94"
from pydantic import Field
from ayaka import AyakaApp, AyakaInput, AyakaCache

app = AyakaApp("星际旅行")
app.help = "xing ji lv xing"


# 启动应用
app.set_start_cmds("星际旅行", "travel")

# 装饰器的顺序没有强制要求，随便写


# 关闭应用
@app.on_state()
@app.on_cmd("退出", "exit")
@app.on_deep_all()
async def exit_app():
    await app.close()


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
@app.on_deep_all()
async def drink():
    '''喝太阳风'''
    await app.send("喝太阳风")


@app.on_state(["太阳", "奶茶店"])
@app.on_cmd("drink")
async def drink():
    '''喝奶茶'''
    await app.send("喝了一口3000度的奶茶")


class UserInput(AyakaInput):
    where: str = Field(description="你要去的地方")


@app.on_state()
@app.on_cmd("move")
@app.on_deep_all()
async def move(userinput: UserInput):
    '''移动'''
    await app.set_state(userinput.where)
    await app.send(f"前往 {userinput.where}")


@app.on_state()
@app.on_cmd("hi")
@app.on_deep_all()
async def say_hi():
    '''打招呼'''
    await app.send(f"hi I'm in {app.state[2:]}")


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

实现效果

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
@app.on_cmd("退出", "exit")
@app.on_deep_all()
async def exit_app():
    await app.close()


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
@app.on_deep_all()
async def drink():
    '''喝太阳风'''
    await app.send("喝太阳风")


@app.on_state(["太阳", "奶茶店"])
@app.on_cmd("drink")
async def drink():
    '''喝奶茶'''
    await app.send("喝了一口3000度的奶茶")


class UserInput(AyakaInput):
    where: str = Field(description="你要去的地方")


@app.on_state()
@app.on_cmd("move")
@app.on_deep_all()
async def move(userinput: UserInput):
    '''移动'''
    await app.set_state(userinput.where)
    await app.send(f"前往 {userinput.where}")


@app.on_state()
@app.on_cmd("hi")
@app.on_deep_all()
async def say_hi():
    '''打招呼'''
    await app.send(f"hi I'm in {app.state[2:]}")


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

实现效果

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

## 插件帮助

现在，我们写完了一个小插件了，那么该为它编写帮助了

不幸的是，你已经在上述代码中完成了它

通过分析 注册回调的注释(`__doc__`)，ayaka内置插件[ayaka_master](../develop/master.md)会自动生成对应的帮助

现在，你只需发送命令`help` 

实现效果

<div class="demo">
<<< "user" 说：#help 星际旅行
>>>  "Bot" 说：[星际旅行]
xing ji lv xing
- 星际旅行/travel | 打开应用
[星际旅行]
- 退出/exit 
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
<<< "user" 说：#travel
>>>  "Bot" 说：已打开应用 [星际旅行]
<<< "user" 说：#help
>>>  "Bot" 说：[星际旅行]
- 退出/exit 
- move &lt;where> | 移动
    &lt;where> 你要去的地方
- hi | 打招呼
<<< "user" 说：#move 太阳.奶茶店
>>>  "Bot" 说：前往 太阳.奶茶店
<<< "user" 说：#help
>>>  "Bot" 说：[星际旅行.太阳.奶茶店]
- drink | 喝奶茶
- &lt;任意文字> | 令人震惊的事实
[星际旅行.太阳]
- watch/看表演 | 看表演
[星际旅行]
- 退出/exit 
- move &lt;where> | 移动
    &lt;where> 你要去的地方
- hi | 打招呼
<<< "user" 说：#exit
>>>  "Bot" 说：已关闭应用 [星际旅行]
</div>

## 下一步

<div align="right">
    在这里~ ↘
</div>




