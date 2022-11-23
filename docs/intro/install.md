## 安装

```
nb plugin install nonebot-plugin-ayaka
playwright install chromium
``` 

至此安装完成，可以开发ayaka衍生插件了

## 注意

- 如果没有用到无头浏览器截图的功能，可忽略`playwright install`
- 不需要特意在`bot.py`中加载ayaka插件，只要正常加载ayaka衍生插件即可
- ayaka衍生插件中也只需正常导入ayaka就行 `from ayaka import AyakaApp`


## 配置

推荐配置（非强制要求）
```
COMMAND_START=["#"]
COMMAND_SEP=[" "]
```

## 下一步

<div align="right">
    在这里~ ↘
</div>

