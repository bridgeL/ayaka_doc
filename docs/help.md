# 如何为插件编写帮助

## 示例一

``` py
from ayaka import AyakaApp
app = AyakaApp("测试")
app.help = "测试一下"

@app.on_command(["t","test"])
async def handle():
    '''发送成功啦'''
    await app.send("成功啦")
```
<img src="../2.png">

## 示例二

``` py
from ayaka import AyakaApp
app = AyakaApp("测试2")
app.help = "测试一下"


@app.on_command(["t", "test"])
async def handle():
    '''发送成功啦'''
    await app.send("成功啦")


@app.on_command("open-test2")
async def handle():
    '''打开测试2'''
    await app.start()
    app.set_state("running")


@app.on_state_command(["exit", "quit"], "running")
async def handle():
    '''关闭测试2'''
    await app.close()
```
<img src="../3.png">

## 示例三

如果你不喜欢自动组合生成的帮助，你仍可以自己编写全部的帮助

``` py
from ayaka import AyakaApp
app = AyakaApp("测试2")
app.help = {
    "init":'''
测试一下
    - t 发送成功啦
    - open-test2 打开本应用 
''',
    "running":'''
测试2 正在运行
    - exit 退出本应用
'''
}


@app.on_command(["t", "test"])
async def handle():
    await app.send("成功啦")


@app.on_command("open-test2")
async def handle():
    await app.start()
    app.set_state("running")


@app.on_state_command(["exit", "quit"], "running")
async def handle():
    await app.close()
```

<img src="../4.png">

## 下一步

<div align="right">
    在这里~ ↘
</div>

