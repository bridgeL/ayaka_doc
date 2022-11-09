## class MessageSegment
"""
OneBot v11 协议 MessageSegment 适配。具体方法参考协议消息段类型或源码。
"""

### def \_\_len\_\_


无参数

```py
    def __len__(self) -> int:
        return len(str(self))
```

### def \_\_ne\_\_


参数表：

- other: "MessageSegment"

```py
    def __ne__(self, other: "MessageSegment") -> bool:
        return not self == other
```

### def \_\_add\_\_


参数表：

- other: Union[str, "MessageSegment", Iterable["MessageSegment"]]

```py
    def __add__(self, other: Union[str, "MessageSegment", Iterable["MessageSegment"]]) -> "Message":
        return self.get_message_class()(self) + other
```

### def \_\_radd\_\_


参数表：

- other: Union[str, "MessageSegment", Iterable["MessageSegment"]]

```py
    def __radd__(self, other: Union[str, "MessageSegment", Iterable["MessageSegment"]]) -> "Message":
        return self.get_message_class()(other) + self
```

### def \_\_get_validators\_\_


参数表：

- cls

```py
    @classmethod
    def __get_validators__(cls):
        yield cls._validate
```

### def _validate


参数表：

- cls
- value

```py
    @classmethod
    def _validate(cls, value):
        if isinstance(value, cls):
            return value
        if not isinstance(value, dict):
            raise ValueError(
                f"Expected dict for MessageSegment, got {type(value)}")
        return cls(**value)
```

### def get


参数表：

- key: str
- default: Any

```py
    def get(self, key: str, default: Any = None):
        return asdict(self).get(key, default)
```

### def keys


无参数

```py
    def keys(self):
        return asdict(self).keys()
```

### def values


无参数

```py
    def values(self):
        return asdict(self).values()
```

### def items


无参数

```py
    def items(self):
        return asdict(self).items()
```

### def copy


无参数

```py
    def copy(self) -> "MessageSegment":
        return deepcopy(self)
```

### def get_message_class


参数表：

- cls

```py
    @classmethod
    def get_message_class(cls) -> Type["Message"]:
        return Message
```

### def \_\_str\_\_


无参数

```py
    def __str__(self) -> str:
        type_ = self.type
        data = self.data.copy()

        # process special types
        if type_ == "text":
            # type: ignore
            return escape(data.get("text", ""), escape_comma=False)

        params = ",".join(
            [f"{k}={escape(str(v))}" for k, v in data.items() if v is not None]
        )
        return f"[CQ:{type_}{',' if params else ''}{params}]"
```

### def \_\_add\_\_


参数表：

- other

```py
    def __add__(self, other) -> "Message":
        return Message(self) + (
            MessageSegment.text(other) if isinstance(other, str) else other
        )
```

### def \_\_radd\_\_


参数表：

- other

```py
    def __radd__(self, other) -> "Message":
        return (
            MessageSegment.text(other) if isinstance(
                other, str) else Message(other)
        ) + self
```

### def is_text


无参数

```py
    def is_text(self) -> bool:
        return self.type == "text"
```

### def anonymous


参数表：

- ignore_failure: Optional[bool]

```py
    @staticmethod
    def anonymous(ignore_failure: Optional[bool] = None) -> "MessageSegment":
        return MessageSegment("anonymous", {"ignore": bool_to_str(ignore_failure)})
```

### def at


参数表：

- user_id: Union[int, str]

```py
    @staticmethod
    def at(user_id: Union[int, str]) -> "MessageSegment":
        return MessageSegment("at", {"qq": str(user_id)})
```

### def contact


参数表：

- type_: str
- id: int

```py
    @staticmethod
    def contact(type_: str, id: int) -> "MessageSegment":
        return MessageSegment("contact", {"type": type_, "id": str(id)})
```

### def contact_group


参数表：

- group_id: int

```py
    @staticmethod
    def contact_group(group_id: int) -> "MessageSegment":
        return MessageSegment("contact", {"type": "group", "id": str(group_id)})
```

### def contact_user


参数表：

- user_id: int

```py
    @staticmethod
    def contact_user(user_id: int) -> "MessageSegment":
        return MessageSegment("contact", {"type": "qq", "id": str(user_id)})
```

### def dice


无参数

```py
    @staticmethod
    def dice() -> "MessageSegment":
        return MessageSegment("dice", {})
```

### def face


参数表：

- id_: int

```py
    @staticmethod
    def face(id_: int) -> "MessageSegment":
        return MessageSegment("face", {"id": str(id_)})
```

