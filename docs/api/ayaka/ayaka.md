## class AyakaApp
Ayaka 应用

ayaka插件的核心

### def \_\_repr\_\_


```py
    def __repr__(self) -> str:
        return f"AyakaApp({self.name}, {self.state})"
```

### def \_\_init\_\_


- name: str
```py
    def __init__(self, name: str) -> None:
        self.name = name
        self.state = INIT_STATE
        self.triggers: List[AyakaTrigger] = []
        self.timers: List[AyakaTimer] = []
        self._help: Dict[str, List[str]] = {}
        self.on = AyakaOn(self)
        self.storage = AyakaStorage(self)
        self.parser = AyakaParser()
        self.path = Path(inspect.stack()[1].filename)

        for app in app_list:
            if app.name == self.name:
                logger.warning(
                    f"应用{app.name} 重复注册，已忽略后注册的应用！\n{app.path}\n{self.path}(被忽略)")
                break
        else:
            app_list.append(self)
        if AYAKA_DEBUG:
            print(self)
```

### def super_triggers


```py
    @property
    def super_triggers(self):
        return [t for t in self.triggers if t.super]
```

### def state_triggers


```py
    @property
    def state_triggers(self):
        return [t for t in self.triggers if not t.super and t.state is not None]
```

### def no_state_triggers


```py
    @property
    def no_state_triggers(self):
        return [t for t in self.triggers if not t.super and t.state is None]
```

### def intro
获取介绍，也就是init状态下的帮助

```py
    @property
    def intro(self):
        '''获取介绍，也就是init状态下的帮助'''
        helps = self._help.get(INIT_STATE, ["没有找到帮助"])
        return "\n".join(helps)
```

### def get_helps


- state: str
```py
    def get_helps(self, state: str):
        helps = self._help.get(state)
        if not helps:
            return []
        return [f"[{state}]"] + helps
```

### def help
获取当前状态下的帮助，没有找到则返回介绍

```py
    @property
    def help(self):
        '''获取当前状态下的帮助，没有找到则返回介绍'''
        if self.group.running_app_name == self.name:
            helps = []
            state = self.state
            helps.extend(self.get_helps(state))

            while "." in state:
                state = state.rsplit(".", 1)[0]
                helps.extend(self.get_helps(state))

            helps.extend(self.get_helps("*"))

            if helps:
                return "\n".join(helps)

        return self.intro
```

### def all_help
获取介绍以及全部状态下的帮助

```py
    @property
    def all_help(self):
        '''获取介绍以及全部状态下的帮助'''
        info = self.intro
        for k, v in self._help.items():
            v = "\n".join(v)
            if k != INIT_STATE:
                info += f"\n[{k}]\n{v}"
        return info
```

### def help
设置帮助，若help为str，则设置为介绍，若help为dict，则设置为对应状态的帮助

- help: Union[str, Dict[str, str]]
```py
    @help.setter
    def help(self, help: Union[str, Dict[str, str]]):
        '''设置帮助，若help为str，则设置为介绍，若help为dict，则设置为对应状态的帮助'''
        if isinstance(help, dict):
            help = {k: [v.strip()] for k, v in help.items()}
            self._help.update(help)
        else:
            self._help[INIT_STATE] = [help.strip()]
```

### def valid
*timer触发时不可用*

当前app是否被当前群组启用


```py
    @property
    def valid(self):
        '''*timer触发时不可用*

        当前app是否被当前群组启用
        '''
        return self.group.get_app(self.name)
```

### def cache
*timer触发时不可用*

当前群组、当前app的独立数据空间


```py
    @property
    def cache(self):
        '''*timer触发时不可用*

        当前群组、当前app的独立数据空间
        '''
        return self.group.cache_dict.get(self.name)
```

### def user_name
*timer触发时不可用*

当前消息的发送人的群名片或昵称


```py
    @property
    def user_name(self):
        '''*timer触发时不可用*

        当前消息的发送人的群名片或昵称
        '''
        s = self.event.sender
        name = s.card or s.nickname
        return name
```

### def user_id
*timer触发时不可用*

当前消息的发送人的uid


