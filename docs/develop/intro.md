每个插件中都可以创建一个或多个盒子`AyakaBox`

## 命令隔离

通过盒子这一概念，将不同插件的命令分隔开

- 普通情况下，群聊内没有任何盒子在运行，此时称群聊为闲置状态
- 在发送相应打开命令后，打开某个盒子，而当前群聊将被该盒子独占
- 其他盒子的命令将暂时失效，群聊只接受当前正在运行的盒子的命令
- 所谓的独占仅仅是对所有使用了盒子（即使用了`ayaka`）的插件而言的，对其他插件来说没有影响
- 再次发送相应关闭命令，关闭该盒子，群聊恢复为闲置状态

显然，同一群聊同一时间最多只能运行一个盒子

## 状态机

打开盒子后，群聊处于盒子独占状态

在此基础上，群聊还将保存一个字符串，标识盒子状态

- 盒子打开后，默认初始状态为idle
- 可以通过box.set_state方法，修改该状态的值
- 在注册命令时，可以设置该命令在何种盒子状态下生效

例如：hh命令被注册在test状态下，那么当盒子不处于test状态时，盒子将不响应hh命令

### 群聊状态

| 状态         | 意义             |
| ------------ | ---------------- |
| 闲置状态     | 没有运行任何盒子 |
| 盒子独占状态 | 正在运行某个盒子 |

### 盒子状态

| 状态 | 意义                     |
| ---- | ------------------------ |
| idle | 盒子打开后的默认初始状态 |
| 其他 | 自定义的其他盒子状态     |
| *    | 所有盒子状态             |

注意：盒子idle状态与群聊闲置状态不同

| 名称         | 意义                                                           |
| ------------ | -------------------------------------------------------------- |
| 群聊闲置状态 | 没有任何盒子在运行                                             |
| 盒子idle状态 | 盒子已打开，但是正处于默认初始状态idle，此时群聊正被该盒子独占 |

## 数据缓存

每个群聊中的每个盒子都有一个字典（`box.cache`），可用于保存数据

```py
@box.on_cmd(cmds="test")
async def func():
    box.cache["data"] = "ok"
    box.cache["yes"] = 12
    print(box.cache)
```

不同群聊、不同盒子间的字典是相互独立的，请放心读写数据

```
以上段代码为例

群聊a发送指令test，程序输出box.cache
群聊b发送指令test，程序输出box.cache

这两个box.cache实际上是不同的字典，相互独立
```

你也可以结合`pydantic.BaseModel`使用

```py
from pydantic import BaseModel

class TestData(BaseModel):
    name:str = "tom"
    age:int = 404

@box.on_cmd(cmds="test")
async def func():
    test_data = box.get_data(TestData)
```

`test_data`为`TestData`对象，如果不存在则使用`TestData()`初始化

## 常用操作

### 注册命令

命令可以注册在不同的状态下，令它们仅在该状态下生效

命令天然的属于某个box

举例：

=== "NONEBOT2"

    ``` py
    from ayaka import AyakaBox
    from nonebot import on_command

    box = AyakaBox("test")

    async def func():
        pass

    on_command("a", rule=box.rule(states="idle"), handlers=[func])
    on_command("b", rule=box.rule(states=["menu", "test"]), handlers=[func])
    on_command("c", rule=box.rule(), handlers=[func])
    on_command("d", rule=box.rule(states="*"), handlers=[func])
    on_command("e", handlers=[func])
    ```

=== "AYAKA"

    ``` py
    from ayaka import AyakaBox

    box = AyakaBox("test")

    async def func():
        pass

    box.on_cmd(cmds="a", states="idle")(func)
    box.on_cmd(cmds="b", states=["menu", "test"])(func)
    box.on_cmd(cmds="c")(func)
    box.on_cmd(cmds="d", states="*")(func)
    box.on_cmd(cmds="e", always=True)(func)
    ```

| 命令 | 从属box | 在何时生效                    |
| ---- | ------- | ----------------------------- |
| a    | test    | box.state == idle             |
| b    | test    | box.state in [menu, test]     |
| c    | test    | 群聊处于闲置状态时生效        |
| d    | test    | box开启后，任意状态均生效     |
| e    | test    | 不受ayaka的状态约束，总是生效 |

c命令一般用于开启box

### 打开、关闭盒子

```py
await box.start()
await box.close()
```

box.start还可以额外附加参数，指定打开盒子后的初始状态（不再使用默认的idle）

```py
await box.start("test")
```

### 设置状态

```py
await box.set_state("next")
```

## 下一步

<div align="right">
    在这里~ ↘
</div>
