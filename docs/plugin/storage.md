## 包插件

如果您的代码中使用了`app.plugin()`相关代码，那么建议您的插件为包插件形式

因为`app.plugin()`对应的是创建app对象的py文件所在的目录

### 单文件插件
```
plugins
    bag.py
```

此时`app.plugin()`对应`plugins`

### 包插件
```
plugins
    bag
        __init__.py
        utils.py
        data.json
```

此时`app.plugin()`对应`plugins/bag`

## 地址

| 代码                             | 对应文件                                                |
| -------------------------------- | ------------------------------------------------------- |
| `app.group().jsonfile("1")`      | `data/groups/<bot_id>/<group_id>/<app_name>/1.json`     |
| `app.group("yes").jsonfile("1")` | `data/groups/<bot_id>/<group_id>/<app_name>/yes/1.json` |
| `app.group().file("1.txt")`      | `data/groups/<bot_id>/<group_id>/<app_name>/1.txt`      |

| 代码                              | 对应文件                                  |
| --------------------------------- | ----------------------------------------- |
| `app.plugin().jsonfile("1")`      | `<app_path>/../1.json`     |
| `app.plugin("yes").jsonfile("1")` | `<app_path>/../yes/1.json` |
| `app.plugin().file("1.txt")`      | `<app_path>/../1.txt`      |

`app_path`指的是，创建app对象的py文件的地址


## AyakaFile

`xxx.file()`的返回值是`AyakaFile`对象

其内置load、save方法，按照txt文件格式对数据进行处理

```py
def load(self):
    with self.path.open("r", encoding="utf8") as f:
        data = f.read()
    return data

def save(self, data):
    with self.path.open("w+", encoding="utf8") as f:
        f.write(str(data))
```

## AyakaJsonFile

`xxx.jsonfile()`的返回值是`AyakaJsonFile`对象

其内置load、save方法，按照json文件格式对数据进行处理

```py
def load(self):
    with self.path.open("r", encoding="utf8") as f:
        data = json.load(f)
    return data

def save(self, data):
    with self.path.open("w+", encoding="utf8") as f:
        json.dump(data, f, ensure_ascii=False)
```

## AyakaJsonDataAccessor

json文件可以设置多层key，但是读写此类数据时难免晕头转向，例如

data["haha"]["ee"]["your name"]["wtf"] = 2

`AyakaJsonDataAccessor`为了解决该问题而生

`AyakaJsonFile().keys()`可以返回对应的`AyakaJsonDataAccessor`对象

例如

```py
money_acs = app.plugin().jsonfile("data").keys(10086, "money")

money = money_acs.get(default=100)
money += 10
money_acs.set(money)
```

对应文件

```json
// data.json
{
    "10086":{
        "money":110
    }
}
```

## 下一步

<div align="right">
    在这里~ ↘
</div>
