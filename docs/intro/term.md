## 无状态应用

例如，计算器

对于该应用而言，用户之前说了什么都无所谓，它只需要计算用户当前输入的字符串即可

换言之，无论用户曾经下达过什么指令，都不会影响到该应用的状态，它是永恒不变的，即无状态应用

无状态应用在注册回调时，只使用`app.on.idle`

## 有状态应用 

[星际旅行](quick_start.md#_2)就是一个典型的例子

有状态应用在注册回调时，既需要使用`app.on.idle`（用来打开应用），也需要使用`app.on.state`

## 应用启用/禁用

该应用（不管是`无状态应用`还是`有状态应用`）的指令是否可以响应

比如禁用了`星际旅行`应用后，用户发送`星际旅行`时，bot将不会触发回调

## 应用运行/关闭 

是指`有状态应用`是否正在运行

比如当前群聊并没有运行应用时，用户发送`星际旅行`，bot将运行`星际旅行`应用

## 单一应用原则

一个群聊同一时间只能运行一个`有状态应用`，避免过于混乱的情形，如果想要运行另一个应用，请先关闭当前的应用

`无状态应用`没有运行和关闭的概念，因为用户发完指令，bot立刻回应，且无需存储、改变自身状态


## 下一步

<div align="right">
    在这里~ ↘
</div>
