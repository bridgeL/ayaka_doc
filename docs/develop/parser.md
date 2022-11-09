提供一些有益的转换方法，`obj <-> str`

## 保存消息

将Message转为字符串后存储

```py

msg_str = app.parser.encode_message(app.message)

# 通过某种方式保存 msg_str，例如app.storage.plugin_path(...).json(...).chain(...).set(msg_str)

```

## 恢复数据

将text恢复为Message

```py

# 通过某种方式获取 msg_str，例如app.storage.plugin_path(...).json(...).chain(...).get()

msg = app.parser.decode_message(msg_str)

```


## 下一步

<div align="right">
    在这里~ ↘
</div>
