如果需要bot重启后数据不丢失，则需要将数据保存到本地

`app.storage`中提供了一些有益的api

## 快速上手

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

## 包插件

如果您的代码中使用了`app.storage.plugin_path()`相关代码，那么建议您的插件为包插件形式

**单文件插件**

```
plugins
    bag.py
    data.json
    checkin.py
    ...
```

```py
# plugins/bag.py

@app.on.idle(...)
@app.on.command(...)
async def _():
    ...
    dirpath = app.storage.plugin_path() # 对应 plugins
    file = dirpath.json("data") # 数据和bag.py都位于plugins下，在多插件时造成混乱
    data = file.load()
    ...
```

**包插件**

```
plugins
    bag
        __init__.py
        data.json
    checkin
    ...
```

```py
# plugins/bag/__init__.py

@app.on.idle(...)
@app.on.command(...)
async def _():
    ...
    dirpath = app.storage.plugin_path() # 对应 plugins/bag
    file = dirpath.json("data") # 数据和__init__.py都位于plugins/bag下，在多插件时依旧清晰明了
    data = file.load()
    ...
```

## AyakaPath 

AyakaPath，文件夹地址

`app.plugin_path()`和`app.group_path()`返回`AyakaPath对象`

- `app.plugin_path()` 对应地址 `<create_app_file>/../`
- `app.plugin_path(1, "a")` 对应地址 `<create_app_file>/../1/a`
- `app.plugin_path("1", "a")` 对应地址 `<create_app_file>/../1/a`
- `app.group_path()` 对应地址 `data/groups/<bot_id>/<group_id>/<app_name>`
- `app.group_path(1, "a")` 对应地址 `data/groups/<bot_id>/<group_id>/<app_name>/1/a`
- `app.group_path("1", "a")` 对应地址 `data/groups/<bot_id>/<group_id>/<app_name>/1/a`


## AyakaFile

`AyakaPath对象.file()`返回`AyakaFile对象`

- `app.plugin_path().file("test.txt")` 对应文件 `<create_app_file>/../test.txt`
- `app.plugin_path().file("error.log")` 对应文件 `<create_app_file>/../error.log`

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

## AyakaJsonFile

`AyakaPath对象.json()`返回`AyakaJsonFile对象`

- `app.plugin_path().json("hi")` 对应文件 `<create_app_file>/../hi.json`
- `app.plugin_path().json("hi.log")` 对应文件 `<create_app_file>/../hi.json`

`.json()`会强制修改文件后缀名为json

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

## AyakaJsonFileCtrl.chain

json文件可以设置多层key，因此`AyakaJsonFile`在读写数据时会遇到与[缓存](./cache.md#ayakacachectrlchain)同样的问题

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

## 下一步

<div align="right">
    在这里~ ↘
</div>
