## class AyakaParser


### def encode_message


- data: Message
```py
    def encode_message(self, data: Message):
        return json.dumps(data, ensure_ascii=False, cls=DataclassEncoder)
```

### def decode_message


- text: str
```py
    def decode_message(self, text: str):
        data = json.loads(text)

        def func(d: dict):
            type = d["type"]
            data = d["data"]
            return getattr(MessageSegment, type)(**data)

        return Message(func(d) for d in data)
```
## 下一步

<div align="right">
    在这里~ ↘
</div>
