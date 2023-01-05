# AyakaConfig

读写独立配置文件

## 基本使用

设计一个Config类中，该类继承`AyakaConfig`，编写方法参考[pydantic.BaseModel](https://docs.pydantic.dev/usage/models/)

注意，继承时必须编写`__config_name__`的值

```py
from ayaka import AyakaConfig, AyakaBox

box = AyakaBox("test")

class Config(AyakaConfig):
    __config_name__ = "一个名字"
    name:str = ""
    age:int = 0
    numbers:list[int] = [1,2]

# 加载配置
config = Config()

# 使用配置
@box.on_cmd("f1")
async def func_1():
    print(config.name, config.age, config.numbers)

# 修改配置
@box.on_cmd("f2")
async def func_2():
    config.name = "测试1"
    # config.save()
```

注意：一定要编写类型提示和默认值。如果配置文件不存在 或 存在但缺少一些数据，那么此时默认值便会写入配置文件中。因此，一定要编写默认值

| 代码            | 备注 |
| --------------- | ---- |
| `name:str = ""` | 正确 |
| `name = ""`     | 错误 |
| `name:str`      | 错误 |
| `name`          | 错误 |

对应配置文件`data/ayaka/一个名字.json`

```json
{
    "name": "",
    "age": 0,
    "numbers": [ 1, 2 ]
}
```

## 自动保存

如果是修改不可变对象，那么`ayaka`会自动将新配置写入文件，可省略`AyakaConfig().save()`

如果是修改数组、字典等**可变对象**的值，则需要调用`AyakaConfig().save()`方法来提醒`ayaka`将数据写入文件

```py
# 修改不可变对象
@box.on_cmd("f1")
async def func_1():
    config.name = "测试1"

# 修改可变对象
@box.on_cmd("f2")
async def func_2():
    config.numbers.boxend(-1)
    config.save()
```

## 进阶：可以嵌套

可以嵌套其他BaseModel模型

```py
from pydantic import BaseModel
from ayaka import AyakaConfig, Ayakabox

box = Ayakabox("test")

class User(BaseModel):
    name: str
    age: int

class Config(AyakaConfig):
    __config_name__ = box.name
    user: User = User(name="默认", age=0)
    id:int = 1000

config = Config()
```

对应配置文件

```json
{
    "user": {
        "name": "默认",
        "age": 0
    },
    "id": 1000
}
```

## 下一步

<div align="right">
    在这里~ ↘
</div>