```py
    @property
    def user_id(self):
        '''*timer触发时不可用*

        当前消息的发送人的uid
        '''
        return self.event.user_id
```

### def bot
*timer触发时不可用*

当前bot


```py
    @property
    def bot(self):
        '''*timer触发时不可用*

        当前bot
        '''
        return _bot.get()
```

### def event
*timer触发时不可用*

当前消息


```py
    @property
    def event(self):
        '''*timer触发时不可用*

        当前消息
        '''
        return _event.get()
```

### def group_id
*timer触发时不可用*

当前群组的id

注：若群聊A正监听私聊B，当私聊B发送消息触发插件回调时，该属性仍可正确返回群聊A的id


```py
    @property
    def group_id(self):
        '''*timer触发时不可用*

        当前群组的id

        注：若群聊A正监听私聊B，当私聊B发送消息触发插件回调时，该属性仍可正确返回群聊A的id
        '''
        return self.group.group_id
```

### def bot_id
*timer触发时不可用*

当前bot的id


```py
    @property
    def bot_id(self):
        '''*timer触发时不可用*

        当前bot的id
        '''
        return self.group.bot_id
```

### def group
*timer触发时不可用*

当前群组

注：若群聊A正监听私聊B，当私聊B发送消息触发插件回调时，该属性仍可正确返回群聊A


```py
    @property
    def group(self):
        '''*timer触发时不可用*

        当前群组

        注：若群聊A正监听私聊B，当私聊B发送消息触发插件回调时，该属性仍可正确返回群聊A
        '''
        return _group.get()
```

### def arg
*timer触发时不可用*

当前消息在移除了命令后的剩余部分


```py
    @property
    def arg(self):
        '''*timer触发时不可用*

        当前消息在移除了命令后的剩余部分
        '''
        return _arg.get()
```

### def args
*timer触发时不可用*

当前消息在移除了命令后，剩余部分按照空格分割后的数组

注：除了文字消息外，其他消息类型将自动分割，例如一串qq表情会被分割为多个元素


```py
    @property
    def args(self):
        '''*timer触发时不可用*

        当前消息在移除了命令后，剩余部分按照空格分割后的数组

        注：除了文字消息外，其他消息类型将自动分割，例如一串qq表情会被分割为多个元素
        '''
        return _args.get()
```

### def cmd
*timer触发时不可用*

当前消息的命令头


```py
    @property
    def cmd(self):
        '''*timer触发时不可用*

        当前消息的命令头
        '''
        return _cmd.get()
```

### def message
*timer触发时不可用*

当前消息


```py
    @property
    def message(self):
        '''*timer触发时不可用*

        当前消息
        '''
        return _message.get()
```

### async def start
*timer触发时不可用*

启动应用，并发送提示

- state
```py
    async def start(self, state=INIT_STATE):
        '''*timer触发时不可用*

        启动应用，并发送提示'''
        name = self.group.running_app_name
        if name and name != self.name:
            await self.send("打开应用失败")
            return False
        self.group.running_app = self
        self.state = state
        await self.send(f"已打开应用 [{self.name}]")
        return True
```

### async def close
*timer触发时不可用*

关闭应用，并发送提示

```py
    async def close(self):
        '''*timer触发时不可用*

        关闭应用，并发送提示'''
        name = self.group.running_app_name
        if name:
            self.group.running_app = None
            await self.send(f"已关闭应用 [{name}]")
        else:
            await self.send(f"没有应用在运行")
```

### def set_state


- state
```py
    def set_state(self, state=INIT_STATE):
        self.state = state
```

### def add_listener
为该群组添加对指定私聊的监听

- user_id: int
```py
    def add_listener(self, user_id: int):
        '''为该群组添加对指定私聊的监听'''
        private_listener_dict[user_id].append(self.group_id)
```

### def remove_listener
默认移除该群组对其他私聊的所有监听

- user_id: int
```py
    def remove_listener(self, user_id: int = 0):
        '''默认移除该群组对其他私聊的所有监听'''
        id = self.group_id

        if user_id == 0:
            for ids in private_listener_dict.values():
                if id in ids:
                    ids.remove(id)
            return

        if id in private_listener_dict[user_id]:
            private_listener_dict[user_id].remove(self.group_id)
```

