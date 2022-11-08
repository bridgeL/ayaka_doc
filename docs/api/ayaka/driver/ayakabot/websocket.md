## class FastAPIWebSocket
"""FastAPI WebSocket Wrapper"""

### def \_\_init\_\_


- websocket: WebSocket
```py
    def __init__(self, websocket: WebSocket):
        self.websocket = websocket
```

### async def accept


```py
    async def accept(self) -> None:
        await self.websocket.accept()
```

### async def close


- code: int
- reason: str
```py
    async def close(
        self, code: int = status.WS_1000_NORMAL_CLOSURE, reason: str = ""
    ) -> None:
        await self.websocket.close(code)
```

### async def receive


```py
    async def receive(self) -> str:
        return await self.websocket.receive_text()
```

### async def send


- data: str
```py
    async def send(self, data: str) -> None:
        await self.websocket.send({"type": "websocket.send", "text": data})
```
## 下一步

<div align="right">
    在这里~ ↘
</div>
