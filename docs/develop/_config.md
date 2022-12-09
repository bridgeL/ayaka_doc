
所有ayaka衍生插件均可申请读写`ayaka_setting.json`中的配置，使用示例如下

```py
from ayaka import AyakaApp
app = AyakaApp("示例插件")

class Config(app.BaseConfig):
    name:str = "测试"

config = Config()
# 读取配置 
print(config.name)
# 修改并写入配置 
config.name = "新名字"
```

对应配置文件`ayaka_setting.json`

```json
{
    ...
    "示例插件": {
        "name": "新名字"
    }
    ...
}
```

特殊情况：修改数组、字典等**可变对象**的值

```py
from ayaka import AyakaApp
from typing import List
app = AyakaApp("示例插件")

class Config(app.BaseConfig):
    uids:List[int] = []

config = Config()
# 读取配置 
print(config.uids)
# 修改配置 
config.uids.append(1)
# 写入配置
config.force_update()
```

对应配置文件`ayaka_setting.json`

```json
{
    ...
    "示例插件": {
        "uids": [1]
    }
    ...
}
```

