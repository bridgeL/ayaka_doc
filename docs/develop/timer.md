```py
from datetime import datetime
from ayaka import AyakaApp

app = AyakaApp("test")

@app.on_interval(gap=60, s=10)
async def func():
    '''x时x分10秒时报时一次，60s一循环 = 每分钟的第10s报时'''
    await app.t_send(bot_id=123, group_id=100, message=str(datetime.now()))
```

<div class="demo">

"Bot" 说：2022-12-17 22:54:10.984382
"Bot" 说：2022-12-17 22:55:10.995215
"Bot" 说：2022-12-17 22:56:11.014828
"Bot" 说：2022-12-17 22:57:11.031758

</div>

```py
from datetime import datetime
from ayaka import AyakaApp

app = AyakaApp("test")

@app.on_interval(gap=3600, s=0, m=0)
async def func():
    '''x时0分0秒时报时一次，3600s一循环 = 整点报时'''
    await app.t_send(bot_id=123, group_id=100, message=str(datetime.now()))
```

```py
from datetime import datetime
from ayaka import AyakaApp

app = AyakaApp("test")

@app.on_everyday(h=8, s=0, m=0)
async def func():
    '''每天8时0分0秒时报时一次'''
    await app.t_send(bot_id=123, group_id=100, message=str(datetime.now()))
```

## 下一步

<div align="right">
    在这里~ ↘
</div>