### def forward


参数表：

- id_: str

```py
    @staticmethod
    def forward(id_: str) -> "MessageSegment":
        logger.warning("Forward Message only can be received!")
        return MessageSegment("forward", {"id": id_})
```

### def image


参数表：

- file: Union[str, bytes, BytesIO, Path]
- type_: Optional[str]
- cache: bool
- proxy: bool
- timeout: Optional[int]

```py
    @staticmethod
    def image(
        file: Union[str, bytes, BytesIO, Path],
        type_: Optional[str] = None,
        cache: bool = True,
        proxy: bool = True,
        timeout: Optional[int] = None,
    ) -> "MessageSegment":
        if isinstance(file, BytesIO):
            file = file.getvalue()
        if isinstance(file, bytes):
            file = f"base64://{b64encode(file).decode()}"
        elif isinstance(file, Path):
            file = f"file:///{file.resolve()}"
        return MessageSegment(
            "image",
            {
                "file": file,
                "type": type_,
                "cache": bool_to_str(cache),
                "proxy": bool_to_str(proxy),
                "timeout": timeout,
            },
        )
```

### def json


参数表：

- data: str

```py
    @staticmethod
    def json(data: str) -> "MessageSegment":
        return MessageSegment("json", {"data": data})
```

### def location


参数表：

- latitude: float
- longitude: float
- title: Optional[str]
- content: Optional[str]

```py
    @staticmethod
    def location(
        latitude: float,
        longitude: float,
        title: Optional[str] = None,
        content: Optional[str] = None,
    ) -> "MessageSegment":
        return MessageSegment(
            "location",
            {
                "lat": str(latitude),
                "lon": str(longitude),
                "title": title,
                "content": content,
            },
        )
```

### def music


参数表：

- type_: str
- id_: int

```py
    @staticmethod
    def music(type_: str, id_: int) -> "MessageSegment":
        return MessageSegment("music", {"type": type_, "id": id_})
```

### def music_custom


参数表：

- url: str
- audio: str
- title: str
- content: Optional[str]
- img_url: Optional[str]

```py
    @staticmethod
    def music_custom(
        url: str,
        audio: str,
        title: str,
        content: Optional[str] = None,
        img_url: Optional[str] = None,
    ) -> "MessageSegment":
        return MessageSegment(
            "music",
            {
                "type": "custom",
                "url": url,
                "audio": audio,
                "title": title,
                "content": content,
                "image": img_url,
            },
        )
```

### def node


参数表：

- id_: int

```py
    @staticmethod
    def node(id_: int) -> "MessageSegment":
        return MessageSegment("node", {"id": str(id_)})
```

### def node_custom


参数表：

- user_id: int
- nickname: str
- content: Union[str, "Message"]

```py
    @staticmethod
    def node_custom(
        user_id: int, nickname: str, content: Union[str, "Message"]
    ) -> "MessageSegment":
        return MessageSegment(
            "node", {"user_id": str(
                user_id), "nickname": nickname, "content": content}
        )
```

### def poke


参数表：

- type_: str
- id_: str

```py
    @staticmethod
    def poke(type_: str, id_: str) -> "MessageSegment":
        return MessageSegment("poke", {"type": type_, "id": id_})
```

### def record


参数表：

- file: Union[str, bytes, BytesIO, Path]
- magic: Optional[bool]
- cache: Optional[bool]
- proxy: Optional[bool]
- timeout: Optional[int]

```py
    @staticmethod
    def record(
        file: Union[str, bytes, BytesIO, Path],
        magic: Optional[bool] = None,
        cache: Optional[bool] = None,
        proxy: Optional[bool] = None,
        timeout: Optional[int] = None,
    ) -> "MessageSegment":
        if isinstance(file, BytesIO):
            file = file.getvalue()
        if isinstance(file, bytes):
            file = f"base64://{b64encode(file).decode()}"
        elif isinstance(file, Path):
            file = f"file:///{file.resolve()}"
        return MessageSegment(
            "record",
            {
                "file": file,
                "magic": bool_to_str(magic),
                "cache": bool_to_str(cache),
                "proxy": bool_to_str(proxy),
                "timeout": timeout,
            },
        )
```

### def reply


参数表：

- id_: int

```py
    @staticmethod
    def reply(id_: int) -> "MessageSegment":
        return MessageSegment("reply", {"id": str(id_)})
```

### def rps


无参数

```py
    @staticmethod
    def rps() -> "MessageSegment":
        return MessageSegment("rps", {})
```

### def shake


无参数

