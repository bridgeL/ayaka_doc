## class AyakaStorage
中间层，方便后续拓展，比如aiosqlite(?

### def \_\_init\_\_


- app: "AyakaApp"
```py
    def __init__(self, app: "AyakaApp") -> None:
        self.app = app
```

### def plugin_path
获取路径 <create_app_file>/../*names

```py
    def plugin_path(self, *names):
        '''获取路径 <create_app_file>/../*names'''
        names = [str(name) for name in names]
        path = Path(self.app.path.parent, *names)
        return AyakaPath(path)
```

### def group_path
获取路径 data/groups/<bod_id>/<group_id>/<app.name>/*names

```py
    def group_path(self, *names):
        '''获取路径 data/groups/<bod_id>/<group_id>/<app.name>/*names'''
        names = [
            "data", "groups",
            self.app.bot_id,
            self.app.group_id,
            self.app.name,
            *names
        ]
        names = [str(name) for name in names]
        path = Path(*names)
        return AyakaPath(path)
```


## class AyakaPath
文件夹路径

### def \_\_init\_\_


- path
```py
    def __init__(self, path=Path("test")) -> None:
        self.path = path
        if not path.exists():
            path.mkdir(parents=True)
```

### def iterdir


```py
    def iterdir(self):
        return self.path.iterdir()
```

### def file


- name
- default
```py
    def file(self, name, default=None):
        path = self.path / str(name)
        file = AyakaFile(path)
        if not path.exists() and default is not None:
            file.save(default)
        return file
```

### def json


- name
- default
```py
    def json(self, name, default={}):
        path = self.path / str(name)
        path = path.with_suffix(".json")
        file = AyakaJsonFile(path)
        if not path.exists():
            file.save(default)
        return file
```


## class AyakaFile
文件

### def \_\_init\_\_


- path: Path
```py
    def __init__(self, path: Path):
        self.path = path
```

### def load


```py
    def load(self):
        with self.path.open("r", encoding="utf8") as f:
            data = f.read()
        return data
```

### def save


- data
```py
    def save(self, data):
        with self.path.open("w+", encoding="utf8") as f:
            f.write(str(data))
```


## class AyakaJsonFile
JSON文件

### def \_\_init\_\_


- path: Path
```py
    def __init__(self, path: Path) -> None:
        self.path = path
```

### def chain


```py
    def chain(self, *keys):
        return AyakaJsonFileCtrl(self.path, *keys)
```

### def load


```py
    def load(self):
        with self.path.open("r", encoding="utf8") as f:
            data = json.load(f)
        return data
```

### def save


- data
```py
    def save(self, data):
        with self.path.open("w+", encoding="utf8") as f:
            json.dump(data, f, ensure_ascii=False)
```


## class AyakaJsonFileCtrl
AyakaJsonFileCtrl实际上可兼容替代AyakaJsonFile，但是为了避免语义上的混乱，仍分作两个类

### def \_\_init\_\_


- path: Path
```py
    def __init__(self, path: Path, *keys) -> None:
        self._path = path
        self._keys = [str(k) for k in keys]
```

### def _load


```py
    def _load(self):
        with self._path.open("r", encoding="utf8") as f:
            data = json.load(f)
        return data
```

### def _save


- data
```py
    def _save(self, data):
        with self._path.open("w+", encoding="utf8") as f:
            json.dump(data, f, ensure_ascii=False)
```

### def chain


```py
    def chain(self, *keys):
        return AyakaJsonFileCtrl(self._path, *self._keys, *keys)
```
## 下一步

<div align="right">
    在这里~ ↘
</div>
