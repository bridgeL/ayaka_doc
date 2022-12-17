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

"user" 说：#travel
"Bot" 说：已打开应用 [星际旅行]
"user" 说：#退出
"Bot" 说：已关闭应用 [星际旅行]

</div>

## hello！

实现打招呼的功能

| 地点     | 动作 | 效果             |
| -------- | ---- | ---------------- |
| 任意地点 | hi   | hi I'm in <地名> |

```py hl_lines="2-4 7"
# 装饰器的顺序没有强制要求
@app.on_state()
@app.on_deep_all()
@app.on_cmd("hi")
async def say_hi():
    '''打招呼'''
    await app.send(f"hi I'm in {app.state}")
```

**简单介绍**

| 代码                 | 意义                                    |
| -------------------- | --------------------------------------- |
| `@app.on_state()`    | 回调在群组处于`root.星际旅行`状态时响应 |
| `@app.on_cmd("hi")`  | 回调通过`hi`命令触发                    |
| `@app.on_deep_all()` | 回调对所有子状态可见                    |

**发送消息**

```py
await app.send("你好")
# bot发送 你好
```

**实现效果**

<div class="demo">

"user" 说：#travel
"Bot" 说：已打开应用 [星际旅行]
"user" 说：#hi
"Bot" 说：hi I'm in root.星际旅行
"user" 说：#exit
"Bot" 说：已关闭应用 [星际旅行]

</div>

## 旅行

| 地点     | 动作        | 效果       |
| -------- | ----------- | ---------- |
| 任意地点 | move <地名> | 去指定地点 |

```py hl_lines="6-8"
@app.on_state()
@app.on_deep_all()
@app.on_cmd("move")
async def move():
    '''移动'''
    args = [str(a) for a in app.args]
    await app.set_state(*args)
    await app.send(f"前往 {app.arg}")
```

**app.args和app.arg**

| 名称     | 类型                   | 功能                                     |
| -------- | ---------------------- | ---------------------------------------- |
| app.cmd  | `str`                  | 本次响应是针对哪个命令                   |
| app.arg  | `Message`              | 删除了命令后剩下的消息部分               |
| app.args | `List[MessageSegment]` | 删除命令后，依照分隔符分割，并移除空数据 |


**实现效果**

<div class="demo">

"user" 说：#得到的 水电费   来看看
"sys" 说：app.cmd = "得到的"
"sys" 说：app.arg = "水电费   来看看"
"sys" 说：app.args = ["水电费","来看看"]

</div>

**app.set_state**

状态转移，令群组从A状态变为B状态

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

**实现效果**

<div class="demo">

"user" 说：#travel
"Bot" 说：已打开应用 [星际旅行]
"user" 说：#move 地球
"Bot" 说：前往 地球
"user" 说：#hi
"Bot" 说：hi I'm in root.星际旅行.地球
"user" 说：#move 地球 中国
"Bot" 说：前往 地球 中国
"user" 说：#hi
"Bot" 说：hi I'm in root.星际旅行.地球.中国
"user" 说：#exit
"Bot" 说：已关闭应用 [星际旅行]

</div>

## 不同地方不同效果

| 地点       | 动作  | 效果     |
| ---------- | ----- | -------- |
| 地球，月球 | drink | 喝水     |
| 太阳       | drink | 喝太阳风 |

```py hl_lines="2"
# 注册各种行动
@app.on_state("地球", "月球")
@app.on_cmd("drink")
async def drink():
    '''喝水'''
    await app.send("喝水")


@app.on_state("太阳")
@app.on_deep_all()
@app.on_cmd("drink")
async def drink():
    '''喝太阳风'''
    await app.send("喝太阳风")
```

**on_state**

| 代码                             | 意义                                       |
| -------------------------------- | ------------------------------------------ |
| `@app.on_state("地球")`          | `root.星际旅行.地球`                       |
| `@app.on_state(["地球","中国"])` | `root.星际旅行.地球.中国`                  |
| `@app.on_state("地球.中国")`     | `root.星际旅行.地球.中国`                  |
| `@app.on_state("地球","月球")`   | `root.星际旅行.地球`或`root.星际旅行.月球` |

