# 快速开始

有两种写法，二者是等价的，只不过由box进行了封装，少写点代码罢了

## matcher 写法

兼容性更好

```py
# my_plugin.py

from ayaka import AyakaBox
from nonebot import on_command

# 创建box
box = AyakaBox("测试")

# 定义matchers
ENTANCE = on_command("打开", aliases={"open"}, rule=box.rule())
EXIT = on_command("关闭", rule=box.rule(states="*"))
DO_SOMETHING = on_command("你好", rule=box.rule(states=["idle", "world"]))
GOTO_WORLD = on_command("换个状态", rule=box.rule(states="idle"))

# 打开、关闭盒子
@ENTANCE.handle()
async def entrance():
    await box.start()

@EXIT.handle()
async def exit_box():
    await box.close()

# 你好
@DO_SOMETHING.handle()
async def hello():
    await DO_SOMETHING.send(f"[{box.state}] 你好，世界！")

# 换个状态
@GOTO_WORLD.handle()
async def goto_world():
    await box.set_state("world")
    await GOTO_WORLD.send("已设置状态为world")
```

## box.on_xxx 写法

代码更紧凑

```py
# my_plugin.py

from ayaka import AyakaBox

box = AyakaBox("测试")

# 打开、关闭盒子
box.set_start_cmds(cmds=["打开", "open"])
box.set_close_cmds(cmds="关闭")

# 你好
@box.on_cmd(cmds="你好", states=["idle", "world"])
async def hello():
    await box.send(f"[{box.state}] 你好，世界！")

# 换个状态
@box.on_cmd(cmds="换个状态", states="idle")
async def goto_world():
    await box.set_state("world")
    await box.send("已设置状态为world")
```

## 实现效果

<div class="demo">
"user" 说：你好
"user" 说：你好
"user" 说：打开
"Bot" 说：已启动应用[测试]
"user" 说：你好
"Bot" 说：[idle] 你好，世界！
"user" 说：换个状态
"Bot" 说：已设置状态为world
"user" 说：你好
"Bot" 说：[world] 你好，世界！
"user" 说：关闭
"Bot" 说：已关闭应用[测试]
</div>

## 下一步

<div align="right">
    在这里~ ↘

</div>




