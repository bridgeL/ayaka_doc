## 缓存

### AyakaCacheCtrl.chain

json文件可以设置多层key，但是读写时往往遇到困难，例如

`data["haha"]["ee"]["your name"]["wtf"] = 2`

你需要先层层设置，最终才可赋值

```py
data = {}
data["haha"] = {}
data["haha"]["ee"] = {}
data["haha"]["ee"]["your name"] = {}
data["haha"]["ee"]["your name"]["wtf"] = 2
```

`AyakaCacheCtrl`被用于解决这一困难

```py
from ayaka.cache import AyakaCacheCtrl

data = AyakaCacheCtrl()
ctrl = data.chain("haha", "ee", "your name", "wtf")
# 读取数据, 缺省值0
print(ctrl.get(0)) # 0
# 设置数据
print(ctrl.set(3)) # 3
# 再次读取
print(ctrl.get(0)) # 3
# 查看整体
print(data) # {"haha":{"ee":{"your name":{"wtf":3}}}}
```

### 返回同一类型

注意：`AyakaCacheCtrl.chain() -> AyakaCacheCtrl`

chain的返回值，仍然是一个AyakaCacheCtrl对象，因此你可以

```py
ctrl = data.chain("haha", "ee").chain("your name").chain("wtf")
```

### 如何获取AyakaCacheCtrl

无需您自行创建`AyakaCacheCtrl对象`，直接访问`app.cache`即可获取

通过`app.cache`获得的`AyakaCacheCtrl对象`将与当前消息所在的群聊id、机器人id、应用名进行**唯一绑定**，也就是说，当您在其他插件或其他群聊或其他机器人中获取的`AyakaCacheCtrl对象`是相互独立的

通过`app.cache`获得的`AyakaCacheCtrl对象`不会因为当前消息处理结束而销毁，因此可以在同一机器人、同一群聊、同一插件的情况下，通过`app.cache`来保存一些临时性的信息，例如：

- 当用户发送指令A时，通过缓存保存该用户的名称
- 再等到用户发送指令B时，通过缓存获取之前保存的名称

注意：bot重启后，`app.cache`数据会丢失

## 持久化

如果需要bot重启后数据不丢失，则需要将数据保存到本地

`app.storage`中提供了一些有益的api

### 快速上手

插件结构

```
plugins
    bag
        __init__.py
        test
            ok.txt
```

若想获取ok.txt的数据，只需

```py
# plugins/bag/__init__.py

@app.on.idle(...)
@app.on.command(...)
async def _():
    ...
    dirpath = app.storage.plugin_path("test") # 对应文件夹 plugins/bag/test
    file = dirpath.file("ok.txt") # 对应文件 plugins/bag/test/ok.txt
    data = file.load()
    ...
```

### 包插件

如果您的代码中使用了`app.storage.plugin_path()`相关代码，那么建议您的插件为包插件形式

**单文件**

```
plugins
    bag.py
```

```py
# plugins/bag.py

@app.on.idle(...)
@app.on.command(...)
async def _():
    ...
    dirpath = app.storage.plugin_path() # 对应 plugins
    file = dirpath.file("test.txt") # 数据和bag.py都位于plugins下，在多插件时造成混乱
    ...
```

**包插件**

```
plugins
    bag
        __init__.py
        utils.py
        data.json
```

```py
# plugins/bag/__init__.py

@app.on.idle(...)
@app.on.command(...)
async def _():
    ...
    dirpath = app.storage.plugin_path() # 对应 plugins/bag
    file = dirpath.json("data") # 数据和__init__.py都位于plugins/bag下，在多插件时依旧清晰明了
    ...
```

### AyakaPath 

AyakaPath，文件夹地址

`app.plugin_path()`和`app.group_path()`返回`AyakaPath对象`

- `app.plugin_path()` 对应地址 `<create_app_file>/../`
- `app.plugin_path(1, "a")` 对应地址 `<create_app_file>/../1/a`
- `app.plugin_path("1", "a")` 对应地址 `<create_app_file>/../1/a`
- `app.group_path()` 对应地址 `data/groups/<bot_id>/<group_id>/<app_name>`
- `app.group_path(1, "a")` 对应地址 `data/groups/<bot_id>/<group_id>/<app_name>/1/a`
- `app.group_path("1", "a")` 对应地址 `data/groups/<bot_id>/<group_id>/<app_name>/1/a`


### AyakaFile/AyakaJsonFile 文件

- `AyakaPath对象.file()`返回`AyakaFile对象`
- `AyakaPath对象.json()`返回`AyakaJsonFile对象`

如果 `dirpath = app.plugin_path()`，那么

- `dirpath.file("test.txt")` 对应文件 `<create_app_file>/../test.txt`
- `dirpath.file("error.log")` 对应文件 `<create_app_file>/../error.log`
- `dirpath.json("hi")` 对应文件 `<create_app_file>/../hi.json`
- `dirpath.json("hi.log")` 对应文件 `<create_app_file>/../hi.json`

`.json()`会强制修改文件后缀名为json

#### AyakaFile

内置load、save方法，按照txt文件格式对数据进行处理

```py
def load(self):
    with self.path.open("r", encoding="utf8") as f:
        data = f.read()
    return data

def save(self, data):
    with self.path.open("w+", encoding="utf8") as f:
        f.write(str(data))
```

#### AyakaJsonFile

内置load、save方法，按照json文件格式对数据进行处理

```py
def load(self):
    with self.path.open("r", encoding="utf8") as f:
        data = json.load(f)
    return data

def save(self, data):
    with self.path.open("w+", encoding="utf8") as f:
        json.dump(data, f, ensure_ascii=False)
```

### AyakaJsonFileCtrl.chain

json文件可以设置多层key，因此`AyakaJsonFile`在读写数据时会遇到与缓存同样的问题

`AyakaJsonFileCtrl`被用于解决这一困难，其API与`AyakaCacheCtrl`几乎完全一致，你可以


```py
# plugins/bag/__init__.py

ctrl = app.plugin_path().json("data").chain(10086, "money")

# 缺省值100
money = ctrl.get(100)
# +10
ctrl.set(money + 10)
```

对应文件

```json
// plugins/bag/data.json
{
    "10086":{
        "money":110
    }
}
```

## 其他用法（不推荐）

只有AyakaCacheCtrl可用

```py
print(app.cache.name) # None
app.cache.name = "a"
print(app.cache.name) # a
```

## 下一步

<div align="right">
    在这里~ ↘
</div>
