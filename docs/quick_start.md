# 快速开始

两种代码风格均可

| 风格     | 特点                           |
| -------- | ------------------------------ |
| NONEBOT2 | 兼容性更好                     |
| AYAKA    | 代码更紧凑，更快的插件加载速度 |

## 状态机

=== "NONEBOT2"

    ```py
    from ayaka import AyakaBox
    from nonebot import on_command

    # 创建box
    box = AyakaBox("测试")

    # 定义matchers
    ENTER = on_command("打开", aliases={"open"}, rule=box.rule())
    EXIT = on_command("关闭", rule=box.rule(states="*"))
    DO_SOMETHING = on_command("你好", rule=box.rule(states=["idle", "world"]))
    GOTO_WORLD = on_command("换个状态", rule=box.rule(states="idle"))

    # 打开盒子
    @ENTER.handle()
    async def enter_box():
        await box.start()

    # 关闭盒子
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
        box.state = "world"
        await GOTO_WORLD.send("已设置状态为world")
    ```

=== "AYAKA"

    ```py
    from ayaka import AyakaBox

    # 创建box
    box = AyakaBox("测试")

    # 打开盒子
    box.set_start_cmds(cmds=["打开", "open"])
    # 关闭盒子
    box.set_close_cmds(cmds="关闭")

    # 你好
    @box.on_cmd(cmds="你好", states=["idle", "world"])
    async def hello():
        await box.send(f"[{box.state}] 你好，世界！")

    # 换个状态
    @box.on_cmd(cmds="换个状态", states="idle")
    async def goto_world():
        box.state = "world"
        await box.send("已设置状态为world")
    ```

**实现效果**

<div class="demo">
"user" 说：你好
"user" 说：你好
"user" 说：打开
"Bot" 说：已启动盒子[测试]
"user" 说：你好
"Bot" 说：[idle] 你好，世界！
"user" 说：换个状态
"Bot" 说：已设置状态为world
"user" 说：你好
"Bot" 说：[world] 你好，世界！
"user" 说：关闭
"Bot" 说：已关闭盒子[测试]
</div>

## 数据缓存

=== "NONEBOT2"

    ```py
    from ayaka import AyakaBox
    from pydantic import BaseModel
    from nonebot import on_command

    class CacheData(BaseModel):
        time:int = 0

    # 创建box
    box = AyakaBox("测试")

    # 定义matcher
    PLUS_ONE = on_command("加一秒", rule=box.rule())

    # 加一秒
    @PLUS_ONE.handle()
    async def plus_one():
        data = box.get_data(CacheData)
        data.time += 1
        await PLUS_ONE.send(f"{data.time}")
    ```

=== "AYAKA"

    ```py
    from ayaka import AyakaBox
    from pydantic import BaseModel

    class CacheData(BaseModel):
        time:int = 0

    # 创建box
    box = AyakaBox("测试")

    # 加一秒
    @box.on_cmd(cmds="加一秒")
    async def plus_one():
        data = box.get_data(CacheData)
        data.time += 1
        await box.send(f"{data.time}")
    ```

**实现效果**

<div class="demo">
"user" 说：加一秒
"Bot" 说：1
"user" 说：加一秒
"Bot" 说：2
"user" 说：加一秒
"Bot" 说：3
"user" 说：加一秒
"Bot" 说：4
</div>

注意：重启bot后数据丢失

## 下一步

<div align="right">
    在这里~ ↘

</div>




