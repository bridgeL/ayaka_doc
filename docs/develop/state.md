# AyakaState

状态结点

## 如何获取状态结点

```py
from ayaka import AyakaApp

app = AyakaApp("test")
s1 = app.get_state()
s2 = app.get_state("测试")
s3 = app.get_state("test", "ok")

print(s1)
# root.test

print(s2)
# root.test.测试

print(s3)
# root.test.test.ok
```

## 如何获取根状态结点

```py
from ayaka import AyakaApp

app = AyakaApp("test")
s0 = app.root_state

print(s0)
# root
```

## 注册回调

状态结点也可以直接注册回调

事实上，`app.on_xxx`系列装饰器就是直接对相应的状态结点操作的

```py
    def on_enter(self):
        def decorator(func):
            self.enter_funcs.append(func)
            return func
        return decorator

    def on_exit(self):
        def decorator(func):
            self.exit_funcs.append(func)
            return func
        return decorator

    def on_cmd(self, *cmds: str, app: "AyakaApp", deep: Union[int, Literal["all"]] = 0, block=True):
        def decorator(func):
            t = AyakaTrigger(func, cmds, deep, app, block, self)
            self.triggers.append(t)
            return func
        return decorator

    def on_text(self, app: "AyakaApp", deep: Union[int, Literal["all"]] = 0, block=True):
        return self.on_cmd(app=app, deep=deep, block=block)

```

## 下一步

<div align="right">
    在这里~ ↘
</div>
