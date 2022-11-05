## 安装

修改nonebot工作目录下的`pyproject.toml`文件
   
将`python = "^3.7.3"`修改为`python = "^3.8"`（或者更高版本）

```
poetry add nonebot-plugin-ayaka
poetry run playwright install chromium
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

