## class Bot


### async def call_api
async def call_api(self, api: str, **data) -> Any: ...

- api: str
```py
    async def call_api(self, api: str, **data) -> Any: ...
```

### def on_call
def on_call(self, func) -> None: ...

- func
```py
    @classmethod
    def on_call(self, func) -> None: ...
```

### def \_\_init\_\_
def __init__(self, ws: FastAPIWebSocket, self_id: str) -> None: ...

- ws: FastAPIWebSocket
- self_id: str
```py
    def __init__(self, ws: FastAPIWebSocket, self_id: str) -> None: ...
```

### async def send
) -> Any: ...

- event: Event
- message: Union[str, Message, MessageSegment]
```py
    async def send(
        self, event: Event, message: Union[str, Message, MessageSegment], **kwargs
    ) -> Any: ...
```

### async def send_private_msg
"""
:说明:

发送私聊消息。

:参数:

* ``user_id``: 对方 QQ 号
* ``message``: 要发送的内容
* ``auto_escape``: 消息内容是否作为纯文本发送（即不解析 CQ 码），只在 ``message`` 字段是字符串时有效

"""

```py
    async def send_private_msg(
        self,
        *,
        user_id: int,
        message: Union[str, Message],
        auto_escape: bool = ...,
    ) -> Dict[str, Any]:
        """
        :说明:

          发送私聊消息。

        :参数:

          * ``user_id``: 对方 QQ 号
          * ``message``: 要发送的内容
          * ``auto_escape``: 消息内容是否作为纯文本发送（即不解析 CQ 码），只在 ``message`` 字段是字符串时有效

        """
        ...
```

### async def send_group_msg
"""
:说明:

发送群消息。

:参数:

* ``group_id``: 群号
* ``message``: 要发送的内容
* ``auto_escape``: 消息内容是否作为纯文本发送（即不解析 CQ 码），只在 ``message`` 字段是字符串时有效

"""

```py
    async def send_group_msg(
        self,
        *,
        group_id: int,
        message: Union[str, Message],
        auto_escape: bool = ...,
    ) -> Dict[str, Any]:
        """
        :说明:

          发送群消息。

        :参数:

          * ``group_id``: 群号
          * ``message``: 要发送的内容
          * ``auto_escape``: 消息内容是否作为纯文本发送（即不解析 CQ 码），只在 ``message`` 字段是字符串时有效

        """
        ...
```

### async def send_msg
"""
:说明:

发送消息。

:参数:

* ``message_type``: 消息类型，支持 ``private``、``group``，分别对应私聊、群组、讨论组，如不传入，则根据传入的 ``*_id`` 参数判断
* ``user_id``: 对方 QQ 号（消息类型为 ``private`` 时需要）
* ``group_id``: 群号（消息类型为 ``group`` 时需要）
* ``message``: 要发送的内容
* ``auto_escape``: 消息内容是否作为纯文本发送（即不解析 CQ 码），只在 ``message`` 字段是字符串时有效

"""

```py
    async def send_msg(
        self,
        *,
        message_type: Optional[str] = ...,
        user_id: Optional[int] = ...,
        group_id: Optional[int] = ...,
        message: Union[str, Message],
        auto_escape: bool = ...,
    ) -> Dict[str, Any]:
        """
        :说明:

          发送消息。

        :参数:

          * ``message_type``: 消息类型，支持 ``private``、``group``，分别对应私聊、群组、讨论组，如不传入，则根据传入的 ``*_id`` 参数判断
          * ``user_id``: 对方 QQ 号（消息类型为 ``private`` 时需要）
          * ``group_id``: 群号（消息类型为 ``group`` 时需要）
          * ``message``: 要发送的内容
          * ``auto_escape``: 消息内容是否作为纯文本发送（即不解析 CQ 码），只在 ``message`` 字段是字符串时有效

        """
        ...
```

### async def delete_msg
"""
:说明:

撤回消息。

:参数:

* ``message_id``: 消息 ID

"""

```py
    async def delete_msg(
        self,
        *,
        message_id: int,
    ) -> None:
        """
        :说明:

          撤回消息。

        :参数:

          * ``message_id``: 消息 ID

        """
        ...
```

### async def get_msg
"""
:说明:

获取消息。

:参数:

* ``message_id``: 消息 ID

"""

