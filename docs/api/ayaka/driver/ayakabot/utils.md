## def bool_to_str
"""转换布尔值为字符串。"""

参数表：

- b: Optional[bool]

```py
def bool_to_str(b: Optional[bool]) -> Optional[str]:
    """转换布尔值为字符串。"""
    return b if b is None else str(b).lower()
```

## def escape
"""
:说明:

对字符串进行 CQ 码转义。

:参数:

* ``s: str``: 需要转义的字符串
* ``escape_comma: bool``: 是否转义逗号（``,``）。
"""

参数表：

- s: str

```py
def escape(s: str, *, escape_comma: bool = True) -> str:
    """
    :说明:

      对字符串进行 CQ 码转义。

    :参数:

      * ``s: str``: 需要转义的字符串
      * ``escape_comma: bool``: 是否转义逗号（``,``）。
    """
    s = s.replace("&", "&amp;").replace("[", "&#91;").replace("]", "&#93;")
    if escape_comma:
        s = s.replace(",", "&#44;")
    return s
```

## def unescape
"""
:说明:

对字符串进行 CQ 码去转义。

:参数:

* ``s: str``: 需要转义的字符串
"""

参数表：

- s: str

```py
def unescape(s: str) -> str:
    """
    :说明:

      对字符串进行 CQ 码去转义。

    :参数:

      * ``s: str``: 需要转义的字符串
    """
    return s.replace("&#44;", ",").replace("&#91;", "[").replace("&#93;", "]").replace("&amp;", "&")
```

## 下一步

<div align="right">
    在这里~ ↘
</div>