```py
    @staticmethod
    def shake() -> "MessageSegment":
        return MessageSegment("shake", {})
```

### def share


参数表：

- url: str
- title: str
- content: Optional[str]
- image: Optional[str]

```py
    @staticmethod
    def share(
        url: str = "",
        title: str = "",
        content: Optional[str] = None,
        image: Optional[str] = None,
    ) -> "MessageSegment":
        return MessageSegment(
            "share", {"url": url, "title": title,
                      "content": content, "image": image}
        )
```

### def text


参数表：

- text: str

```py
    @staticmethod
    def text(text: str) -> "MessageSegment":
        return MessageSegment("text", {"text": text})
```

### def video


参数表：

- file: Union[str, bytes, BytesIO, Path]
- cache: Optional[bool]
- proxy: Optional[bool]
- timeout: Optional[int]

```py
    @staticmethod
    def video(
        file: Union[str, bytes, BytesIO, Path],
        cache: Optional[bool] = None,
        proxy: Optional[bool] = None,
        timeout: Optional[int] = None,
    ) -> "MessageSegment":
        if isinstance(file, BytesIO):
            file = file.getvalue()
        if isinstance(file, bytes):
            file = f"base64://{b64encode(file).decode()}"
        elif isinstance(file, Path):
            file = f"file:///{file.resolve()}"
        return MessageSegment(
            "video",
            {
                "file": file,
                "cache": bool_to_str(cache),
                "proxy": bool_to_str(proxy),
                "timeout": timeout,
            },
        )
```

### def xml


参数表：

- data: str

```py
    @staticmethod
    def xml(data: str) -> "MessageSegment":
        return MessageSegment("xml", {"data": data})
```

### static vars
```py
    type: str
    data: Dict[str, Any] = field(default_factory=dict)
```

## class Message
"""
OneBot v11 协议 Message 适配。
"""

### def \_\_init\_\_


参数表：

