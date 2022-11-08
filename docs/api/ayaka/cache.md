## class AyakaCacheCtrl
ayaka缓存控制器，其数据空间在各群组、各插件间相互独立

### def \_\_repr\_\_


```py
    def __repr__(self) -> str:
        return f"AyakaCacheCtrl({self.get()})"
```

### def \_\_init\_\_


- data
```py
    def __init__(self, data=None, *keys) -> None:
        self._data = {} if data is None else data
        self._keys = [str(k) for k in keys]
```

### def _load


```py
    def _load(self):
        return self._data
```

### def _save


- data
```py
    def _save(self, data):
        self._data = data
```

### def chain


```py
    def chain(self, *keys):
        return AyakaCacheCtrl(self._data, *self._keys, *keys)
```

### def \_\_getattr\_\_


- k
```py
    def __getattr__(self, k):
        return self.chain(k).get()
```

### def \_\_setattr\_\_


- k
- v
```py
    def __setattr__(self, k, v):
        if k in ["_data", "_keys"]:
            super().__setattr__(k, v)
        else:
            self.chain(k).set(v)
```
## 下一步

<div align="right">
    在这里~ ↘
</div>
