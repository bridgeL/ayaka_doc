## 安装

`nb plugin install nonebot-plugin-ayaka-games`

## 配置

修改配置后需要**重启bot**才生效！

### 接龙配置（可选）

位置`data\ayaka\接龙.json`

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

### 签到配置（可选）

位置`data/ayaka/签到.json`

```json
{
    // 签到奖励金额
    "reward_money": 10000
}
```

### 谁是卧底配置（可选）

位置`data\ayaka\谁是卧底.json`

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

## 使用示例

启动bot后，发送指令

<div class="demo">

"user" 说：#24点
"Bot" 说：已打开应用 [24点]
"Bot" 说：[24点]
- 退出/exit/quit | 关闭应用
- 出题/下一题/next 
- 题目/查看题目/查看当前题目/当前题目/question 
- 答案/answer 
- &lt;任意文字> | 请使用正确的表达式，例如 (1+2)*(3+3)
"Bot" 说：3 8 8 9

TIPS：本题至少有4种答案（使用不同的运算符）
"user" 说：3*(9-8/8)
"Bot" 说：3*(9-(8/8)) = 24.0
正确！
"Bot" 说：奖励1000金
"user" 说：#exit
"Bot" 说：已关闭应用 [24点]

</div>

也有一些应用无需发送指令

<div class="demo">

"user" 说：安步当车
"Bot" 说：车载斗量
"user" 说：梁上君子
"Bot" 说：[测试1号] 接龙成功！奖励1000金
"Bot" 说：孳孳矻矻
"user" 说：孳孳矻矻
"Bot" 说：枯蓬断草

</div>

## 下一步

<div align="right">
    在这里~ ↘
</div>