```py
    async def get_msg(
        self,
        *,
        message_id: int,
    ) -> Dict[str, Any]:
        """
        :说明:

          获取消息。

        :参数:

          * ``message_id``: 消息 ID

        """
        ...
```

### async def get_forward_msg
"""
:说明:

获取合并转发消息。

:参数:

* ``id``: 合并转发 ID

"""

```py
    async def get_forward_msg(
        self,
        *,
        id: str,
    ) -> None:
        """
        :说明:

          获取合并转发消息。

        :参数:

          * ``id``: 合并转发 ID

        """
        ...
```

### async def send_like
"""
:说明:

发送好友赞。

:参数:

* ``user_id``: 对方 QQ 号
* ``times``: 赞的次数，每个好友每天最多 10 次

"""

```py
    async def send_like(
        self,
        *,
        user_id: int,
        times: int = ...,
    ) -> None:
        """
        :说明:

          发送好友赞。

        :参数:

          * ``user_id``: 对方 QQ 号
          * ``times``: 赞的次数，每个好友每天最多 10 次

        """
        ...
```

### async def set_group_kick
"""
:说明:

群组踢人。

:参数:

* ``group_id``: 群号
* ``user_id``: 要踢的 QQ 号
* ``reject_add_request``: 拒绝此人的加群请求

"""

```py
    async def set_group_kick(
        self,
        *,
        group_id: int,
        user_id: int,
        reject_add_request: bool = ...,
    ) -> None:
        """
        :说明:

          群组踢人。

        :参数:

          * ``group_id``: 群号
          * ``user_id``: 要踢的 QQ 号
          * ``reject_add_request``: 拒绝此人的加群请求

        """
        ...
```

### async def set_group_ban
"""
:说明:

群组单人禁言。

:参数:

* ``group_id``: 群号
* ``user_id``: 要禁言的 QQ 号
* ``duration``: 禁言时长，单位秒，``0`` 表示取消禁言

"""

```py
    async def set_group_ban(
        self,
        *,
        group_id: int,
        user_id: int,
        duration: int = ...,
    ) -> None:
        """
        :说明:

          群组单人禁言。

        :参数:

          * ``group_id``: 群号
          * ``user_id``: 要禁言的 QQ 号
          * ``duration``: 禁言时长，单位秒，``0`` 表示取消禁言

        """
        ...
```

### async def set_group_anonymous_ban
"""
:说明:

群组匿名用户禁言。

:参数:

* ``group_id``: 群号
* ``anonymous``: 可选，要禁言的匿名用户对象（群消息上报的 ``anonymous`` 字段）
* ``anonymous_flag``: 可选，要禁言的匿名用户的 flag（需从群消息上报的数据中获得）
* ``duration``: 禁言时长，单位秒，无法取消匿名用户禁言

"""

```py
    async def set_group_anonymous_ban(
        self,
        *,
        group_id: int,
        anonymous: Optional[Dict[str, Any]] = ...,
        anonymous_flag: Optional[str] = ...,
        duration: int = ...,
    ) -> None:
        """
        :说明:

          群组匿名用户禁言。

        :参数:

          * ``group_id``: 群号
          * ``anonymous``: 可选，要禁言的匿名用户对象（群消息上报的 ``anonymous`` 字段）
          * ``anonymous_flag``: 可选，要禁言的匿名用户的 flag（需从群消息上报的数据中获得）
          * ``duration``: 禁言时长，单位秒，无法取消匿名用户禁言

        """
        ...
```

### async def set_group_whole_ban
"""
:说明:

群组全员禁言。

:参数:

* ``group_id``: 群号
* ``enable``: 是否禁言

"""

```py
    async def set_group_whole_ban(
        self,
        *,
        group_id: int,
        enable: bool = ...,
    ) -> None:
        """
        :说明:

          群组全员禁言。

        :参数:

          * ``group_id``: 群号
          * ``enable``: 是否禁言

        """
        ...
```

### async def set_group_admin
"""
:说明:

群组设置管理员。

:参数:

* ``group_id``: 群号
* ``user_id``: 要设置管理员的 QQ 号
* ``enable``: ``True`` 为设置，``False`` 为取消

"""

