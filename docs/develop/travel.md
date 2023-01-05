编写一个星际旅行插件，从简单到复杂

## 基本使用

打开和关闭应用

| 动作             | 效果             |
| ---------------- | ---------------- |
| 星际旅行、travel | 打开星际旅行应用 |
| 退出、exit       | 关闭星际旅行应用 |

=== "NONEBOT2"

    ``` py
    # ---------- 1 ----------
    from ayaka import AyakaBox
    from nonebot import on_command

    box = AyakaBox("星际旅行-nb")
    box.help = "xing ji lv xing"

    # 启动应用
    m1 = on_command("星际旅行-nb", aliases={"travel-nb"}, rule=box.rule())
    @m1.handle()
    async def start():
        await box.start()
        
    # 关闭应用
    m2 = on_command("退出", aliases={"exit"}, rule=box.rule(states="*"))
    @m2.handle()
    async def close():
        await box.close()
    ```

=== "AYAKA"

    ```py
    # ---------- 1 ----------
    from ayaka import AyakaBox

    box = AyakaBox("星际旅行")
    box.help = "xing ji lv xing"

    # 启动应用
    box.set_start_cmds(cmds=["星际旅行", "travel"])
    # 关闭应用
    box.set_close_cmds(cmds=["退出", "exit"])
    ```

**实现效果**

<div class="demo">

"user" 说：travel
"Bot" 说：已打开应用 [星际旅行]
"user" 说：退出
"Bot" 说：已关闭应用 [星际旅行]

</div>

## 旅行

| 地点     | 动作        | 效果       |
| -------- | ----------- | ---------- |
| 任意地点 | move <地名> | 去指定地点 |

=== "NONEBOT2"

    ``` py
    # ---------- 2 ----------
    m3 = on_command("move", rule=box.rule(states="*"))
    @m3.handle()
    async def move():
        '''移动'''
        arg = str(box.arg)
        await box.set_state(arg)
        await m3.send(f"前往 {arg}")
    ```

=== "AYAKA"

    ```py 
    # ---------- 2 ----------
    @box.on_cmd(cmds="move", states="*")
    async def move():
        '''移动'''
        arg = str(box.arg)
        await box.set_state(arg)
        await box.send(f"前往 {arg}")
    ```

**实现效果**

<div class="demo">

"user" 说：travel
"Bot" 说：已打开应用 [星际旅行]
"user" 说：move 地球
"Bot" 说：前往 地球
"user" 说：exit
"Bot" 说：已关闭应用 [星际旅行]

</div>

## hello！

实现打招呼的功能

| 地点             | 动作 | 效果            |
| ---------------- | ---- | --------------- |
| 地球, 月球, 太阳 | hi   | 你好，<地名> ！ |

=== "NONEBOT2"

    ``` py
    # ---------- 3 ----------
    m4 = on_command("hi", rule=box.rule(states=["地球", "月球", "太阳"]))
    @m4.handle()
    async def say_hi():
        '''打招呼'''
        await m4.send(f"你好，{box.state}！")
    ```

=== "AYAKA"

    ```py 
    # ---------- 3 ----------
    @box.on_cmd(cmds="hi", states=["地球", "月球", "太阳"])
    async def say_hi():
        '''打招呼'''
        await box.send(f"你好，{box.state}！")
    ```

**实现效果**

<div class="demo">

"user" 说：travel
"Bot" 说：已打开应用 [星际旅行]
"user" 说：move 地球
"Bot" 说：前往 地球
"user" 说：hi
"Bot" 说：你好，地球
"user" 说：exit
"Bot" 说：已关闭应用 [星际旅行]

</div>


## 不同地方不同效果

| 地点       | 动作  | 效果     |
| ---------- | ----- | -------- |
| 地球，月球 | drink | 喝水     |
| 太阳       | drink | 喝太阳风 |

