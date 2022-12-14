# box - 正在使用

- 坏消息：app消失了，旧API大幅更换
- 不那么坏的消息：这次注释写的很规范
- 好消息：这次不再是所有ayaka衍生插件共用一个nb的matcher了，而是各个命令对应到各自的matcher上，设计上也更加宽松，可以在沿用nb的代码风格上使用ayaka来实现状态机

## 1.0.0 （临时过渡）

- 新特性：新增box.get_data方法作为AyakaCache的替代品
- 新特性：重新设计实现了0.5.5版本的帮助、查看状态功能
- 新特性：on_immediate，当ayaka进入该状态后，将会立刻执行该状态下注册的回调函数
- 变更：AyakaConfig现在都对应独立的配置文件，其地址位于`data/ayaka/<config_name>.json`
- 暂时保留：保留了0.5.5版本中自定义的sql orm模型类 AyakaDB，预计1.1.0+版本后抛弃该设计，转而使用sqlmodel
- 移除：ayaka_master被移除
- 移除：ayaka_root_config的绝大部分配置都被删除，现在ayaka使用nb配置中的命令前缀和分割符
- 移除：AyakaInput、AyakaCache、AyakaLargeConfig、AyakaDepend
- 移除：不再有复杂的多层状态，现在，任意状态都分布在同一层；不再有唯一状态树，也不再有on_enter、on_exit等设计，也不再有deep和上溯查找
- 移除：注册定时回答的方法，未来暂无重新添加回来的打算
- 修复BUG：非命令触发时，box.arg无法正确获取消息
- 修复BUG：sql无法正确提交数据

## 1.0.1

- 新特性：allow_same，允许重名，将返回先前的重名的box
- 新特性：新增ayaka.lazy模块，懒人包一键导入各个类和方法
- 新特性：新增ayaka.master模块，将帮助、查看状态功能整合进 盒子管理器
- 新特性：box.matcher_state属性
- 新特性：box.help属性
- 新特性：box.send_help方法
- 新特性：box.get_data方法
- 新特性：box.get_arbitrary_data方法
- 新特性：关闭恼人的duplicated warning提示
- 新特性：新增slow_load_config装饰器
- 新特性：AyakaFunc，极大提高插件加载速度
- 新特性：现在box可以设置默认priority；通过box注册的所有matcher都沿用该priority；特别的，on_message matcher使用priority+1
- 新特性：现在nb能正确显示matcher的module_name了，而不再是ayaka.box
- 新特性：新增load_cwd_plugins方法
- 新特性：ayaka现在仅仅临时关闭Duplicated prefix rule warning，在ayaka插件加载完毕后恢复该警告提示
- 变更：修改了盒子管理器中，盒子帮助命令的表现
- 变更：重命名box.add_help方法为_add_help（不允许外部使用
- 变更：修改了初始状态，现在应用启动后的默认状态是idle，而不再是menu；取消了应用未运行时的状态，此时状态无意义
- 变更：修改了box.rule、box.on_cmd、box.on_text、box.set_start_cmds、box.set_close_cmds的API
- 变更：一些ayaka.extension中的有益方法被迁移至ayaka.helper模块中
- 移除：移除了box.create_cmd_matcher、box.create_text_matcher、box.reset_state
- 移除：删除了类型提示不佳的StrOrMsgList类，不影响box.args的使用
- 修复BUG：cached无法正常使用
- 优化代码结构，完善注释

## 1.0.2 

- 新特性：box.group_event计算属性
- 新特性：safe_open_file方法
- 新特性：WatcherAdapter类，用来监听nb与gocq的对话，为设计下一版ayaka_test做准备
- 新特性：cached现在可以装饰异步方法
- 变更：大幅修改了AyakaGroup、box.state、box.cache、box.rule、set_state、start、close的实现原理（不影响使用
- 变更：AyakaFunc更名为AyakaDelayMatcher
- 变更：box.event现在返回消息事件，而非群聊消息事件
- 变更：担心对logger的过多干涉会对其他插件造成影响，因此不再屏蔽Duplicated prefix rule warning，转而发送提示，告知用户这是正常的
- 变更：box.set_start_cmds的指令将自动发送帮助
- 用语变更：应用 全部替换为 盒子
- 移除：移除了load_cwd_plugins方法
- 移除：移除了ayaka.log模块
- 移除：删除box.all_help，现在使用box.help替代曾经的box.all_help
- 修复BUG：box.arg对on_message注册的回调错误删除命令的问题
- 优化代码注释

## 1.0.3

- 破坏性变更：set_state变为同步方法
- 破坏性变更：删除了on_immediate装饰器，它们令代码复杂难懂
- 新特性：盒子管理器新增命令，强制退出
- 新特性：box.valid，可以用于控制盒子是否被屏蔽
- 新特性：box.rule添加一个新参数always
- 新特性：新增is_async_callable方法
- 新特性：盒子管理器新增4条指令 盒子列表、全部盒子帮助、屏蔽盒子、取消屏蔽盒子
- 新特性：ayaka.patch模块新增方法hack_on_shutdown
- 新特性：新增类ResInfo、ResItem，新增方法download_url、resource_download、get_file_hash、resource_download_by_res_info用于下载资源
- 变更：修改box.close的实现逻辑，现在不能通过它关闭另一个正在运行的盒子
- 变更：ensure_dir_exists方法现在可以对文件路径使用
- 变更：修改盒子管理器中盒子帮助的表现，现在没有找到对应盒子的时候将发送提示
- 变更：取消盒子屏蔽列表.json，转而保存到根配置中的block_box_dict键下
- 变更：删除了AyakaGroup、get_group、group_list，box.group，转而使用group_dict，新增了box.current_box计算属性
- 变更：删除了func_list、AyakaDelayMatcher，新增AyakaMatcherCreaterUnit、AyakaMatcherCreater
- 移除：删除了safe_open_file方法
- 修复BUG：fastapi启动后，无法再通过ayaka.box.on_xxx创建matcher
- 修复BUG：load_data_from_file有时无法加载txt文件的最后一行数据（若该数据没有换行符
- 优化代码结构
