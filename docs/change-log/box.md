进入box时代

## 1.0.0 （临时过渡）

闲聊

- 坏消息：app消失了，旧API大幅更换
- 不那么坏的消息：这次注释写的很规范
- 好消息：这次不再是所有ayaka衍生插件共用一个nb的matcher了，而是各个命令对应到各自的matcher上，设计上也更加宽松，可以在沿用nb的代码风格上非侵入的使用ayaka来实现状态机

更新一览

- 暂时保留：保留了0.5.5版本中自定义的sql orm模型类 AyakaDB，预计1.1.0+版本后抛弃该设计，转而使用sqlmodel
- 移除：ayaka_master被移除
- 移除：ayaka_root_config的绝大部分配置都被删除，现在ayaka使用nb配置中的命令前缀和分割符
- 移除：AyakaInput、AyakaCache、AyakaLargeConfig、AyakaDepend
- 移除：不再有复杂的多层状态，现在，任意状态都分布在同一层；不再有唯一状态树，也不再有on_enter、on_exit等设计，也不再有deep和上溯查找
- 移除：注册定时回答的方法，未来暂无重新添加回来的打算
- 修改：AyakaConfig现在都对应独立的配置文件，其地址位于`data/ayaka/<config_name>.json`
- 新特性：新增box.get_data方法作为AyakaCache的替代品
- 新特性：重新设计实现了0.5.5版本的帮助、查看状态功能
- 新特性：on_immediate，当ayaka进入该状态后，将会立刻执行该状态下注册的回调函数
- 修复BUG：非命令触发时，box.arg无法正确获取消息
- 修复BUG: sql无法正确提交数据

## 1.0.1

- 新特性：allow_same，允许重名，将返回先前的重名的box
- 新特性：新增ayaka.lazy模块，懒人包一键导入各个类和方法
- 新特性：新增ayaka.master模块，将帮助、查看状态功能整合进 盒子管理器
- 新特性：box.matcher_state属性
- 新特性：box.help属性
- 新特性: box.send_help方法
- 新特性: box.get_data方法
- 新特性: box.get_arbitrary_data方法
- 新特性: 关闭恼人的duplicated warning提示
- 新特性: 新增slow_load_config装饰器
- 新特性：AyakaFunc，极大提高插件加载速度
- 移除：移除了box.create_cmd_matcher、box.create_text_matcher、box.reset_state
- 移除：删除了类型提示不佳的StrOrMsgList类，不影响box.args的使用
- 修改：重命名box.add_help方法为_add_help（不允许外部使用
- 修改：修改了初始状态，现在应用启动后的默认状态是idle，而不再是menu；取消了应用未运行时的状态，此时状态无意义
- 修改：修改了box.rule、box.on_cmd、box.on_text、box.set_start_cmds、box.set_close_cmds的API
- 修改：一些ayaka.extension中的有益方法被迁移至ayaka.helper模块中
- 修复BUG: cached无法正常使用
- 优化代码结构，完善注释

