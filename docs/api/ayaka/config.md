## global vars
```py
INIT_STATE = "init"
AYAKA_DEBUG = 0
driver = get_driver()
prefix = getattr(driver.config, "ayaka_prefix", None)
sep = getattr(driver.config, "ayaka_separate", None)
exclude_old = getattr(driver.config, "ayaka_exclude_old", True)
fastapi_reload = getattr(driver.config, "fastapi_reload", True)
running_on_windows = platform.system() == "Windows"
```

## 下一步

<div align="right">
    在这里~ ↘
</div>
