## class Config


### static vars
-     ayaka_prefix = "#"
-     ayaka_separate = " "
-     ayaka_exclude_old = True
-     fastapi_reload = True

## class Driver


### def deal


- bot
- event
```py
    def deal(self, bot, event):
        if self.deal_event:
            if isinstance(event, MessageEvent):
                logger.success(str(event))
                asyncio.create_task(self.deal_event(bot, event))
```

### async def bot_connect


- bot: Bot
```py
    async def bot_connect(self, bot: Bot):
        ts = []
        for call in self.connect_calls:
            ts.append(asyncio.create_task(call(bot)))
        await asyncio.gather(*ts)
```

### async def bot_disconnect


- bot: Bot
```py
    async def bot_disconnect(self, bot: Bot):
        ts = []
        for call in self.disconnect_calls:
            ts.append(asyncio.create_task(call(bot)))
        await asyncio.gather(*ts)
```

### def on_bot_connect


- func
```py
    def on_bot_connect(self, func):
        self.connect_calls.append(func)
```

### def on_bot_disconnect


- func
```py
    def on_bot_disconnect(self, func):
        self.disconnect_calls.append(func)
```

### def on_startup


- func
```py
    def on_startup(self, func):
        app.on_event("startup")(func)
```

### def on_shutdown


- func
```py
    def on_shutdown(self, func):
        app.on_event("shutdown")(func)
```

### static vars
-     connect_calls = []
-     disconnect_calls = []
-     deal_event = None
-     config = Config()

## def run


- host
- port
- reload
```py
def run(host="127.0.0.1", port=19900, reload=True):
    uvicorn.run(
        app=f"{__name__}:app",
        host=host,
        port=port,
        reload=reload,
    )
```

## def load_plugins


- path
```py
def load_plugins(path):
    path = Path(path)
    for p in path.iterdir():
        name = re.sub(r"\\|/", ".", str(p))
        try:
            import_module(name)
            logger.success(f"导入成功 {name}")
        except:
            logger.exception(f"导入失败 {name}")
```

## async def endpoint


- websocket: WebSocket
```py
@app.websocket("/ayakabot")
async def endpoint(websocket: WebSocket):
    self_id = websocket.headers.get("x-self-id")
    ws = FastAPIWebSocket(websocket)
    bot = Bot(ws, self_id)

    # 建立ws连接
    await ws.accept()
    await driver.bot_connect(bot)

    try:
        # 监听循环
        while True:
            data = await ws.receive()
            json_data = json.loads(data)
            # 将json解析为对应的event
            event = json_to_event(json_data)

            if not event:
                continue

            driver.deal(bot, event)

    except:
        logger.exception("连接中断")
    finally:
        # 结束ws连接
        await driver.bot_disconnect(bot)
        await ws.close()
```

## def get_driver


```py
def get_driver():
    return driver
```

## def on_message


- priority
- block
- handlers
```py
def on_message(priority, block, handlers):
    driver.deal_event = handlers[0]
```

## global vars
- app = FastAPI()
- driver = Driver()
## 下一步

<div align="right">
    在这里~ ↘
</div>
