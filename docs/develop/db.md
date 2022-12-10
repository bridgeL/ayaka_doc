# AyakaDB

如果需要持久保存一些数据，以供应用在bot重启后仍可使用，那么需要使用数据库

## 基本使用

将需要保存的数据打包到一个类中，该类继承自`AyakaDB`，编写方法参考[pydantic.BaseModel](https://docs.pydantic.dev/usage/models/)

```py hl_lines="8 14"
from pydantic import Field
from ayaka import AyakaApp, AyakaDB

app = AyakaApp("test")


class Data(AyakaDB):
    __table_name__ = "test"
    id: int = Field(extra=AyakaDB.__primary_key__)
    name: str
    age: int


Data.create_table()


@app.on_cmd("f1")
async def _():
    # 创建数据
    data = Data(id=1, name="测试", age=12)
    # 写入数据库
    data.save()


@app.on_cmd("f2")
async def _():
    # 读取数据库
    data = Data.select_one(id=1)
    print(data)

```

注意，一定要编写__table_name__

注意，一定要调用`Data.create_table()`，否则数据库里没有创建相应的表（这一点考虑后续版本优化掉

注意，一定要编写类型提示，默认值可以不写

| 代码            | 备注 |
| --------------- | ---- |
| `name:str = ""` | 正确 |
| `name = ""`     | 错误 |
| `name:str`      | 正确 |
| `name`          | 错误 |

<div class="demo">
<<< "user" 说：#f2
pydantic.error_wrappers.ValidationError: 2 validation errors for Data
name
  field required (type=value_error.missing)
age
  field required (type=value_error.missing)
</div>

<div class="demo">
<<< "user" 说：#f1
<<< "user" 说：#f2
id=1 name='测试' age=12
</div>

## 进阶：可以嵌套

可以嵌套其他BaseModel模型

但是需要通过Field.extra属性声明其为`__json_key__`

```py hl_lines="14 25"
from pydantic import BaseModel, Field
from ayaka import AyakaDB, AyakaApp

app = AyakaApp("test")


class User(BaseModel):
    name: str
    age: int


class Data(AyakaDB):
    __table_name__ = app.name
    user: User = Field(extra=AyakaDB.__json_key__)
    id: int = Field(extra=AyakaDB.__primary_key__)


Data.create_table()


@app.on_cmd("f1")
async def func_1():
    data = Data(user={"name": "测试一号", "age": 2222}, id=123)
    # 保存到数据库
    data.save()


@ app.on_cmd("f2")
async def func_1():
    data = Data.select_one(id=123)
    print(data)

```

注意，执行`data.save()`后，数据不会马上更新，`ayaka`可能会等待0~60s后才执行写入操作

对应的数据库`data/ayaka/ayaka.db`

表信息

```
CREATE TABLE "test" (
	"user"	text,
	"id"	integer,
	PRIMARY KEY("id")
);
```

用户执行 `#f1` 后的表数据

| user                              | id  |
| --------------------------------- | --- |
| {"name": "测试一号", "age": 2222} | 123 |

<div class="demo">
<<< "user" 说：#f1
<<< "user" 说：#f2
user=User(name='测试一号', age=2222) id=123
<<<  "sys" 说：重启bot后
<<< "user" 说：#f2
user=User(name='测试一号', age=2222) id=123
</div>

## 进阶：AyakaGroupDB

已经提前预设主键为`app.group_id`，且不可更改

优点是，可以放入回调参数表中，直接使用

```py hl_lines="16"
from ayaka import AyakaGroupDB, AyakaApp

app = AyakaApp("test")


class Data(AyakaGroupDB):
    __table_name__ = app.name
    name: str = "默认名"
    age: int = 12


Data.create_table()


@app.on_cmd("f1")
async def func_1(data: Data):
    data.name = "新名字"
    data.save()
```

注意，与AyakaDB不同，AyakaGroupDB一定要编写默认值

| 代码            | 备注 |
| --------------- | ---- |
| `name:str = ""` | 正确 |
| `name = ""`     | 错误 |
| `name:str`      | 错误 |
| `name`          | 错误 |

表信息

```
CREATE TABLE "test" (
	"group_id"	integer,
	"name"	string,
	"age"	integer,
	PRIMARY KEY("group_id")
);
```

用户执行 `#f1` 后的表数据

| group_id | name   | age |
| -------- | ------ | --- |
| 100      | 新名字 | 12  |

## 进阶：AyakaUserDB

已经提前预设主键为`app.group_id`和`app.user_id`，且不可更改

优点是，可以放入回调参数表中，直接使用

```py hl_lines="6 16"
from ayaka import AyakaUserDB, AyakaApp

app = AyakaApp("test")


class Data(AyakaUserDB):
    __table_name__ = app.name
    name: str = "默认名"
    age: int = 12


Data.create_table()


@app.on_cmd("f1")
async def func_1(data: Data):
    data.name = "新名字"
    data.save()
```

注意，与AyakaDB不同，AyakaUserDB一定要编写默认值

| 代码            | 备注 |
| --------------- | ---- |
| `name:str = ""` | 正确 |
| `name = ""`     | 错误 |
| `name:str`      | 错误 |
| `name`          | 错误 |

表信息

```
CREATE TABLE "test" (
	"group_id"	integer,
	"user_id"	integer,
	"name"	string,
	"age"	integer,
	PRIMARY KEY("group_id","user_id")
);
```

用户执行 `#f1` 后的表数据


| group_id | user_id | name   | age |
| -------- | ------- | ------ | --- |
| 100      | 1       | 新名字 | 12  |

## 下一步

<div align="right">
    在这里~ ↘
</div>

