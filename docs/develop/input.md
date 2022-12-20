# AyakaInput

将`Message`转换为我们所需要的一系列参数

## 基本使用

将需要的参数打包到一个类中，该类继承自`AyakaInput`，编写方法参考[pydantic.BaseModel](https://docs.pydantic.dev/usage/models/)

使用时放入回调的参数表中即可


```py
from ayaka import AyakaInput, AyakaApp

app = AyakaApp("test")

class UserInput(AyakaInput):
    name:str 
    age:int 

@app.on_cmd("f1")
async def func_1(userinput:UserInput):
    print(userinput)
```

注意，一定要编写类型提示，默认值可以不写

| 代码            | 备注 |
| --------------- | ---- |
| `name:str = ""` | 正确 |
| `name = ""`     | 错误 |
| `name:str`      | 正确 |
| `name`          | 错误 |


<div class="demo">
<<< "user" 说：#f1 张三丰 100
name='张三丰' age=100
</div>

<div class="demo">
<<< "user" 说：#f1 张三丰
>>>  "Bot" 说：
1 validation error for UserInput
age
  field required (type=value_error.missing)
</div>

<div class="demo">
<<< "user" 说：#f1 张三丰 测试
>>>  "Bot" 说：
1 validation error for UserInput
age
  value is not a valid integer (type=type_error.integer)
</div>

## 进阶：msg_type

使用`msg_type`获取指定类型的`MessageSegment`（除了`type=text`类型）

```py
from ayaka import AyakaInput, msg_type, AyakaApp

app = AyakaApp("test")

class UserInput(AyakaInput):
    at:msg_type.T_At 

@app.on_cmd("f1")
async def func_1(userinput:UserInput):
    print(userinput)
```

<div class="demo">
<<< "user" 说：#f1 123
>>>  "Bot" 说：
1 validation error for UserInput
at
  MessageSegment required (type=type_error)
</div>

<div class="demo">
<<< "user" 说：#f1 [CQ:at,qq=12]
at=MessageSegment(type='at', data={'qq': '12'})
</div>

## 进阶：约束

使用`pydantic`进行约束，约束条件参考[pydantic.Field](https://docs.pydantic.dev/usage/types/#constrained-types)

```py
from ayaka import AyakaInput, AyakaApp
from pydantic import Field

app = AyakaApp("test")

class UserInput(AyakaInput):
    age:int = Field(gt=0)

@app.on_cmd("f1")
async def func_1(userinput:UserInput):
    print(userinput)
```


<div class="demo">
<<< "user" 说：#f1 -1
>>>  "Bot" 说：
1 validation error for UserInput
age
  ensure this value is greater than 0 (type=value_error.number.not_gt; limit_value=0)
</div>

<div class="demo">
<<< "user" 说：#f1 100
age=100
</div>


## 进阶：帮助

使用`Field`，编写`description`，以便`ayaka_master`为该属性提供帮助

```py
from pydantic import Field
from ayaka import AyakaInput, AyakaApp

app = AyakaApp("test")


class UserInput(AyakaInput):
    name: str = Field(description="名字")
    age: int = Field(description="年龄")


@app.on_cmd("f1")
async def func_1(userinput: UserInput):
    pass
```

<div class="demo">
<<< "user" 说：#help test
>>>  "Bot" 说：[test]
- f1 &lt;name> &lt;age>
    &lt;name> 名字
    &lt;age> 年龄
</div>


## 特殊：不能嵌套

不可以嵌套其他BaseModel模型

```py hl_lines="13"
from pydantic import BaseModel, Field
from ayaka import AyakaInput, AyakaApp

app = AyakaApp("test")


class User(BaseModel):
    name: str = Field(description="名字")
    age: int = Field(description="年龄")


class UserInput(AyakaInput):
    user: User


@app.on_cmd("f1")
async def func_1(userinput: UserInput):
    print(userinput)

```

<div class="demo">
<<< "user" 说：#f1
>>>  "Bot" 说：
1 validation error for UserInput
user
  field required (type=value_error.missing)
</div>


## 下一步

<div align="right">
    在这里~ ↘
</div>