```py
    async def set_group_admin(
        self,
        *,
        group_id: int,
        user_id: int,
        enable: bool = ...,
    ) -> None:
        """
        :说明:

          群组设置管理员。

        :参数:

          * ``group_id``: 群号
          * ``user_id``: 要设置管理员的 QQ 号
          * ``enable``: ``True`` 为设置，``False`` 为取消

        """
        ...
```

### async def set_group_anonymous
"""
:说明:

群组匿名。

:参数:

* ``group_id``: 群号
* ``enable``: 是否允许匿名聊天

"""

```py
    async def set_group_anonymous(
        self,
        *,
        group_id: int,
        enable: bool = ...,
    ) -> None:
        """
        :说明:

          群组匿名。

        :参数:

          * ``group_id``: 群号
          * ``enable``: 是否允许匿名聊天

        """
        ...
```

### async def set_group_card
"""
:说明:

设置群名片（群备注）。

:参数:

* ``group_id``: 群号
* ``user_id``: 要设置的 QQ 号
* ``card``: 群名片内容，不填或空字符串表示删除群名片

"""

```py
    async def set_group_card(
        self,
        *,
        group_id: int,
        user_id: int,
        card: str = ...,
    ) -> None:
        """
        :说明:

          设置群名片（群备注）。

        :参数:

          * ``group_id``: 群号
          * ``user_id``: 要设置的 QQ 号
          * ``card``: 群名片内容，不填或空字符串表示删除群名片

        """
        ...
```

### async def set_group_name
"""
:说明:

设置群名。

:参数:

* ``group_id``: 群号
* ``group_name``: 新群名

"""

```py
    async def set_group_name(
        self,
        *,
        group_id: int,
        group_name: str,
    ) -> None:
        """
        :说明:

          设置群名。

        :参数:

          * ``group_id``: 群号
          * ``group_name``: 新群名

        """
        ...
```

### async def set_group_leave
"""
:说明:

退出群组。

:参数:

* ``group_id``: 群号
* ``is_dismiss``: 是否解散，如果登录号是群主，则仅在此项为 True 时能够解散

"""

```py
    async def set_group_leave(
        self,
        *,
        group_id: int,
        is_dismiss: bool = ...,
    ) -> None:
        """
        :说明:

          退出群组。

        :参数:

          * ``group_id``: 群号
          * ``is_dismiss``: 是否解散，如果登录号是群主，则仅在此项为 True 时能够解散

        """
        ...
```

### async def set_group_special_title
"""
:说明:

设置群组专属头衔。

:参数:

* ``group_id``: 群号
* ``user_id``: 要设置的 QQ 号
* ``special_title``: 专属头衔，不填或空字符串表示删除专属头衔
* ``duration``: 专属头衔有效期，单位秒，-1 表示永久，不过此项似乎没有效果，可能是只有某些特殊的时间长度有效，有待测试

"""

```py
    async def set_group_special_title(
        self,
        *,
        group_id: int,
        user_id: int,
        special_title: str = ...,
        duration: int = ...,
    ) -> None:
        """
        :说明:

          设置群组专属头衔。

        :参数:

          * ``group_id``: 群号
          * ``user_id``: 要设置的 QQ 号
          * ``special_title``: 专属头衔，不填或空字符串表示删除专属头衔
          * ``duration``: 专属头衔有效期，单位秒，-1 表示永久，不过此项似乎没有效果，可能是只有某些特殊的时间长度有效，有待测试

        """
        ...
```

### async def set_friend_add_request
"""
:说明:

处理加好友请求。

:参数:

* ``flag``: 加好友请求的 flag（需从上报的数据中获得）
* ``approve``: 是否同意请求
* ``remark``: 添加后的好友备注（仅在同意时有效）

"""

```py
    async def set_friend_add_request(
        self,
        *,
        flag: str,
        approve: bool = ...,
        remark: str = ...,
    ) -> None:
        """
        :说明:

          处理加好友请求。

        :参数:

          * ``flag``: 加好友请求的 flag（需从上报的数据中获得）
          * ``approve``: 是否同意请求
          * ``remark``: 添加后的好友备注（仅在同意时有效）

        """
        ...
```

### async def set_group_add_request
"""
:说明:

处理加群请求／邀请。

:参数:

* ``flag``: 加群请求的 flag（需从上报的数据中获得）
* ``sub_type``: ``add`` 或 ``invite``，请求类型（需要和上报消息中的 ``sub_type`` 字段相符）
* ``approve``: 是否同意请求／邀请
* ``reason``: 拒绝理由（仅在拒绝时有效）

"""

