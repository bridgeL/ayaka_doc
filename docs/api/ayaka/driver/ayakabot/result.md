## class ResultStore


### def get_seq


- cls
```py
    @classmethod
    def get_seq(cls) -> int:
        s = cls._seq
        cls._seq = (cls._seq + 1) % sys.maxsize
        return s
```

### def add_result


- cls
- result: Dict[str, Any]
```py
    @classmethod
    def add_result(cls, result: Dict[str, Any]):
        echo = result.get("echo")
        if not isinstance(echo, dict):
            return

        seq = echo.get("seq")
        if not isinstance(seq, int):
            return

        future = cls._futures.get(seq)
        if not future:
            return

        future.set_result(result)
```

### async def fetch


- cls
- seq: int
- timeout: Optional[float]
```py
    @classmethod
    async def fetch(
        cls, seq: int, timeout: Optional[float]
    ) -> Dict[str, Any]:
        future = asyncio.get_event_loop().create_future()
        cls._futures[seq] = future
        try:
            return await asyncio.wait_for(future, timeout)
        except asyncio.TimeoutError:
            raise
        finally:
            del cls._futures[seq]
```

### static vars
-     _seq = 1
-     _futures: Dict[int, asyncio.Future] = {}
## 下一步

<div align="right">
    在这里~ ↘
</div>
