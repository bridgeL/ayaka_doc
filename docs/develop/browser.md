## 配置

打开`data/ayaka/ayaka_setting.json`，修改其中的`__root__/use_playwright`的值为`True`

如果你在windows下使用插件，请关闭`fastapi_reload`

## get_new_page(width,  **kwargs)
获取playwright Page对象
 
- width 设置屏幕宽度
- high_quality 设置图片质量为高

使用示例：
```
await with get_new_page(width=200, high_quality=True) as p:
    await p.goto(...)
    await p.screenshot(...)
```

## 下一步

<div align="right">
    在这里~ ↘
</div>
