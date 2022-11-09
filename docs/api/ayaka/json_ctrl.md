## class AbstractJsonCtrl
JSON控制器

### def \_\_init\_\_


无参数

```py
    def __init__(self, *keys) -> None:
        self._keys = keys
```

### def _load


无参数

```py
    def _load(self):
        raise NotImplementedError
```

### def _save


参数表：

- data

```py
    def _save(self, data):
        raise NotImplementedError
```

### def chain


无参数

```py
    def chain(self, *keys) -> "AbstractJsonCtrl":
        raise NotImplementedError
```

### def get


参数表：

- default

```py
    def get(self, default=None):
        data = self._load()
        for k in self._keys:
            if not isinstance(data, dict):
                return default
            if k not in data:
                return default
            data = data[k]
        return data
```

### def set


参数表：

- value

```py
    def set(self, value):
        if not self._keys:
            self._save(value)
            return value

        origin = self._load()
        if not isinstance(origin, dict):
            origin = {}
        data = origin
        for k in self._keys[:-1]:
            if k not in data or not isinstance(data[k], dict):
                data[k] = {}
            data = data[k]
        data[self._keys[-1]] = value
        self._save(origin)
        return value
```

## 下一步

<div align="right">
    在这里~ ↘
</div>