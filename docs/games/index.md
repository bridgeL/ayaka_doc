## 基础功能
1. 背包
2. 签到

## 小游戏列表
1. 印加宝藏 [@灯夜](https://github.com/lunexnocty/Meiri)
2. 接龙（多题库可选，原神/成语）
3. bingo
4. 谁是卧底
5. 抢30
6. mana
7. 加一秒

## How to start

### 安装 ayaka

安装基础插件

https://github.com/bridgeL/nonebot-plugin-ayaka

### 安装 本插件

安装本插件

`poetry add nonebot-plugin-ayaka-games`

修改nonebot2  `bot.py` 

```python
# 导入ayaka_games插件
nonebot.load_plugin("ayaka_games")
```

### 导入数据

将[仓库](https://github.com/bridgeL/nonebot-plugin-ayaka-games)里的data文件夹，放到nonebot的工作目录下

之后运行nonebot即可
