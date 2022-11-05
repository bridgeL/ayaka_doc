```py
'''
    整点报时
'''
from ayaka import AyakaApp

app = AyakaApp("整点报时")


# 每分钟一次
@app.on.interval(60, s=0)
async def every_minute():
    await app.t_send(bot_id=123, group_id=100, message="小乐")


# 每小时一次
@app.on.interval(3600, m=0, s=0)
async def every_hour():
    await app.t_send(bot_id=123, group_id=100, message="大乐")


# 每天一次
@app.on.everyday(h=23, m=59, s=59)
async def every_day():
    await app.t_send(bot_id=123, group_id=100, message="呃呃呃一天要结束了")
```

## 下一步

<div align="right">
    在这里~ ↘
</div>
