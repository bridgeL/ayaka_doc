## app.intro
获取介绍，也就是init状态下的帮助

## app.help
获取当前状态下的帮助，没有找到则返回介绍

## app.all_help
获取介绍以及全部状态下的帮助

## app.valid
当前app是否被当前群组启用

**timer触发时不可用**

## app.state
应用|群组当前状态

**timer触发时不可用**

## app.cache
当前群组、当前app的独立数据空间

**timer触发时不可用**

## app.user_name
当前消息的发送人的群名片或昵称

**timer触发时不可用**

## app.user_id
当前消息的发送人的uid

**timer触发时不可用**

## app.bot
当前bot

**timer触发时不可用**

## app.event
当前消息

**timer触发时不可用**

## app.group_id
当前群组的id

注：若群聊A正监听私聊B，当私聊B发送消息触发插件回调时，该属性仍可正确返回群聊A的id

**timer触发时不可用**

## app.bot_id
当前bot的id

**timer触发时不可用**

## app.group
当前群组

注：若群聊A正监听私聊B，当私聊B发送消息触发插件回调时，该属性仍可正确返回群聊A

**timer触发时不可用**

## app.arg
当前消息在移除了命令后的剩余部分

**timer触发时不可用**

## app.args
当前消息在移除了命令后，剩余部分按照空格（或自定义分割符）分割后的数组

注：除了文字消息外，其他消息类型将自动分割，例如一串qq表情会被分割为多个元素

**timer触发时不可用**

## app.cmd
当前消息的命令头

**timer触发时不可用**

## app.message
当前消息

**timer触发时不可用**

## 下一步

<div align="right">
    在这里~ ↘
</div>