=== "NONEBOT2"

    ``` py
    # ---------- 4 ----------
    # 相同命令，不同行为
    m5 = on_command("drink", rule=box.rule(states=["地球", "月球"]))
    @m5.handle()
    async def drink():
        '''喝水'''
        await m5.send("喝水")

    m6 = on_command("drink", rule=box.rule(states="太阳"))
    @m6.handle()
    async def drink():
        '''喝太阳风'''
        await m6.send("喝太阳风")
    ```

=== "AYAKA"

    ```py 
    # ---------- 4 ----------
    # 相同命令，不同行为
    @box.on_cmd(cmds="drink", states=["地球", "月球"])
    async def drink():
        '''喝水'''
        await box.send("喝水")

    @box.on_cmd(cmds="drink", states="太阳")
    async def drink():
        '''喝太阳风'''
        await box.send("喝太阳风")
    ```

**实现效果**

<div class="demo">

"user" 说：travel
"Bot" 说：已打开应用 [星际旅行]
"user" 说：move 月球
"Bot" 说：前往 月球
"user" 说：drink
"Bot" 说：喝水
"user" 说：move 太阳
"Bot" 说：前往 太阳
"user" 说：drink
"Bot" 说：喝太阳风
"user" 说：exit
"Bot" 说：已关闭应用 [星际旅行]

</div>

## 缓存

宇宙旅游公司又开设了一个新项目：耀斑表演

我们需要先去售票处买耀斑表演的门票，然后才能看表演，一张票不能用多次

| 地点     | 动作  | 效果           |
| -------- | ----- | -------------- |
| 售票处   | buy   | 耀斑表演门票+1 |
| 任意地点 | watch | 看表演         |

=== "NONEBOT2"

    ``` py
    # ---------- 5 ----------
    from ayaka import BaseModel

    class Cache(BaseModel):
        ticket:int = 0

    m7 = on_command("buy", aliases={"买票"}, rule=box.rule(states="售票处"))
    @m7.handle()
    async def buy_ticket():
        '''买门票'''
        cache = box.get_data(Cache)
        cache.ticket += 1
        await m7.send("耀斑表演门票+1")

    m8 = on_command("watch", aliases={"看表演"}, rule=box.rule(states="*"))
    @m8.handle()
    async def watch():
        '''看表演'''
        cache = box.get_data(Cache)
        if cache.ticket <= 0:
            await m8.send("先去售票处买票！")
        else:
            cache.ticket -= 1
            await m8.send("门票-1")
            await m8.send("10分甚至9分的好看")
    ```

=== "AYAKA"

    ```py
    # ---------- 5 ----------
    from ayaka import BaseModel

    class Cache(BaseModel):
        ticket:int = 0

    @box.on_cmd(cmds=["buy", "买票"], states="售票处")
    async def buy_ticket():
        '''买门票'''
        cache = box.get_data(Cache)
        cache.ticket += 1
        await box.send("耀斑表演门票+1")

    @box.on_cmd(cmds=["watch", "看表演"], states="*")
    async def watch():
        '''看表演'''
        cache = box.get_data(Cache)
        if cache.ticket <= 0:
            await box.send("先去售票处买票！")
        else:
            cache.ticket -= 1
            await box.send("门票-1")
            await box.send("10分甚至9分的好看")
    ```

**实现效果**

<div class="demo">

"user" 说：travel
"Bot" 说：已打开应用 [星际旅行]
"user" 说：watch
"Bot" 说：先去售票处买票！
"user" 说：move 售票处
"Bot" 说：前往 售票处
"user" 说：buy
"Bot" 说：耀斑表演门票+1
"user" 说：watch
"Bot" 说：10分甚至9分的好看
"user" 说：watch
"Bot" 说：先去售票处买票！
"user" 说：exit
"Bot" 说：已关闭应用 [星际旅行]

</div>

## 命令触发 vs 消息触发

刚才的所有回调都是由具体的、指定的命令来触发运行的

然而，你也可以使用消息触发

比如，你随便说了一句话，就能触发该回调运行

=== "NONEBOT2"

    ``` py
    # ---------- 6 ----------
    from nonebot import on_message

    m9 = on_message(rule=box.rule(states="火星"))
    @m9.handle()
    async def handle():
        '''令人震惊的事实'''
        await m9.send("你火星了")
    ```