- message: Union[str, None, Iter

```py
    def __init__(
        self,
        message: Union[str, None, Iterable[MessageSegment],
                       MessageSegment] = None,
    ):
        super().__init__()
        if message is None:
            return
        elif isinstance(message, str):
            self.extend(self._construct(message))
        elif isinstance(message, MessageSegment):
            self.append(message)
        elif isinstance(message, Iterable):
            self.extend(message)
        else:
            self.extend(self._construct(message))  # pragma: no cover
```

### def template
"""创建消息模板。

用法和 `str.format` 大致相同, 但是可以输出消息对象, 并且支持以 `Message` 对象作为消息模板

并且提供了拓展的格式化控制符, 可以用适用于该消息类型的 `MessageSegment` 的工厂方法创建消息

参数:
format_string: 格式化模板

返回:
消息格式化器
"""

参数表：

- cls: Type["Message"]
- format_string: Union[str, "Message"]

```py
    @classmethod
    def template(cls: Type["Message"], format_string: Union[str, "Message"]) -> MessageTemplate["Message"]:
        """创建消息模板。

        用法和 `str.format` 大致相同, 但是可以输出消息对象, 并且支持以 `Message` 对象作为消息模板

        并且提供了拓展的格式化控制符, 可以用适用于该消息类型的 `MessageSegment` 的工厂方法创建消息

        参数:
            format_string: 格式化模板

        返回:
            消息格式化器
        """
        return MessageTemplate(format_string, cls)
```

### def \_\_str\_\_


无参数

```py
    def __str__(self) -> str:
        return "".join(str(seg) for seg in self)
```

### def \_\_get_validators\_\_


参数表：

- cls

```py
    @classmethod
    def __get_validators__(cls):
        yield cls._validate
```

### def _validate


参数表：

- cls
- value

```py
    @classmethod
    def _validate(cls, value):
        if isinstance(value, cls):
            return value
        elif isinstance(value, Message):
            raise ValueError(
                f"Type {type(value)} can not be converted to {cls}")
        elif isinstance(value, str):
            pass
        elif isinstance(value, dict):
            value = parse_obj_as(cls.get_segment_class(), value)
        elif isinstance(value, Iterable):
            value = [parse_obj_as(cls.get_segment_class(), v) for v in value]
        else:
            raise ValueError(
                f"Expected str, dict or iterable for Message, got {type(value)}"
            )
        return cls(value)
```

### def \_\_add\_\_


参数表：

- other: Union[str, MessageSegment, Iterable[MessageSegment]]

```py
    def __add__(self, other: Union[str, MessageSegment, Iterable[MessageSegment]]) -> "Message":
        result = self.copy()
        result += other
        return result
```

### def \_\_radd\_\_


参数表：

- other: Union[str, MessageSegment, Iterable[MessageSegment]]

```py
    def __radd__(self, other: Union[str, MessageSegment, Iterable[MessageSegment]]) -> "Message":
        result = self.__class__(other)
        return result + self
```

### def \_\_iadd\_\_


参数表：

- other: Union[str, MessageSegment, Iterable[MessageSegment]]

```py
    def __iadd__(self, other: Union[str, MessageSegment, Iterable[MessageSegment]]) -> "Message":
        if isinstance(other, str):
            self.extend(self._construct(other))
        elif isinstance(other, MessageSegment):
            self.append(other)
        elif isinstance(other, Iterable):
            self.extend(other)
        else:
            raise ValueError(
                f"Unsupported type: {type(other)}")  # pragma: no cover
        return self
```

### def \_\_getitem\_\_
"""
参数:
__args: 消息段类型

返回:
所有类型为 `__args` 的消息段
"""

参数表：

- __args: str

```py
    @overload
    def __getitem__(self, __args: str) -> "Message":
        """
        参数:
            __args: 消息段类型

        返回:
            所有类型为 `__args` 的消息段
        """
```

### def \_\_getitem\_\_
"""
参数:
__args: 消息段类型和索引

返回:
类型为 `__args[0]` 的消息段第 `__args[1]` 个
"""

参数表：

- __args: Tuple[str, int]

```py
    @overload
    def __getitem__(self, __args: Tuple[str, int]) -> MessageSegment:
        """
        参数:
            __args: 消息段类型和索引

        返回:
            类型为 `__args[0]` 的消息段第 `__args[1]` 个
        """
```

### def \_\_getitem\_\_
"""
参数:
__args: 消息段类型和切片

返回:
类型为 `__args[0]` 的消息段切片 `__args[1]`
"""

参数表：

- __args: Tuple[str, slice]

```py
    @overload
    def __getitem__(self, __args: Tuple[str, slice]) -> "Message":
        """
        参数:
            __args: 消息段类型和切片

        返回:
            类型为 `__args[0]` 的消息段切片 `__args[1]`
        """
```

### def \_\_getitem\_\_
"""
参数:
__args: 索引

返回:
第 `__args` 个消息段
"""

参数表：

- __args: int

```py
    @overload
    def __getitem__(self, __args: int) -> MessageSegment:
        """
        参数:
            __args: 索引

        返回:
            第 `__args` 个消息段
        """
```

### def \_\_getitem\_\_
"""
参数:
__args: 切片

返回:
消息切片 `__args`
"""

参数表：

- __args: slice

```py
    @overload
    def __getitem__(self, __args: slice) -> "Message":
        """
        参数:
            __args: 切片

        返回:
            消息切片 `__args`
        """
```

### def \_\_getitem\_\_


参数表：

- a

```py
    def __getitem__(
        self,
        args: Union[
            str,
            Tuple[str, int],
            Tuple[str, slice],
            int,
            slice,
        ],
    ) -> Union[MessageSegment, "Message"]:
        arg1, arg2 = args if isinstance(args, tuple) else (args, None)
        if isinstance(arg1, int) and arg2 is None:
            return super().__getitem__(arg1)
        elif isinstance(arg1, slice) and arg2 is None:
            return self.__class__(super().__getitem__(arg1))
        elif isinstance(arg1, str) and arg2 is None:
            return self.__class__(seg for seg in self if seg.type == arg1)
        elif isinstance(arg1, str) and isinstance(arg2, int):
            return [seg for seg in self if seg.type == arg1][arg2]
        elif isinstance(arg1, str) and isinstance(arg2, slice):
            return self.__class__([seg for seg in self if seg.type == arg1][arg2])
        else:
            raise ValueError(
                "Incorrect arguments to slice")  # pragma: no cover
```

### def index


参数表：

- value: Union[MessageSegment, str]

```py
    def index(self, value: Union[MessageSegment, str], *args) -> int:
        if isinstance(value, str):
            first_segment = next(
                (seg for seg in self if seg.type == value), None)
            if first_segment is None:
                raise ValueError(
                    f"Segment with type {value} is not in message")
            return super().index(first_segment, *args)
        return super().index(value, *args)
```

### def get


参数表：

- type_: str
- count: Optional[int]

```py
    def get(self, type_: str, count: Optional[int] = None) -> "Message":
        if count is None:
            return self[type_]

        iterator, filtered = (
            seg for seg in self if seg.type == type_
        ), self.__class__()
        for _ in range(count):
            seg = next(iterator, None)
            if seg is None:
                break
            filtered.append(seg)
        return filtered
```

### def count


参数表：

- value: Union[MessageSegment, str]

```py
    def count(self, value: Union[MessageSegment, str]) -> int:
        return len(self[value]) if isinstance(value, str) else super().count(value)
```

### def append
"""添加一个消息段到消息数组末尾。

参数:
obj: 要添加的消息段
"""

参数表：

- obj: Union[str, MessageSegment]

```py
    def append(self, obj: Union[str, MessageSegment]) -> "Message":
        """添加一个消息段到消息数组末尾。

        参数:
            obj: 要添加的消息段
        """
        if isinstance(obj, MessageSegment):
            super().append(obj)
        elif isinstance(obj, str):
            self.extend(self._construct(obj))
        else:
            raise ValueError(
                f"Unexpected type: {type(obj)} {obj}")  # pragma: no cover
        return self
```

### def extend
"""拼接一个消息数组或多个消息段到消息数组末尾。

参数:
obj: 要添加的消息数组
"""

参数表：

- obj: Union["Message", Iterable[MessageSegment]]

```py
    def extend(self, obj: Union["Message", Iterable[MessageSegment]]) -> "Message":
        """拼接一个消息数组或多个消息段到消息数组末尾。

        参数:
            obj: 要添加的消息数组
        """
        for segment in obj:
            self.append(segment)
        return self
```

### def copy


无参数

```py
    def copy(self) -> "Message":
        return deepcopy(self)
```

### def extract_plain_text
"""提取消息内纯文本消息"""

无参数

```py
    def extract_plain_text(self) -> str:
        """提取消息内纯文本消息"""

        return "".join(str(seg) for seg in self if seg.is_text())
```

### def get_segment_class


参数表：

- cls

```py
    @classmethod
    def get_segment_class(cls) -> Type[MessageSegment]:
        return MessageSegment
```

### def \_\_add\_\_


参数表：

- other: Union[str, Mapping, Iterable[Mapping]]

```py
    def __add__(self, other: Union[str, Mapping, Iterable[Mapping]]) -> "Message":
        return super(Message, self).__add__(
            MessageSegment.text(other) if isinstance(other, str) else other
        )
```

### def \_\_radd\_\_


参数表：

- other: Union[str, Mapping, Iterable[Mapping]]

```py
    def __radd__(self, other: Union[str, Mapping, Iterable[Mapping]]) -> "Message":
        return super(Message, self).__radd__(
            MessageSegment.text(other) if isinstance(other, str) else other
        )
```

### def _construct


参数表：

- msg: Union[str, Mapping, Iterable[Mapping]]

```py
    @staticmethod
    def _construct(
        msg: Union[str, Mapping, Iterable[Mapping]]
    ) -> Iterable[MessageSegment]:
        if isinstance(msg, Mapping):
            msg = cast(Mapping[str, Any], msg)
            yield MessageSegment(msg["type"], msg.get("data") or {})
            return
        elif isinstance(msg, Iterable) and not isinstance(msg, str):
            for seg in msg:
                yield MessageSegment(seg["type"], seg.get("data") or {})
            return
        elif isinstance(msg, str):

            def _iter_message(msg: str) -> Iterable[Tuple[str, str]]:
                text_begin = 0
                for cqcode in re.finditer(
                    r"\[CQ:(?P<type>[a-zA-Z0-9-_.]+)"
                    r"(?P<params>"
                    r"(?:,[a-zA-Z0-9-_.]+=[^,\]]+)*"
                    r"),?\]",
                    msg,
                ):
                    yield "text", msg[text_begin: cqcode.pos + cqcode.start()]
                    text_begin = cqcode.pos + cqcode.end()
                    yield cqcode.group("type"), cqcode.group("params").lstrip(",")
                yield "text", msg[text_begin:]

            for type_, data in _iter_message(msg):
                if type_ == "text":
                    if data:
                        # only yield non-empty text segment
                        yield MessageSegment(type_, {"text": unescape(data)})
                else:
                    data = {
                        k: unescape(v)
                        for k, v in map(
                            lambda x: x.split("=", maxsplit=1),
                            filter(lambda x: x, (x.lstrip()
                                   for x in data.split(","))),
                        )
                    }
                    yield MessageSegment(type_, data)
```

### def extract_plain_text


无参数

```py
    def extract_plain_text(self) -> str:
        return "".join(seg.data["text"] for seg in self if seg.is_text())
```

## 下一步

<div align="right">
    在这里~ ↘
</div>