**on_cmd**

设置一个或多个命令

| 代码                           | 意义                            |
| ------------------------------ | ------------------------------- |
| `@app.on_cmd("drink")`         | 回调通过`drink`命令触发         |
| `@app.on_cmd("drink", "喝水")` | 回调通过`drink`或`喝水`命令触发 |

进一步了解`app.state` [AyakaState](../develop/state.md)

**子状态可以触发父状态的回调**

| 状态               | 注册回调 |
| ------------------ | -------- |
| root.星际旅行      | move     |
| root.星际旅行.太阳 | drink    |

| 当位于此状态时     | 可触发的回调   |
| ------------------ | -------------- |
| root.星际旅行      | move           |
| root.星际旅行.太阳 | **move**,drink |

前提是**move**回调使用了`@app.on_deep_all()`装饰器

**实现效果**

<div class="demo">

"user" 说：#travel
"Bot" 说：已打开应用 [星际旅行]
"user" 说：#move 月球
"Bot" 说：前往 月球
"user" 说：#drink
"Bot" 说：喝水
"user" 说：#move 太阳
"Bot" 说：前往 太阳
"user" 说：#drink
"Bot" 说：喝太阳风
"user" 说：#exit
"Bot" 说：已关闭应用 [星际旅行]

</div>


## 多层次

在刚才的基础上，我们希望能再加点功能，比如，太阳上新开了一家奶茶店

| 地点        | 动作  | 效果                 |
| ----------- | ----- | -------------------- |
| 太阳.奶茶店 | drink | 喝了一口3000度的奶茶 |


```py hl_lines="1"
@app.on_state("太阳.奶茶店")
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

由于上溯查询的机制，优先触发当前状态下的回调，其次触发父状态的回调、爷状态的回调，例如：

- 当状态为`太阳.奶茶店`时，触发后者
- 当状态为`太阳`、`太阳.森林公园`、`太阳.巴拉巴拉.我就是来凑个数`时，触发前者

进一步了解`上溯查询` [上溯查询](../develop/how-does-it-work.md#_3)

**实现效果**

<div class="demo">

"user" 说：#travel
"Bot" 说：已打开应用 [星际旅行]
"user" 说：#move 太阳
"Bot" 说：前往 太阳
"user" 说：#drink
"Bot" 说：喝太阳风
"user" 说：#move 太阳 奶茶店
"Bot" 说：前往 太阳 奶茶店
"user" 说：#drink
"Bot" 说：喝了一口3000度的奶茶
"user" 说：#exit
"Bot" 说：已关闭应用 [星际旅行]

</div>


## 缓存

宇宙旅游公司又开设了一个新项目：耀斑表演

我们需要先去售票处买耀斑表演的门票，然后才能看表演，一张票不能用多次

| 地点          | 动作  | 效果           |
| ------------- | ----- | -------------- |
| 太阳.售票处   | buy   | 耀斑表演门票+1 |
| 太阳.任意地点 | watch | 看表演         |

```py
from ayaka import AyakaCache
class Cache(AyakaCache):
    ticket: int = 0


@app.on_state("太阳.售票处")
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

"user" 说：#travel
"Bot" 说：已打开应用 [星际旅行]
"user" 说：#move 太阳
"Bot" 说：前往 太阳
"user" 说：#watch
"Bot" 说：先去售票处买票！
"user" 说：#move 太阳 售票处
"Bot" 说：前往 太阳 售票处
"user" 说：#buy
"Bot" 说：耀斑表演门票+1
"user" 说：#watch
"Bot" 说：10分甚至9分的好看
"user" 说：#watch
"Bot" 说：先去售票处买票！
"user" 说：#exit
"Bot" 说：已关闭应用 [星际旅行]

