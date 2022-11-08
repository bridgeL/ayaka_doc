## global vars
- _bot: ContextVar[Bot] = ContextVar("_bot")
- _event: ContextVar[MessageEvent] = ContextVar("_event")
- _group: ContextVar["AyakaGroup"] = ContextVar("_group")
- _arg: ContextVar[Message] = ContextVar("_arg")
- _args: ContextVar[List[MessageSegment]] = ContextVar("_args")
- _message: ContextVar[Message] = ContextVar("_message")
- _cmd: ContextVar[str] = ContextVar("_cmd")
- app_list: List["AyakaApp"] = []
- group_list: List["AyakaGroup"] = []
- bot_list: List[Bot] = []
- private_listener_dict: Dict[int, List[int]] = defaultdict(list)
## 下一步

<div align="right">
    在这里~ ↘
</div>
