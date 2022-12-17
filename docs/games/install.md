## 安装

`nb plugin install nonebot-plugin-ayaka-games`

如果缺失nb则请先安装nb-cli `pip install nb-cli`

## 根配置（可选）

ayaka使用单独的配置文件（因为担心和其他插件冲突），位于`data/ayaka`目录下

命令前缀默认为`#`，可以修改`data/ayaka/ayaka_setting.json`文件进行自定义配置

```json
{
    "__root__": {
        // 可修改为空字符串，或你习惯的其他前缀
        "prefix": "#", 
        // ...
    }
    // ...
}
```

## 接龙配置（可选）

位置`data\ayaka\separate\接龙.json`

可以自行添加你想要的词汇，格式如下

```json
{   
    // 接龙成功的奖励金额
    "reward": 1000,
    // 多个接龙词库
    "dragon_list": [
        {   
            // 词库名称（不要重复
            "name": "成语",
            // 词库内容
            "words": [
                //...
            ]
        }
        //...
    ]
}
```

## 签到配置（可选）

位置`data/ayaka/ayaka_setting.json`

```json
{
    "签到": {
        // 签到奖励金额
        "reward_money": 10000
    }
    // ...
}
```

## 谁是卧底配置（可选）

位置`data\ayaka\separate\谁是卧底.json`

可以自行添加你想要的词汇，格式如下

```json
{   
    "data": [
        [
            // 普通人
            "镜子",
            // 卧底
            "玻璃"
        ],
        //...
    ]
}
```

## 下一步

<div align="right">
    在这里~ ↘
</div>

