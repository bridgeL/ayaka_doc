# AyakaConfig

所有ayaka衍生插件均可申请读写`data/ayaka/ayaka_setting.json`中的配置

## 定义

将配置数据打包到一个类中，该类继承自`AyakaConfig`，编写方法参考[pydantic.BaseModel](https://docs.pydantic.dev/usage/models/)

注意，继承时必须编写__app_name__属性的值

```py
from ayaka import AyakaConfig
from typing import List

class Config(AyakaConfig):
    __app_name__ = "一个名字"
    name:str = ""
    age:int = 0
    numbers:List[int] = [1,2]
```

注意，一定要编写类型提示和默认值。

| 代码            | 备注 |
| --------------- | ---- |
| `name:str = ""` | 正确 |
| `name = ""`     | 错误 |
| `name:str`      | 错误 |
| `name`          | 错误 |

如果配置文件不存在，或存在但并没有该插件的配置数据，那么此时默认值便会写入配置文件中，因此，一定要编写默认值

## 读取

直接实例化即可

```py
# 加载配置
config = Config()

# 使用配置
@app.on_cmd("f1")
async def func_1():
    print(config.name, config.age, config.numbers)
```

对应配置文件`data/ayaka/ayaka_setting.json`

```json
{
    "一个名字": {
        "name": "",
        "age": 0,
        "numbers": [ 1, 2 ]
    },
    ...
}
```

## 修改

如果是修改不可变对象，那么`ayaka`会自动将新配置写入文件；

如果是修改数组、字典等**可变对象**的值，则需要调用`AyakaConfig().save()`方法来提醒`ayaka`将数据写入文件

```py
# 修改不可变对象
@app.on_cmd("f1")
async def func_1():
    config.name = "测试1"

# 修改可变对象
@app.on_cmd("f2")
async def func_2():
    config.numbers.append(-1)
    config.save()
```

## AyakaLargeConfig

当配置型较多时，建议使用`AyakaLargeConfig`，它读写的是独立配置文件，`data/ayaka/separate/<__app_name__>.json`

其定义、读取和修改与`AyakaConfig`一致，仅存储位置不同而已

## 下一步

<div align="right">
    在这里~ ↘
</div>
