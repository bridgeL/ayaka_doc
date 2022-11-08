## class Event
"""
OneBot v11 协议事件，字段与 OneBot 一致。各事件字段参考 `OneBot 文档`_

.. OneBot 文档:
https://github.com/botuniverse/onebot-11/blob/master/README.md
"""

### def \_\_str\_\_


```py
    def __str__(self) -> str:
        return f"[{self.get_event_name()}]: {self.get_event_description()}"
```

### def get_log_string
"""获取事件日志信息的方法。

通常你不需要修改这个方法，只有当希望 ayaka 隐藏该事件日志时，可以抛出 `NoLogException` 异常。

异常:
NoLogException
"""

```py
    def get_log_string(self) -> str:
        """获取事件日志信息的方法。

        通常你不需要修改这个方法，只有当希望 ayaka 隐藏该事件日志时，可以抛出 `NoLogException` 异常。

        异常:
            NoLogException
        """
        return f"[{self.get_event_name()}]: {self.get_event_description()}"
```

### def get_plaintext
"""获取消息纯文本的方法。

通常不需要修改，默认通过 `get_message().extract_plain_text` 获取。
"""

```py
    def get_plaintext(self) -> str:
        """获取消息纯文本的方法。

        通常不需要修改，默认通过 `get_message().extract_plain_text` 获取。
        """
        return self.get_message().extract_plain_text()
```

### def get_type


```py
    def get_type(self) -> str:
        return self.post_type
```

### def get_event_name


```py
    def get_event_name(self) -> str:
        return self.post_type
```

### def get_event_description


```py
    def get_event_description(self) -> str:
        return str(self.dict())
```

### def get_message


```py
    def get_message(self) -> Message:
        raise ValueError("Event has no message!")
```

### def get_plaintext


```py
    def get_plaintext(self) -> str:
        raise ValueError("Event has no message!")
```

### def get_user_id


```py
    def get_user_id(self) -> str:
        raise ValueError("Event has no context!")
```

### def get_session_id


```py
    def get_session_id(self) -> str:
        raise ValueError("Event has no context!")
```

### def is_tome


```py
    def is_tome(self) -> bool:
        return False
```

### static vars
-     __event__ = ""
-     time: int
-     self_id: int
-     post_type: str

## class Sender


### static vars
-     user_id: Optional[int] = None
-     nickname: Optional[str] = None
-     sex: Optional[str] = None
-     age: Optional[int] = None
-     card: Optional[str] = None
-     area: Optional[str] = None
-     level: Optional[str] = None
-     role: Optional[str] = None
-     title: Optional[str] = None

## class Reply


### static vars
-     time: int
-     message_type: str
-     message_id: int
-     real_id: int
-     sender: Sender
-     message: Message

## class Anonymous


### static vars
-     id: int
-     name: str
-     flag: str

## class File


### static vars
-     id: str
-     name: str
-     size: int
-     busid: int

## class Status


### static vars
-     online: bool
-     good: bool

## class MessageEvent
"""消息事件"""

### def get_event_name


```py
    def get_event_name(self) -> str:
        sub_type = getattr(self, "sub_type", None)
        return f"{self.post_type}.{self.message_type}" + (
            f".{sub_type}" if sub_type else ""
        )
```

### def get_message


```py
    def get_message(self) -> Message:
        return self.message
```

### def get_plaintext


```py
    def get_plaintext(self) -> str:
        return self.message.extract_plain_text()
```

### def get_user_id


```py
    def get_user_id(self) -> str:
        return str(self.user_id)
```

### def get_session_id


```py
    def get_session_id(self) -> str:
        return str(self.user_id)
```

### static vars
-     __event__ = "message"
-     post_type: Literal["message"]
-     sub_type: str
-     user_id: int
-     message_type: str
-     message_id: int
-     message: Message
-     raw_message: str
-     font: int
-     sender: Sender
-     reply: Optional[Reply] = None

## class PrivateMessageEvent
"""私聊消息"""

### def get_event_description


```py
    def get_event_description(self) -> str:
        return (
            f'Message {self.message_id} from {self.user_id} \n'
            + "".join(
                map(
                    lambda x: str(x) if x.is_text() else f"<c>{x}</c>",
                    self.message,
                )
            )
        )
```

