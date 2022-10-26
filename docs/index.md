# Ayaka - 文字游戏开发辅助插件

适用于[nonebot2机器人](https://github.com/nonebot/nonebot2)的文字游戏开发辅助插件 

<img src="https://img.shields.io/badge/python-3.8%2B-blue">

ayaka 通过二次封装nonebot2提供的api，提供专用api，便于其他文字游戏插件（ayaka衍生插件）的编写

单独安装ayaka插件没有意义，ayaka插件的意义在于帮助ayaka衍生插件实现功能

## 已有的ayaka衍生插件

- [衍生插件示例库](https://github.com/bridgeL/ayaka_plugins)
- [小游戏合集仓库](https://github.com/bridgeL/nonebot-plugin-ayaka-games)

## 安装

1. 修改nonebot工作目录下的`pyproject.toml`文件，将`python = "^3.7.3"`修改为`python = "^3.8.0"`
2. `poetry add nonebot-plugin-ayaka` 
3. `poetry run playwright install chromium`
4. `bot.py`无需修改，只要在ayaka衍生插件里正常导入就行：`from ayaka import AyakaApp`

**ayaka衍生插件需要nonebot来加载**

如果没有用到无头浏览器截图的功能，可忽略`poetry run playwright install chromium`

## 配置

推荐配置（非强制要求）
```
COMMAND_START=["#"]
COMMAND_SEP=[" "]
```

## 未来计划

1. 更新关于`app.plugin_storage`和`app.group_storage`的帮助
2. 提供aiosqlite数据库支持（或许？
3. 考虑拆散帮助的设置方式，针对每条命令回调、消息回调设置帮助，而不是像现在编写一个总体的帮助


## 下一步

<div align="right">
    在这里~ ↘
</div>