=== "AYAKA"

    ```py 
    # ---------- 6 ----------
    @box.on_text(states="火星")
    async def handle():
        '''令人震惊的事实'''
        await box.send("你火星了")
    ```

消息触发的优先级低于命令触发

**实现效果**

<div class="demo">

"user" 说：travel
"Bot" 说：已打开应用 [星际旅行]
"user" 说：move 火星
"Bot" 说：前往 火星
"user" 说：嗯？
"Bot" 说：你火星了
"user" 说：exit
"Bot" 说：已关闭应用 [星际旅行]

</div>

## 配置项

你在沙城里捡到了?块金子，你想设置你到底能捡到几个

=== "NONEBOT2"

    ``` py
    # ---------- 7 ----------
    from ayaka import AyakaConfig, slow_load_config

    class Cache2(BaseModel):
        gold:int = 0

    @slow_load_config
    class Config(AyakaConfig):
        __config_name__ = box.name
        gold_each_time: int = 1

    m10 = on_command("fake_pick", rule=box.rule(states="沙城"))
    @m10.handle()
    async def get_gold():
        '''捡金子'''
        config = Config()
        cache = box.get_data(Cache2)
        cache.gold += config.gold_each_time
        await m10.send(f"fake +{config.gold_each_time} / {cache.gold}")
    ```

=== "AYAKA"

    ```py 
    # ---------- 7 ----------
    from ayaka import AyakaConfig, slow_load_config

    class Cache2(BaseModel):
        gold:int = 0

    @slow_load_config
    class Config(AyakaConfig):
        __config_name__ = box.name
        gold_each_time: int = 1

    @box.on_cmd(cmds="fake_pick", states="沙城")
    async def get_gold():
        '''捡金子'''
        config = Config()
        cache = box.get_data(Cache2)
        cache.gold += config.gold_each_time
        await box.send(f"fake +{config.gold_each_time} / {cache.gold}")
    ```

查看`data/ayaka/星际旅行.json`

```json
{
    "gold_number": 1
}
```

修改配置后需要**重启bot**才生效

**实现效果**

<div class="demo">

"user" 说：travel
"Bot" 说：已打开应用 [星际旅行]
"user" 说：move 沙城
"Bot" 说：前往 沙城
"user" 说：fake_pick
"Bot" 说：fake +1 / 1
"user" 说：exit
"Bot" 说：已关闭应用 [星际旅行]

"sys" 说：修改配置为10并重启bot后

"user" 说：travel
"Bot" 说：已打开应用 [星际旅行]
"user" 说：move 沙城
"Bot" 说：前往 沙城
"user" 说：fake_pick
"Bot" 说：fake +10 / 10
"user" 说：exit
"Bot" 说：已关闭应用 [星际旅行]

</div>

## 动态修改配置项

跑到后台修改配置再重启bot实在太麻烦了，你想通过命令修改配置

=== "NONEBOT2"

    ``` py
    # ---------- 8 ----------
    from ayaka import Numbers

    m11 = on_command("change", rule=box.rule(states="沙城"))
    @m11.handle()
    async def change_gold_number(nums=Numbers("请输入一个数字")):
        '''修改捡金子配置'''
        config = Config()
        config.gold_each_time = int(nums[0])
        await m11.send(f"修改每次拾取数量为{config.gold_each_time}")
    ```

=== "AYAKA"

    ```py 
    # ---------- 8 ----------
    from ayaka import Numbers

    @box.on_cmd(cmds="change", states="沙城")
    async def change_gold_number(nums=Numbers("请输入一个数字")):
        '''修改捡金子配置'''
        config = Config()
        config.gold_each_time = int(nums[0])
        await box.send(f"修改每次拾取数量为{config.gold_each_time}")
    ```

**实现效果**

<div class="demo">