### async def send
发送消息，消息的类型可以是 Message | MessageSegment | str

- message
```py
    async def send(self, message):
        '''发送消息，消息的类型可以是 Message | MessageSegment | str'''
        # 这里不使用event，因为一些event可能来自其他设备的监听传递
        await self.bot.send_group_msg(group_id=self.group_id, message=message)
```

### def pack_messages
转换为cqhttp node格式

- bot_id
- messages
```py
    def pack_messages(self, bot_id, messages):
        '''转换为cqhttp node格式'''
        data: List[MessageSegment] = []
        for m in messages:
            if isinstance(m, MessageSegment):
                data.append(m)
            else:
                m = MessageSegment.node_custom(
                    user_id=bot_id,
                    nickname="Ayaka Bot",
                    content=str(m)
                )
                data.append(m)
        return data
```

### async def send_many
发送合并转发消息，消息的类型可以是 List[Message | MessageSegment | str]

- messages
```py
    async def send_many(self, messages):
        '''发送合并转发消息，消息的类型可以是 List[Message | MessageSegment | str]'''
        # 分割长消息组（不可超过100条）谨慎起见，使用80作为单元长度
        div_len = 80
        div_cnt = ceil(len(messages) / div_len)
        for i in range(div_cnt):
            msgs = self.pack_messages(
                self.bot_id,
                messages[i*div_len: (i+1)*div_len]
            )
            await self.bot.call_api("send_group_forward_msg", group_id=self.group_id, messages=msgs)
```

### def t_check


- bot_id: int
- group_id: int
```py
    def t_check(self, bot_id: int, group_id: int):
        # 未连接
        bot = get_bot(bot_id)
        if not bot:
            logger.warning(f"BOT({bot_id}) 未连接")
            return

        # 已禁用
        group = get_group(bot_id, group_id)
        app = group.get_app(self.name)
        if not app:
            logger.warning(f"群聊({group_id}) 已禁用 {self.name}")
            return

        return bot
```

### async def t_send
timer触发回调时，想要发送消息必须使用该方法，一些上下文亦无法使用

- bot_id: int
- group_id: int
- message
```py
    async def t_send(self, bot_id: int, group_id: int, message):
        '''timer触发回调时，想要发送消息必须使用该方法，一些上下文亦无法使用'''
        bot = self.t_check(bot_id, group_id)
        if not bot:
            return

        await bot.send_group_msg(group_id=group_id, message=message)
```

### async def t_send_many
timer触发回调时，想要发送消息必须使用该方法，一些上下文亦无法使用

- bot_id: int
- group_id: int
- messages
```py
    async def t_send_many(self, bot_id: int, group_id: int, messages):
        '''timer触发回调时，想要发送消息必须使用该方法，一些上下文亦无法使用'''
        bot = self.t_check(bot_id, group_id)
        if not bot:
            return

        # 分割长消息组（不可超过100条）谨慎起见，使用80作为单元长度
        div_len = 80
        div_cnt = ceil(len(messages) / div_len)
        for i in range(div_cnt):
            msgs = self.pack_messages(
                bot_id,
                messages[i*div_len: (i+1)*div_len]
            )
            await bot.call_api("send_group_forward_msg", group_id=group_id, messages=msgs)
```


## async def startup


```py
@driver.on_startup
async def startup():
    app_list.sort(key=lambda x: x.name)
    await init_chrome()
```

## async def shutdown


```py
@driver.on_shutdown
async def shutdown():
    await close_chrome()
```

## async def bot_connect


- bot: Bot
```py
@driver.on_bot_connect
async def bot_connect(bot: Bot):
    bot_list.append(bot)

    # 在一切准备就绪后，开启插件中的定时模块
    global first_bot_connect
    if first_bot_connect:
        first_bot_connect = False
        for app in app_list:
            for t in app.timers:
                t.start()
```

## async def bot_disconnect


- bot: Bot
```py
@driver.on_bot_disconnect
async def bot_disconnect(bot: Bot):
    bot_list.remove(bot)
```

## global vars
- driver = get_driver()
- first_bot_connect = True
## 下一步

<div align="right">
    在这里~ ↘
</div>
