# 代码速看

这是一个使用ayaka开发的hello world插件的示例

在开始一切之前，您可以阅读本页，以决定该插件是否适合作为您的辅助开发插件，或留下对该插件的第一印象

## Hello World

``` py

'''
    hello world
    
    ayaka可以帮助实现命令隔离
'''
from ayaka import AyakaApp

app = AyakaApp("hello-world")

# 打开app
@app.on_command("hw")
async def app_entrance():
    await app.start()
    # app运行后，进入指定状态(state = "world")
    app.set_state("world")


# 只有world状态可以退出，其他状态运行该指令均为返回world状态
@app.on_state_command(["exit", "退出"], "*")
async def app_exit():
    if app.state == "world":
        await app.close()
    else:
        app.set_state("world")
        await app.send("跳转到 world")


# 对世界、月亮和太阳打个招呼
@app.on_state_command("hi", ["world", "moon", "sun"])
async def hello():
    await app.send(f"hello,{app.state}!")


# 对世界、月亮和太阳来个大比兜
@app.on_state_command("hit", "world")
async def hit():
    await app.send("earthquake")


@app.on_state_command("hit", "moon")
async def hit():
    await app.send("moon fall")


@app.on_state_command("hit", "sun")
async def hit():
    await app.send("big bang!")


# 跳转状态
@app.on_state_command("jump", "*")
async def jump_to_somewhere():
    if not app.arg:
        await app.send("没有参数！")
    else:
        next_state = str(app.arg)
        app.set_state(next_state)
        await app.send(f"跳转到 [{next_state}]")
```

## 效果

state指令的响应是由ayaka内置插件实现的，无需关心实现细节

<img src="../1.png" width="400">


## 下一步

<div align="right">
    在这里~ ↘
</div>

