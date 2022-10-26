# 术语

## ayaka 衍生插件

基于ayaka开发的插件，依赖于ayaka和nonebot运行

## ayaka 内置插件

ayaka内部已安装一份特殊的综合管理插件，它基于ayaka插件而实现

命令一览：

- 启用/permit
- 禁用/forbid
- 插件/plugin
- 状态/state
- 帮助/help

所有ayaka衍生插件只需要编写app.help，就可以在用户输入 `#help <插件名>` 后获取该插件的帮助

## 无状态应用

例如，简单复读应用

对于该应用而言，用户之前说了什么都无所谓，它只需要复读用户当前正在说的这句

换言之，无论用户曾经下达过什么指令，都不会影响到该应用的状态，它是永恒不变的，即无状态应用

无状态应用在注册回调时，使用`app.on_command`和`app.on_text`即可

## 有状态应用 

例如，代码速看中的[hello-world](https://github.com/bridgeL/ayaka_plugins/blob/master/hello_world.py)应用

用户发送hi指令时，应用需要根据自身的状态（earth/moon/sun）给出不同的响应，因此它是有状态应用

有状态应用在注册回调时，需要使用`app.on_state_command`和`app.on_state_text`

## 应用启用/禁用

该应用（不管是`无状态应用`还是`有状态应用`）的指令是否可以响应

比如禁用了hello-world应用后，当你发送`hw`时，bot将不会触发回调

## 应用运行/关闭 

是指`有状态应用`是否正在运行

比如当前群聊并没有运行应用时，你发送`hw`，bot将运行hello-world应用

## 单一应用原则

一个群聊同一时间只能运行一个`有状态应用`，避免过于混乱的情形，如果想要运行另一个应用，请先关闭当前的应用

`无状态应用`没有运行和关闭的概念，你发完指令，它立刻就会回应你

## 闲置

在没有任何应用运行时，群聊处于闲置状态，此时注册的所有`on_command`和`on_text`回调都可以响应，而`on_state_command`和`on_state_text`则无法响应，因为它们都依赖于相关应用的状态，而闲置时没有应用运行

运行应用后，注册在对应应用下的`on_state_command`和`on_state_text`回调可以响应，而普通的`on_command`和`on_text`无法响应，但对于设置了`super=True`的特殊的`on_command`和`on_text`仍可以响应

这种设计可以帮助一些有特殊需要的`无状态应用`在`有状态应用`运行时仍可响应用户的指令

## 下一步

<div align="right">
    在这里~ ↘
</div>
