# 如何测试ayaka衍生插件

开发结束后自然是测试啦

您可以尝试使用ayaka_test衍生套件，它不需要连接真实qq账号的cqhttp，它提供一个简单的假cqhttp来响应nonebot的请求

目前的假cqhttp只提供了

- send_group_msg
- send_group_forward_msg
- send_private_msg
- get_group_member_list
- get_friend_list

其他功能可以自行编写代码对ayaka_test进行增强！

已给出两个钩子函数供拓展使用

## 使用方法

下载本套件 `git clone https://github.com/bridgeL/ayaka_test`

将待测试的ayaka衍生插件放入plugins目录下

安装依赖 `pip install -r requirements.txt`

运行入口 `python bot.py`

## 效果

<img src="../5.gif">

退出时直接 CTRL+C

请无视报错（

## 命令

| 命令                             | 功能                         |
| -------------------------------- | ---------------------------- |
| g \<group_id> \<user_id> \<text> | 发送群聊消息                 |
| p \<user_id> \<text>             | 发送私聊消息                 |
| d 1                              | 延时1秒                      |
| n                                | 空一行（用来区分不同对话段） |
| s test                           | 执行test.ini自动化脚本       |

ayaka_test将从当前工作目录和`data/scripts`两个路径寻找指定名称的自动化脚本

## 自动化脚本可用的额外命令
| 命令          | 功能                             |
| ------------- | -------------------------------- |
| hide cmd      | 关闭命令回显                     |
| after \<cmd>  | 所有命令执行后需额外执行一次命令 |
| before \<cmd> | 所有命令执行前需额外执行一次命令 |
| ;             | 注释（必须放在每一行的开头）     |

## 如何增强ayaka_test

在ayaka_test中，分别给出了两个钩子函数

- `fake_qq.on_terminal` 编写自定义的终端命令
- `fake_qq.on_cqhttp` 编写自定义的cqhttp对nonebot的响应

### 如何编写cqhttp对nonebot的响应

你可以打开ayake_test/sample.py中的采样开关

通过采样真实cqhttp的响应，编写自己的伪cqhttp的响应


## 其他

虽然名义上是ayaka衍生插件的测试套件，然而其与ayaka没多少关系，可以直接拿去当nonebot插件的测试套件

不过，由于只模仿了几条功能，因此更多的还是适用于文字游戏插件的测试


## 下一步

<div align="right">
    在这里~ ↘
</div>