</div>

## 命令触发 vs 消息触发

刚才的所有回调都是由具体的、指定的命令来触发运行的

然而，你也可以使用消息触发

比如，你在奶茶店随便说了一句话，就能触发该回调运行

```py hl_lines="2"
@app.on_state("太阳.奶茶店")
@app.on_text()
async def handle():
    '''令人震惊的事实'''
    await app.send("你发现这里只卖热饮")
```

消息触发的优先级低于命令触发

进一步了解`app.on_xxx()` [on_xxx](../develop/app.md#on_xxx)

**实现效果**

<div class="demo">

"user" 说：#travel
"Bot" 说：已打开应用 [星际旅行]
"user" 说：#move 太阳 奶茶店
"Bot" 说：前往 太阳 奶茶店
"user" 说：#drink
"Bot" 说：喝了一口3000度的奶茶
"user" 说：嗯？
"Bot" 说：你发现这里只卖热饮
"user" 说：#exit
"Bot" 说：已关闭应用 [星际旅行]

</div>

## 配置项

你在太阳上的森林公园里捡到了?块金子，你想设置你到底能捡到几个

```py hl_lines="1-4 7"
from ayaka import AyakaConfig
class Config(AyakaConfig):
    __app_name__ = app.name
    gold_number: int = 1


config = Config()


@app.on_state("太阳.森林公园")
@app.on_cmd("fake_pick")
async def get_gold():
    '''捡金子'''
    await app.send(f"虚假的喜加一 {config.gold_number}")
```

**app.name**

对应

```py
app = AyakaApp("星际旅行")
```

查看`data/ayaka/ayaka_setting.json`

```json
{
    "星际旅行": {
        "gold_number": 1
    },
    // ...
}
```

修改配置后需要**重启bot**才生效

**实现效果**

<div class="demo">

"user" 说：#travel
"Bot" 说：已打开应用 [星际旅行]
"user" 说：#move 太阳 森林公园
"Bot" 说：前往 太阳 森林公园
"user" 说：#fake_pick
"Bot" 说：虚假的喜加一 1
"user" 说：#exit
"Bot" 说：已关闭应用 [星际旅行]
"sys" 说：修改配置为10并重启bot后
"user" 说：#travel
"Bot" 说：已打开应用 [星际旅行]
"user" 说：#move 太阳 森林公园
"Bot" 说：前往 太阳 森林公园
"user" 说：#fake_pick
"Bot" 说：虚假的喜加一 10
"user" 说：#exit
"Bot" 说：已关闭应用 [星际旅行]

</div>

## 动态修改配置项

跑到后台修改配置再重启bot实在太麻烦了，你想通过命令修改配置

```py hl_lines="1-4"
from pydantic import Field
from ayaka import AyakaInput
class UserInput(AyakaInput):
    number: int = Field(description="一次捡起的金块数量")


@app.on_state("太阳.森林公园")
@app.on_cmd("change")
async def change_gold_number(userinput: UserInput):
    '''修改捡金子配置'''
    config.gold_number = userinput.number
    await app.send("修改成功")
```

**AyakaInput**

进一步了解`AyakaInput` [AyakaInput](../develop/input.md)

**实现效果**

<div class="demo">

"user" 说：#travel
"Bot" 说：已打开应用 [星际旅行]
"user" 说：#move 太阳 森林公园
"Bot" 说：前往 太阳 森林公园
"user" 说：#change 100
"Bot" 说：修改成功
"user" 说：#exit
"Bot" 说：已关闭应用 [星际旅行]

</div>

注意，修改后可能不会立刻写入配置文件（但是已经生效），需要等待0-60s后才写入

## 使用正则

你可以使用正则让指令更人性

关于正则：[推荐教程](https://taoshu.in/hello-regexp.html)

```py hl_lines="2 5"
@app.on_state("太阳.森林公园")
@app.on_cmd_regex("一次捡(\d+)块")
async def change_gold_number():
    '''修改捡金子配置'''
    config.gold_number = int(app.cmd_regex.group(1))
    await app.send("修改成功")
```

**app.cmd_regex**

返回`re.match("一次捡(\d+)块", text)`的结果

正则只对命令生效

**实现效果**

<div class="demo">

"user" 说：#travel
"Bot" 说：已打开应用 [星际旅行]
"user" 说：#move 太阳 森林公园
"Bot" 说：前往 太阳 森林公园
"user" 说：#一次捡1000块
"Bot" 说：修改成功
"user" 说：#exit
"Bot" 说：已关闭应用 [星际旅行]

</div>

## 数据库

但是一旦重启bot，你就会失去你的所有金子，这意味着你需要一个数据库来持久地保存数据

```py hl_lines="1-4"
from ayaka import AyakaUserDB
class Data(AyakaUserDB):
    __table_name__ = "gold"
    gold_number: int = 0


@app.on_state("太阳.森林公园")
@app.on_cmd("real_pick")
async def get_gold(data: Data):
    '''捡金子'''
    data.gold_number += config.gold_number
    data.save()
    await app.send(f"真正的喜加一 {data.gold_number}")
```

进一步了解`AyakaUserDB` [AyakaUserDB](../develop/db.md)

**实现效果**

<div class="demo">

"user" 说：#travel
"Bot" 说：已打开应用 [星际旅行]
"user" 说：#move 太阳 森林公园
"Bot" 说：前往 太阳 森林公园
"user" 说：#real_pick
"user" 说：#exit
"Bot" 说：真正的喜加一 1000
"Bot" 说：已关闭应用 [星际旅行]
"sys" 说：bot重启后
"user" 说：#travel
"Bot" 说：已打开应用 [星际旅行]
"user" 说：#move 太阳 森林公园
"Bot" 说：前往 太阳 森林公园
"user" 说：#real_pick
"Bot" 说：真正的喜加一 2000
"user" 说：#exit
"Bot" 说：已关闭应用 [星际旅行]

</div>

## 插件帮助

现在，我们写完了一个小插件了，那么该为它编写帮助了

不幸的是，你已经在上述代码中完成了它

通过分析 注册回调的注释(`__doc__`)，ayaka内置插件[ayaka_master](../develop/master.md)会自动生成对应的帮助

现在，你只需发送命令`help` 

**实现效果**

<div class="demo">

"user" 说：#help
"Bot" 说：使用 帮助 &lt;插件名> 可以进一步展示指定插件的详细帮助信息

</div>

<div class="demo">

"user" 说：#help 星际旅行
"Bot" 说：[星际旅行]
xing ji lv xing
- 星际旅行/travel | 打开应用
[星际旅行]
- 退出/exit | 关闭应用
- hi | 打招呼
- move | 移动
[星际旅行.地球]
- drink | 喝水
[星际旅行.月球]
- drink | 喝水
[星际旅行.太阳]
- drink | 喝太阳风
- watch/看表演 | 看表演
[星际旅行.太阳.奶茶店]
- drink | 喝奶茶
- &lt;任意文字> | 令人震惊的事实
[星际旅行.太阳.售票处]
- buy/买票 | 买门票
[星际旅行.太阳.森林公园]
- fake_pick | 捡金子
- change &lt;number> | 修改捡金子配置
    &lt;number> 一次捡起的金块数量
- 一次捡(\d+)块 | 修改捡金子配置
- real_pick | 捡金子

</div>

<div class="demo">

"user" 说：#travel
"Bot" 说：已打开应用 [星际旅行]
"user" 说：#help
"Bot" 说：[星际旅行]
- 退出/exit | 关闭应用
- hi | 打招呼
- move | 移动
"user" 说：#exit
"Bot" 说：已关闭应用 [星际旅行]

</div>

<div class="demo">

"user" 说：#travel
"Bot" 说：已打开应用 [星际旅行]
"user" 说：#move 太阳 森林公园
"Bot" 说：前往 太阳 森林公园
"user" 说：#help
"Bot" 说：[星际旅行.太阳.森林公园]
- fake_pick | 捡金子
- change &lt;number> | 修改捡金子配置
    &lt;number> 一次捡起的金块数量
- 一次捡(\d+)块 | 修改捡金子配置
- real_pick | 捡金子
[星际旅行.太阳]
- drink | 喝太阳风
- watch/看表演 | 看表演
[星际旅行]
- 退出/exit | 关闭应用
- hi | 打招呼
- move | 移动
"user" 说：#exit
"Bot" 说：已关闭应用 [星际旅行]

</div>

## 全部代码

```py
# ---------- 1 ----------
from ayaka import AyakaApp

app = AyakaApp("星际旅行")
app.help = "xing ji lv xing"

# 启动应用
app.set_start_cmds("星际旅行", "travel")
# 关闭应用
app.set_close_cmds("退出", "exit")


# ---------- 2 ----------
# 装饰器的顺序没有强制要求
@app.on_state()
@app.on_deep_all()
@app.on_cmd("hi")
async def say_hi():
    '''打招呼'''
    await app.send(f"hi I'm in {app.state}")


# ---------- 3 ----------
@app.on_state()
@app.on_deep_all()
@app.on_cmd("move")
async def move():
    '''移动'''
    args = [str(a) for a in app.args]
    await app.set_state(*args)
    await app.send(f"前往 {app.arg}")


# ---------- 4 ----------
# 注册各种行动
@app.on_state("地球", "月球")
@app.on_cmd("drink")
async def drink():
    '''喝水'''
    await app.send("喝水")


@app.on_state("太阳")
@app.on_deep_all()
@app.on_cmd("drink")
async def drink():
    '''喝太阳风'''
    await app.send("喝太阳风")


# ---------- 5 ----------
@app.on_state("太阳.奶茶店")
@app.on_cmd("drink")
async def drink():
    '''喝奶茶'''
    await app.send("喝了一口3000度的奶茶")


# ---------- 6 ----------
from ayaka import AyakaCache
class Cache(AyakaCache):
    ticket: int = 0


@app.on_state("太阳.售票处")
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


# ---------- 7 ----------
@app.on_state("太阳.奶茶店")
@app.on_text()
async def handle():
    '''令人震惊的事实'''
    await app.send("你发现这里只卖热饮")


# ---------- 8 ----------
from ayaka import AyakaConfig
class Config(AyakaConfig):
    __app_name__ = app.name
    gold_number: int = 1


config = Config()


@app.on_state("太阳.森林公园")
@app.on_cmd("fake_pick")
async def get_gold():
    '''捡金子'''
    await app.send(f"虚假的喜加一 {config.gold_number}")


# ---------- 9 ----------
from pydantic import Field
from ayaka import AyakaInput
class UserInput(AyakaInput):
    number: int = Field(description="一次捡起的金块数量")


@app.on_state("太阳.森林公园")
@app.on_cmd("change")
async def change_gold_number(userinput: UserInput):
    '''修改捡金子配置'''
    config.gold_number = userinput.number
    await app.send("修改成功")


# ---------- 10 ----------
@app.on_state("太阳.森林公园")
@app.on_cmd_regex("一次捡(\d+)块")
async def change_gold_number():
    '''修改捡金子配置'''
    config.gold_number = int(app.cmd_regex.group(1))
    await app.send("修改成功")
    
    
# ---------- 11 ----------
from ayaka import AyakaUserDB
class Data(AyakaUserDB):
    __table_name__ = "gold"
    gold_number: int = 0


@app.on_state("太阳.森林公园")
@app.on_cmd("real_pick")
async def get_gold(data: Data):
    '''捡金子'''
    data.gold_number += config.gold_number
    data.save()
    await app.send(f"真正的喜加一 {data.gold_number}")
```

## 下一步

<div align="right">
    在这里~ ↘

</div>