"user" 说：travel
"Bot" 说：已打开应用 [星际旅行]
"user" 说：move 沙城
"Bot" 说：前往 沙城
"user" 说：change 100
"Bot" 说：修改每次拾取数量为100
"user" 说：fake_pick
"Bot" 说：fake +100 / 100
"user" 说：exit
"Bot" 说：已关闭应用 [星际旅行]

</div>

## 数据库

但是一旦重启bot，你就会失去你的所有金子，这意味着你需要一个数据库来持久地保存数据

=== "NONEBOT2"

    ``` py
    # ---------- 9 ----------
    from ayaka import AyakaBox, AyakaUserDB

    class UserGold(AyakaUserDB):
        __table_name__ = "user_gold"
        value:int = 0

    m12 = on_command("real_pick", rule=box.rule(states="沙城"))
    @m12.handle()
    async def get_gold():
        '''捡金子'''
        config = Config()
        gold = UserGold.select_one(
            group_id = box.group_id,
            user_id = box.user_id
        )
        gold.value += config.gold_each_time
        await m12.send(f"real +{config.gold_each_time} / {gold.value}")
    ```

=== "AYAKA"

    ```py
    # ---------- 9 ----------
    from ayaka import AyakaBox, AyakaUserDB

    class UserGold(AyakaUserDB):
        __table_name__ = "user_gold"
        value:int = 0

    @box.on_cmd(cmds="real_pick", states="沙城")
    async def get_gold():
        '''捡金子'''
        config = Config()
        gold = UserGold.select_one(
            group_id = box.group_id,
            user_id = box.user_id
        )
        gold.value += config.gold_each_time
        await box.send(f"real +{config.gold_each_time} / {gold.value}")
    ```

**实现效果**

<div class="demo">

"user" 说：travel
"Bot" 说：已打开应用 [星际旅行]
"user" 说：move 沙城
"Bot" 说：前往 沙城
"user" 说：real_pick
"Bot" 说：real +1000 / 1000
"user" 说：exit
"Bot" 说：已关闭应用 [星际旅行]
"sys" 说：bot重启后
"user" 说：travel
"Bot" 说：已打开应用 [星际旅行]
"user" 说：move 沙城
"Bot" 说：前往 沙城
"user" 说：real_pick
"Bot" 说：real +1000 / 2000
"user" 说：exit
"Bot" 说：已关闭应用 [星际旅行]

</div>

## 插件帮助

现在，我们写完了一个小插件了，那么该为它编写帮助了

不幸的是，如果你使用的是AYAKA风格编写代码，那么你已经在上述代码中完成了它

通过分析注册回调的注释(`func.__doc__`)，`ayaka`会自动生成对应的帮助

现在，你只需发送命令`盒子帮助` 

**实现效果**

<div class="demo">
"user" 说：盒子帮助
"Bot" 说：[盒子管理器]
- 盒子帮助/box help/box_help/box-help/box帮助 展示盒子帮助
- 盒子状态/box state/box_state/box-state/box状态
"Bot" 说：[星际旅行]
xing ji lv xing
- 星际旅行/travel 启动应用
[*]
- 退出/exit 关闭应用
- move 移动
- watch/看表演 看表演
[地球]
- hi 打招呼
- drink 喝水
[月球]
- hi 打招呼
- drink 喝水
[太阳]
- hi 打招呼
- drink 喝太阳风
[售票处]
- buy/买票 买门票
[火星]
- <任意文字> 令人震惊的事实
[沙城]
- fake_pick 捡金子
- change 修改捡金子配置
- real_pick 捡金子
</div>

## 全部代码

=== "NONEBOT2"

    [星际旅行-nb.py](https://github.com/bridgeL/nonebot-plugin-ayaka/blob/master/plugins/%E6%98%9F%E9%99%85%E6%97%85%E8%A1%8C-nb.py)

=== "AYAKA"

    [星际旅行.py](https://github.com/bridgeL/nonebot-plugin-ayaka/blob/master/plugins/%E6%98%9F%E9%99%85%E6%97%85%E8%A1%8C.py)

## 下一步

<div align="right">
    在这里~ ↘

</div>