```py
    async def set_group_add_request(
        self,
        *,
        flag: str,
        sub_type: str,
        approve: bool = ...,
        reason: str = ...,
    ) -> None:
        """
        :说明:

          处理加群请求／邀请。

        :参数:

          * ``flag``: 加群请求的 flag（需从上报的数据中获得）
          * ``sub_type``: ``add`` 或 ``invite``，请求类型（需要和上报消息中的 ``sub_type`` 字段相符）
          * ``approve``: 是否同意请求／邀请
          * ``reason``: 拒绝理由（仅在拒绝时有效）

        """
        ...
```

### async def get_login_info
"""
:说明:

获取登录号信息。

"""

```py
    async def get_login_info(self) -> Dict[str, Any]:
        """
        :说明:

          获取登录号信息。

        """
        ...
```

### async def get_stranger_info
"""
:说明:

获取陌生人信息。

:参数:

* ``user_id``: QQ 号
* ``no_cache``: 是否不使用缓存（使用缓存可能更新不及时，但响应更快）

"""

```py
    async def get_stranger_info(
        self,
        *,
        user_id: int,
        no_cache: bool = ...,
    ) -> Dict[str, Any]:
        """
        :说明:

          获取陌生人信息。

        :参数:

          * ``user_id``: QQ 号
          * ``no_cache``: 是否不使用缓存（使用缓存可能更新不及时，但响应更快）

        """
        ...
```

### async def get_friend_list
"""
:说明:

获取好友列表。

"""

```py
    async def get_friend_list(self) -> List[Dict[str, Any]]:
        """
        :说明:

          获取好友列表。

        """
        ...
```

### async def get_group_info
"""
:说明:

获取群信息。

:参数:

* ``group_id``: 群号
* ``no_cache``: 是否不使用缓存（使用缓存可能更新不及时，但响应更快）

"""

```py
    async def get_group_info(
        self,
        *,
        group_id: int,
        no_cache: bool = ...,
    ) -> Dict[str, Any]:
        """
        :说明:

          获取群信息。

        :参数:

          * ``group_id``: 群号
          * ``no_cache``: 是否不使用缓存（使用缓存可能更新不及时，但响应更快）

        """
        ...
```

### async def get_group_list
"""
:说明:

获取群列表。

"""

```py
    async def get_group_list(self) -> List[Dict[str, Any]]:
        """
        :说明:

          获取群列表。

        """
        ...
```

### async def get_group_member_info
"""
:说明:

获取群成员信息。

:参数:

* ``group_id``: 群号
* ``user_id``: QQ 号
* ``no_cache``: 是否不使用缓存（使用缓存可能更新不及时，但响应更快）

"""

```py
    async def get_group_member_info(
        self,
        *,
        group_id: int,
        user_id: int,
        no_cache: bool = ...,
    ) -> Dict[str, Any]:
        """
        :说明:

          获取群成员信息。

        :参数:

          * ``group_id``: 群号
          * ``user_id``: QQ 号
          * ``no_cache``: 是否不使用缓存（使用缓存可能更新不及时，但响应更快）

        """
        ...
```

### async def get_group_member_list
"""
:说明:

获取群成员列表。

:参数:

* ``group_id``: 群号

"""

```py
    async def get_group_member_list(
        self,
        *,
        group_id: int,
    ) -> List[Dict[str, Any]]:
        """
        :说明:

          获取群成员列表。

        :参数:

          * ``group_id``: 群号

        """
        ...
```

### async def get_group_honor_info
"""
:说明:

获取群荣誉信息。

:参数:

* ``group_id``: 群号
* ``type``: 要获取的群荣誉类型，可传入 ``talkative`` ``performer`` ``legend`` ``strong_newbie`` ``emotion`` 以分别获取单个类型的群荣誉数据，或传入 ``all`` 获取所有数据

"""

```py
    async def get_group_honor_info(
        self,
        *,
        group_id: int,
        type: str = ...,
    ) -> Dict[str, Any]:
        """
        :说明:

          获取群荣誉信息。

        :参数:

          * ``group_id``: 群号
          * ``type``: 要获取的群荣誉类型，可传入 ``talkative`` ``performer`` ``legend`` ``strong_newbie`` ``emotion`` 以分别获取单个类型的群荣誉数据，或传入 ``all`` 获取所有数据

        """
        ...
```

