## class AyakaGroup


### def \_\_repr\_\_


无参数

```py
    def __repr__(self) -> str:
        return f"AyakaGroup({self.bot_id}, {self.group_id}, {self.apps})"
```

### def forbid_init


无参数

```py
    def forbid_init(self):
        names = [
            "data", "groups",
            self.bot_id,
            self.group_id
        ]
        names = [str(name) for name in names]
        path = Path(*names)
        self.store_forbid = AyakaPath(path).json("forbid", [])
```

### def forbid_load


无参数

```py
    def forbid_load(self):
        return self.store_forbid.load()
```

### def forbid_save


参数表：

- data

```py
    def forbid_save(self, data):
        return self.store_forbid.save(data)
```

### def \_\_init\_\_


参数表：

- bot_id: int
- group_id: int

```py
    def __init__(self, bot_id: int, group_id: int) -> None:
        self.bot_id = bot_id
        self.group_id = group_id
        self.running_app: "AyakaApp" = None

        # 读取forbit列表
        self.forbid_init()
        forbid_names = self.forbid_load()

        # 添加app，并分配独立数据空间
        self.apps: List["AyakaApp"] = []
        self.cache_dict: Dict[str, AyakaCacheCtrl] = {}
        for app in app_list:
            if app.name not in forbid_names:
                self.apps.append(app)
                self.cache_dict[app.name] = AyakaCacheCtrl()

        group_list.append(self)

        if AYAKA_DEBUG:
            print(self)
```

### def running_app_name


无参数

```py
    @property
    def running_app_name(self):
        if self.running_app:
            return self.running_app.name
        return ""
```

### def get_app
根据app名获取该group所启用的app，不存在则返回None

参数表：

- name: str

```py
    def get_app(self, name: str):
        '''根据app名获取该group所启用的app，不存在则返回None'''
        for app in self.apps:
            if app.name == name:
                return app
```

### def permit_app
启用指定app

参数表：

- name: str

```py
    def permit_app(self, name: str):
        '''启用指定app'''
        if self.get_app(name):
            return True

        for app in app_list:
            if app.name == name:
                self.apps.append(app)
                # 从forbit列表移除
                app_names: list = self.forbid_load()
                if name in app_names:
                    app_names.remove(name)
                    self.forbid_save(app_names)
                return True
```

### def forbid_app
禁用指定app

参数表：

- name: str

```py
    def forbid_app(self, name: str):
        '''禁用指定app'''
        if name == "ayaka_master":
            return

        app = self.get_app(name)
        if not app:
            return

        # 禁用正在运行的应用
        if self.running_app_name == name:
            self.running_app = None

        # 移除
        self.apps.remove(app)

        # 添加到forbit列表
        app_names: list = self.forbid_load()
        if name not in app_names:
            app_names.append(name)
            self.forbid_save(app_names)
        return True
```

## 下一步

<div align="right">
    在这里~ ↘
</div>