### static vars
-     __event__ = "message.private"
-     message_type: Literal["private"]

## class GroupMessageEvent
"""群消息"""

### def get_event_description


```py
    def get_event_description(self) -> str:
        return (
            f'Message {self.message_id} from {self.user_id}@[群:{self.group_id}] \n'
            + "".join(
                map(
                    lambda x: str(x) if x.is_text() else f"<c>{x}</c>",
                    self.message,
                )
            )
        )
```

### def get_session_id


```py
    def get_session_id(self) -> str:
        return f"group_{self.group_id}_{self.user_id}"
```

### static vars
-     __event__ = "message.group"
-     message_type: Literal["group"]
-     group_id: int
-     anonymous: Optional[Anonymous] = None

## class NoticeEvent
"""通知事件"""

### def get_event_name


```py
    def get_event_name(self) -> str:
        sub_type = getattr(self, "sub_type", None)
        sub_type = f".{sub_type}" if sub_type else ""
        return f"{self.post_type}.{self.notice_type}{sub_type}"
```

### static vars
-     __event__ = "notice"
-     post_type: Literal["notice"]
-     notice_type: str

## class GroupUploadNoticeEvent
"""群文件上传事件"""

### def get_user_id


```py
    def get_user_id(self) -> str:
        return str(self.user_id)
```

### def get_session_id


```py
    def get_session_id(self) -> str:
        return f"group_{self.group_id}_{self.user_id}"
```

### static vars
-     __event__ = "notice.group_upload"
-     notice_type: Literal["group_upload"]
-     user_id: int
-     group_id: int
-     file: File

## class GroupAdminNoticeEvent
"""群管理员变动"""

### def is_tome


```py
    def is_tome(self) -> bool:
        return self.user_id == self.self_id
```

### def get_user_id


```py
    def get_user_id(self) -> str:
        return str(self.user_id)
```

### def get_session_id


```py
    def get_session_id(self) -> str:
        return f"group_{self.group_id}_{self.user_id}"
```

### static vars
-     __event__ = "notice.group_admin"
-     notice_type: Literal["group_admin"]
-     sub_type: str
-     user_id: int
-     group_id: int

## class GroupDecreaseNoticeEvent
"""群成员减少事件"""

### def is_tome


```py
    def is_tome(self) -> bool:
        return self.user_id == self.self_id
```

### def get_user_id


```py
    def get_user_id(self) -> str:
        return str(self.user_id)
```

### def get_session_id


```py
    def get_session_id(self) -> str:
        return f"group_{self.group_id}_{self.user_id}"
```

### static vars
-     __event__ = "notice.group_decrease"
-     notice_type: Literal["group_decrease"]
-     sub_type: str
-     user_id: int
-     group_id: int
-     operator_id: int

## class GroupIncreaseNoticeEvent
"""群成员增加事件"""

### def is_tome


```py
    def is_tome(self) -> bool:
        return self.user_id == self.self_id
```

### def get_user_id


```py
    def get_user_id(self) -> str:
        return str(self.user_id)
```

### def get_session_id


```py
    def get_session_id(self) -> str:
        return f"group_{self.group_id}_{self.user_id}"
```

### static vars
-     __event__ = "notice.group_increase"
-     notice_type: Literal["group_increase"]
-     sub_type: str
-     user_id: int
-     group_id: int
-     operator_id: int

## class GroupBanNoticeEvent
"""群禁言事件"""

### def is_tome


```py
    def is_tome(self) -> bool:
        return self.user_id == self.self_id
```

### def get_user_id


```py
    def get_user_id(self) -> str:
        return str(self.user_id)
```

### def get_session_id


```py
    def get_session_id(self) -> str:
        return f"group_{self.group_id}_{self.user_id}"
```

### static vars
-     __event__ = "notice.group_ban"
-     notice_type: Literal["group_ban"]
-     sub_type: str
-     user_id: int
-     group_id: int
-     operator_id: int
-     duration: int

## class FriendAddNoticeEvent
"""好友添加事件"""

### def get_user_id


```py
    def get_user_id(self) -> str:
        return str(self.user_id)
```

### def get_session_id


