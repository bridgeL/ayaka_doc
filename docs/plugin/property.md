## app.intro
获取介绍，也就是init状态下的帮助

## app.help
获取当前状态下的帮助，没有找到则返回介绍

## app.all_help
获取介绍以及全部状态下的帮助

## app.help = help
设置帮助，若help为str，则设置为介绍，若help为dict，则设置为对应状态的帮助

## app.valid
*timer触发时不可用*

当前app是否被当前群组启用

## app.state
*timer触发时不可用*

应用|群组当前状态

## app.cache
*timer触发时不可用*

当前群组、当前app的独立数据空间

## app.user_name
*timer触发时不可用*

当前消息的发送人的群名片或昵称

## app.user_id
*timer触发时不可用*

当前消息的发送人的uid

## app.bot
*timer触发时不可用*

当前bot

## app.event
*timer触发时不可用*

当前消息

## app.group_id
*timer触发时不可用*

当前群组的id

注：若群聊A正监听私聊B，当私聊B发送消息触发插件回调时，该属性仍可正确返回群聊A的id

## app.bot_id
*timer触发时不可用*

当前bot的id

## app.group
*timer触发时不可用*

当前群组

注：若群聊A正监听私聊B，当私聊B发送消息触发插件回调时，该属性仍可正确返回群聊A

## app.arg
*timer触发时不可用*

当前消息在移除了命令后的剩余部分

## app.args
*timer触发时不可用*

当前消息在移除了命令后，剩余部分按照空格分割后的数组

注：除了文字消息外，其他消息类型将自动分割，例如一串qq表情会被分割为多个元素

## app.cmd
*timer触发时不可用*

当前消息的命令头

## app.message
*timer触发时不可用*

当前消息

## 下一步

<div align="right">
    在这里~ ↘
</div>

