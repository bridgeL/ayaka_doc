# 例程代码

给出几份例程代码以帮助读者理解使用

## 如何使用例程代码？

首先确保ayaka插件已经安装

所有的示例代码都可以在 [衍生插件示例库](https://github.com/bridgeL/ayaka_plugins) 中找到

下载其中的插件，放到nonebot工作目录下的`src/plugins`中，随后启动nonebot即可

或者您可以直接在本文档中复制，所有代码块均可在右上角一键复制

## 自动分割消息

ayaka插件将会自动根据配置项中的分割符来分割消息，例如：

收到用户指令

```
#test a   b c
```

会在ayaka插件处理后变为

``` py
@app.on_command("test")
async def _():
    # 此时app身上的如下属性的值应该是：...
    assert app.cmd == "test"
    assert str(app.arg) == "a   b c"
    assert str(app.args[0]) == "a"
    assert str(app.args[1]) == "b"
    assert str(app.args[2]) == "c"
```

## 具有状态机的复读机

``` py
'''
    具有状态机的复读模块
'''
from ayaka import AyakaApp

app = AyakaApp("echo")
app.help = {
    "init": "复读只因",
    "reverse": "说反话模式"
}
# init、reverse表示不同的状态
# 当app在某状态下时，app.help = 该状态对应的帮助
# app.intro = init对应的帮助


# 打开app
@app.on_command("echo")
async def app_entrance():
    '''开始复读 或 打开复读机'''
    # 输入参数则复读参数（无状态响应
    # > #echo hihi
    # < hihi
    if app.arg:
        await app.send(app.arg)
        return

    # 没有输入参数则运行该应用
    # 运行后，应用初始状态默认为init
    await app.start()

# on_state_text、on_state_command注册的回调都是在app运行后才有机会响应

# 正常复读
@app.on_state_text()
async def repeat():
    await app.send(app.message)


# 任意状态均可直接退出
@app.on_state_command(["exit", "退出"], "*")
async def app_exit():
    '''退出复读机'''
    await app.close()


# 通过命令，跳转到reverse状态
@app.on_state_command(["rev", "reverse", "话反说", "反", "说反话"])
async def start_rev():
    '''开始说反话'''
    app.set_state("reverse")
    await app.send("开始说反话")


# 反向复读
@app.on_state_text("reverse")
async def reverse_echo():
    msg = str(app.message)
    msg = "".join(reversed(msg))
    await app.send(msg)


# 通过命令，跳转回初始状态
@app.on_state_command("back", "reverse")
async def back():
    '''停止说反话'''
    app.set_state()
    await app.send("话反说止停")
```

## a + b

使用cache实现两个数依次输入后相加

``` py
'''
    a + b 
    
    各群聊间、各插件间，数据独立，互不影响；不需要自己再专门建个字典了
'''
from ayaka import AyakaApp

app = AyakaApp("a-plus-b")


@app.on_command("set_a")
async def set_a():
    app.cache.a = int(str(app.arg)) if app.arg else 0
    await app.send(app.cache.a)


@app.on_command("set_b")
async def set_b():
    app.cache.b = int(str(app.arg)) if app.arg else 0
    await app.send(app.cache.b)


@app.on_command("calc")
async def calc():
    a = app.cache.a or 0
    b = app.cache.b or 0
    await app.send(str(a+b))
```

## 小游戏 加一秒

仅展示部分代码以供读者理解group_storage的使用

全部插件内容请前往仓库查看[plus_time.py](https://github.com/bridgeL/ayaka_plugins/blob/master/plus_time.py)查看

``` py
    ...
    def __init__(self):
        ...
        # 如果给定了default，那么在load时，若文件不存在，会写入default作为初始值

        # 保存地址为 data/groups/<bot_id>/<app_name>/<group_id>/time.json

        # bot_id    机器人的qq号
        # app_name  本应用的名字
        # group_id  群聊的qq号

        # 显然，保存将自动区分不同机器人，不同群聊，不同应用
        self.storage = app.group_storage("time.json", default={})
        self.load()
        ...

    ...
    def load(self):
        # 加载数据，如果不存在文件，则自动创建
        data: dict = self.storage.load()
        ...

    ...
    def save(self):
        # 保存数据
        # 如果是json文件，则data在写入时会自动通过json.dumps转换
        # 如果是txt文件，则data只能是str类型
        self.storage.save(self.data)
        ...
```

## 定时器 Timer

注意，定时器触发回调时，由于缺乏消息激励源，app的大部分属性(bot、group、event、valid、cache、user_name等)将无法正确访问到，并且无法使用app.send方法，需要使用专用的t_send方法

``` py
'''
    整点报时
'''
from ayaka import AyakaApp

app = AyakaApp("整点报时")


@app.on_interval(60, s=0)
async def every_minute():
    await app.t_send(bot_id=2317709898, group_id=666214666, message="小乐")


@app.on_interval(3600, m=0, s=0)
async def every_hour():
    await app.t_send(bot_id=2317709898, group_id=666214666, message="大乐")


@app.on_everyday(h=23, m=59, s=59)
async def every_day():
    await app.t_send(bot_id=2317709898, 
    group_id=666214666, message="呃呃呃一天要结束了")

```

## 截图 playwright

注意，win平台使用playwright时需要关闭fastapi的reload功能

``` py

'''
    can can baidu
'''

from pathlib import Path
from ayaka import get_new_page, AyakaApp, MessageSegment

app = AyakaApp("看看baidu")


@app.on_command("ccb")
async def _():
    async with get_new_page() as p:
        await p.goto("http://www.baidu.com", wait_until="networkidle")
        path = Path("test.png").absolute()
        await p.screenshot(path=path)
    image = MessageSegment.image(path)
    await app.send(image)

```

## 下一步

<div align="right">
    在这里~ ↘
</div>