```py
    def get_session_id(self) -> str:
        return str(self.user_id)
```

### static vars
-     __event__ = "notice.friend_add"
-     notice_type: Literal["friend_add"]
-     user_id: int

## class GroupRecallNoticeEvent
"""群消息撤回事件"""

### def is_tome


```py
    def is_tome(self) -> bool:
        return self.user_id == self.self_id
```

### def get_user_id


```py
    def get_user_id(self) -> str:
        return str(self.user_id)
```

### def get_session_id


```py
    def get_session_id(self) -> str:
        return f"group_{self.group_id}_{self.user_id}"
```

### static vars
-     __event__ = "notice.group_recall"
-     notice_type: Literal["group_recall"]
-     user_id: int
-     group_id: int
-     operator_id: int
-     message_id: int

## class FriendRecallNoticeEvent
"""好友消息撤回事件"""

### def get_user_id


```py
    def get_user_id(self) -> str:
        return str(self.user_id)
```

### def get_session_id


```py
    def get_session_id(self) -> str:
        return str(self.user_id)
```

### static vars
-     __event__ = "notice.friend_recall"
-     notice_type: Literal["friend_recall"]
-     user_id: int
-     message_id: int

## class NotifyEvent
"""提醒事件"""

### def get_user_id


```py
    def get_user_id(self) -> str:
        return str(self.user_id)
```

### def get_session_id


```py
    def get_session_id(self) -> str:
        return f"group_{self.group_id}_{self.user_id}"
```

### static vars
-     __event__ = "notice.notify"
-     notice_type: Literal["notify"]
-     sub_type: str
-     user_id: int
-     group_id: int

## class PokeNotifyEvent
"""戳一戳提醒事件"""

### def is_tome


```py
    def is_tome(self) -> bool:
        return self.target_id == self.self_id
```

### def get_session_id


```py
    def get_session_id(self) -> str:
        if not self.group_id:
            return str(self.user_id)
        return super().get_session_id()
```

### static vars
-     __event__ = "notice.notify.poke"
-     sub_type: Literal["poke"]
-     target_id: int
-     group_id: Optional[int] = None

## class LuckyKingNotifyEvent
"""群红包运气王提醒事件"""

### def is_tome


```py
    def is_tome(self) -> bool:
        return self.target_id == self.self_id
```

### def get_user_id


```py
    def get_user_id(self) -> str:
        return str(self.target_id)
```

### def get_session_id


```py
    def get_session_id(self) -> str:
        return f"group_{self.group_id}_{self.target_id}"
```

### static vars
-     __event__ = "notice.notify.lucky_king"
-     sub_type: Literal["lucky_king"]
-     target_id: int

## class HonorNotifyEvent
"""群荣誉变更提醒事件"""

### def is_tome


```py
    def is_tome(self) -> bool:
        return self.user_id == self.self_id
```

### static vars
-     __event__ = "notice.notify.honor"
-     sub_type: Literal["honor"]
-     honor_type: str

## class RequestEvent
"""请求事件"""

### def get_event_name


```py
    def get_event_name(self) -> str:
        sub_type = getattr(self, "sub_type", None)
        sub_type = f".{sub_type}" if sub_type else ""
        return f"{self.post_type}.{self.request_type}{sub_type}"
```

### static vars
-     __event__ = "request"
-     post_type: Literal["request"]
-     request_type: str

## class FriendRequestEvent
"""加好友请求事件"""

### def get_user_id


```py
    def get_user_id(self) -> str:
        return str(self.user_id)
```

### def get_session_id


```py
    def get_session_id(self) -> str:
        return str(self.user_id)
```

### async def approve


- bot: "Bot"
- remark: str
```py
    async def approve(self, bot: "Bot", remark: str = ""):
        return await bot.set_friend_add_request(
            flag=self.flag, approve=True, remark=remark
        )
```

### async def reject


- bot: "Bot"
```py
    async def reject(self, bot: "Bot"):
        return await bot.set_friend_add_request(flag=self.flag, approve=False)
```

### static vars
-     __event__ = "request.friend"
-     request_type: Literal["friend"]
-     user_id: int
-     comment: str
-     flag: str

## class GroupRequestEvent
"""加群请求/邀请事件"""

### def get_user_id