### async def get_cookies
"""
:说明:

获取 Cookies。

:参数:

* ``domain``: 需要获取 cookies 的域名

"""

```py
    async def get_cookies(
        self,
        *,
        domain: str = ...,
    ) -> Dict[str, Any]:
        """
        :说明:

          获取 Cookies。

        :参数:

          * ``domain``: 需要获取 cookies 的域名

        """
        ...
```

### async def get_csrf_token
"""
:说明:

获取 CSRF Token。

"""

```py
    async def get_csrf_token(self) -> Dict[str, Any]:
        """
        :说明:

          获取 CSRF Token。

        """
        ...
```

### async def get_credentials
"""
:说明:

获取 QQ 相关接口凭证。

:参数:

* ``domain``: 需要获取 cookies 的域名

"""

```py
    async def get_credentials(
        self,
        *,
        domain: str = ...,
    ) -> Dict[str, Any]:
        """
        :说明:

          获取 QQ 相关接口凭证。

        :参数:

          * ``domain``: 需要获取 cookies 的域名

        """
        ...
```

### async def get_record
"""
:说明:

获取语音。

:参数:

* ``file``: 收到的语音文件名（CQ 码的 ``file`` 参数），如 ``0B38145AA44505000B38145AA4450500.silk``
* ``out_format``: 要转换到的格式，目前支持 ``mp3``、``amr``、``wma``、``m4a``、``spx``、``ogg``、``wav``、``flac``

"""

```py
    async def get_record(
        self,
        *,
        file: str,
        out_format: str,
    ) -> Dict[str, Any]:
        """
        :说明:

          获取语音。

        :参数:

          * ``file``: 收到的语音文件名（CQ 码的 ``file`` 参数），如 ``0B38145AA44505000B38145AA4450500.silk``
          * ``out_format``: 要转换到的格式，目前支持 ``mp3``、``amr``、``wma``、``m4a``、``spx``、``ogg``、``wav``、``flac``

        """
        ...
```

### async def get_image
"""
:说明:

获取图片。

:参数:

* ``file``: 收到的图片文件名（CQ 码的 ``file`` 参数），如 ``6B4DE3DFD1BD271E3297859D41C530F5.jpg``

"""

```py
    async def get_image(
        self,
        *,
        file: str,
    ) -> Dict[str, Any]:
        """
        :说明:

          获取图片。

        :参数:

          * ``file``: 收到的图片文件名（CQ 码的 ``file`` 参数），如 ``6B4DE3DFD1BD271E3297859D41C530F5.jpg``

        """
        ...
```

### async def can_send_image
"""
:说明:

检查是否可以发送图片。

"""

```py
    async def can_send_image(self) -> Dict[str, Any]:
        """
        :说明:

          检查是否可以发送图片。

        """
        ...
```

### async def can_send_record
"""
:说明:

检查是否可以发送语音。

"""

```py
    async def can_send_record(self) -> Dict[str, Any]:
        """
        :说明:

          检查是否可以发送语音。

        """
        ...
```

### async def get_status
"""
:说明:

获取插件运行状态。

"""

```py
    async def get_status(self) -> Dict[str, Any]:
        """
        :说明:

          获取插件运行状态。

        """
        ...
```

### async def get_version_info
"""
:说明:

获取版本信息。

"""

```py
    async def get_version_info(self) -> Dict[str, Any]:
        """
        :说明:

          获取版本信息。

        """
        ...
```

### async def set_restart
"""
:说明:

重启 OneBot 实现。

:参数:

* ``delay``: 要延迟的毫秒数，如果默认情况下无法重启，可以尝试设置延迟为 2000 左右

"""

```py
    async def set_restart(
        self,
        *,
        delay: int = ...,
    ) -> None:
        """
        :说明:

          重启 OneBot 实现。

        :参数:

          * ``delay``: 要延迟的毫秒数，如果默认情况下无法重启，可以尝试设置延迟为 2000 左右

        """
        ...
```

### async def clean_cache
"""
:说明:

清理数据目录。

"""

```py
    async def clean_cache(self) -> None:
        """
        :说明:

          清理数据目录。

        """
        ...
```

### static vars
-     self_id: str
## 下一步

<div align="right">
    在这里~ ↘
</div>
