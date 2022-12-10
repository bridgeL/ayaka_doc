# AyakaCache

如果需要临时保存一些数据，以供应用在不同时刻/函数中使用，那么需要使用缓存

## 定义

将需要缓存的数据打包到一个类中，该类继承自`AyakaCache`，编写方法参考[pydantic.BaseModel](https://docs.pydantic.dev/usage/models/)

```py
from ayaka import AyakaCache

class Cache(AyakaCache):
    name:str = ""
    age:int = 0
```

注意，一定要编写类型提示和默认值

| 代码            | 备注 |
| --------------- | ---- |
| `name:str = ""` | 正确 |
| `name = ""`     | 错误 |
| `name:str`      | 错误 |
| `name`          | 错误 |

## 使用

放入回调的参数表中即可

```py
@app.on_cmd("f1")
async def func_1(cache:Cache):
    print(cache.name, cache.age)

@app.on_cmd("f2")
async def func_2(cache:Cache):
    cache.age += 1

@app.on_cmd("f3")
async def func_3(cache:Cache):
    cache.name = str(app.arg)
```

## 进阶：可以嵌套

可以嵌套其他BaseModel模型

```py hl_lines="13"
from pydantic import BaseModel
from ayaka import AyakaCache, AyakaApp

app = AyakaApp("test")


class User(BaseModel):
    name: str
    age: int


class Cache(AyakaCache):
    user: User = User(name="默认", age=0)


@app.on_cmd("f1")
async def func_1(cache: Cache):
    print(cache.user.name)


@app.on_cmd("f2")
async def func_1(cache: Cache):
    cache.user.name = "改名了"
```

用户直接输入 `#f1`   

```
默认
```

用户先输入 `#f2` 再输入 `#f1`

```
改名了
```

## 其他用法（不推荐）

```py
app.cache.name = "a"
print(app.cache.name) # a
```

1. 缺乏类型提示
2. 若读取操作在写入操作之前（执行前后顺序，不是代码顺序），会报错

## 下一步

<div align="right">
    在这里~ ↘
</div>