```py
    def get_user_id(self) -> str:
        return str(self.user_id)
```

### def get_session_id


```py
    def get_session_id(self) -> str:
        return f"group_{self.group_id}_{self.user_id}"
```

### async def approve


- bot: "Bot"
```py
    async def approve(self, bot: "Bot"):
        return await bot.set_group_add_request(
            flag=self.flag, sub_type=self.sub_type, approve=True
        )
```

### async def reject


- bot: "Bot"
- reason: str
```py
    async def reject(self, bot: "Bot", reason: str = ""):
        return await bot.set_group_add_request(
            flag=self.flag, sub_type=self.sub_type, approve=False, reason=reason
        )
```

### static vars
-     __event__ = "request.group"
-     request_type: Literal["group"]
-     sub_type: str
-     group_id: int
-     user_id: int
-     comment: str
-     flag: str

## class MetaEvent
"""元事件"""

### def get_event_name


```py
    def get_event_name(self) -> str:
        sub_type = getattr(self, "sub_type", None)
        return f"{self.post_type}.{self.meta_event_type}" + (
            f".{sub_type}" if sub_type else ""
        )
```

### def get_log_string


```py
    def get_log_string(self) -> str:
        return ""
```

### static vars
-     __event__ = "meta_event"
-     post_type: Literal["meta_event"]
-     meta_event_type: str

## class LifecycleMetaEvent
"""生命周期元事件"""

### static vars
-     __event__ = "meta_event.lifecycle"
-     meta_event_type: Literal["lifecycle"]
-     sub_type: str

## class HeartbeatMetaEvent
"""心跳元事件"""

### static vars
-     __event__ = "meta_event.heartbeat"
-     meta_event_type: Literal["heartbeat"]
-     status: Status
-     interval: int

## def get_event_model
"""
:说明:

根据事件名获取对应 ``Event Model`` 及 ``FallBack Event Model`` 列表

:返回:

- ``List[Type[Event]]``
"""

- event_name
```py
def get_event_model(event_name) -> List[Type[Event]]:
    """
    :说明:

      根据事件名获取对应 ``Event Model`` 及 ``FallBack Event Model`` 列表

    :返回:

      - ``List[Type[Event]]``
    """
    return [model.value for model in _t.prefixes("." + event_name)][::-1]
```

## def json_to_event


- json_data
```py
def json_to_event(json_data) -> Optional[Event]:
    if not isinstance(json_data, dict):
        return None

    if "post_type" not in json_data:
        ResultStore.add_result(json_data)
        return

    try:
        post_type = json_data["post_type"]
        detail_type = json_data.get(f"{post_type}_type")
        detail_type = f".{detail_type}" if detail_type else ""
        sub_type = json_data.get("sub_type")
        sub_type = f".{sub_type}" if sub_type else ""
        models = get_event_model(post_type + detail_type + sub_type)
        for model in models:
            try:
                event = model.parse_obj(json_data)
                break
            except:
                logger.debug(f"Event Parser Error {model.__name__}")
        else:
            event = Event.parse_obj(json_data)

        return event

    except:
        logger.exception()
        logger.opt(colors=True).error(f"<r>Failed to parse event.\nRaw: {json_data}</r>")
```

## global vars
- _t = StringTrie(separator=".")
- model = None
- __all__ = [
    "Event",
    "MessageEvent",
    "PrivateMessageEvent",
    "GroupMessageEvent",
    "NoticeEvent",
    "GroupUploadNoticeEvent",
    "GroupAdminNoticeEvent",
    "GroupDecreaseNoticeEvent",
    "GroupIncreaseNoticeEvent",
    "GroupBanNoticeEvent",
    "FriendAddNoticeEvent",
    "GroupRecallNoticeEvent",
    "FriendRecallNoticeEvent",
    "NotifyEvent",
    "PokeNotifyEvent",
    "LuckyKingNotifyEvent",
    "HonorNotifyEvent",
    "RequestEvent",
    "FriendRequestEvent",
    "GroupRequestEvent",
    "MetaEvent",
    "LifecycleMetaEvent",
    "HeartbeatMetaEvent",
    "get_event_model",
]
## 下一步

<div align="right">
    在这里~ ↘
</div>
