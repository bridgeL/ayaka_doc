window.onload = function () {
    const frame = document.querySelector("#fake-qq");
    if (!frame) return;

    // 屏幕
    const screen = frame.querySelector(".screen");
    const add_message = function (text, color) {
        let el = document.createElement("div");
        el.className = "message";
        el.innerHTML = text;
        el.style.color = color;
        screen.appendChild(el);
        screen.scrollTop = screen.scrollHeight;
    };


    // 核心逻辑
    const HELLO_WORLD = {
        open: false,
        state: "",
        separate: function (cmd) {
            if (!cmd || cmd[0] != "#") return;
            cmd = cmd + " ";
            let items = cmd.slice(1).split(" ", 2);
            return items;
        },
        send: function (text) {
            text.split("\n").forEach(t => add_message(t, "#fff"));
        },
        deal: function (cmd) {
            // 注意，这里代码是乱写的，只为了快速实现效果，但是逻辑不一定对
            let arg;
            [cmd, arg] = this.separate(cmd);
            if (cmd == "help") this.deal_help(arg);
            if (cmd == "state") this.deal_state();
            if (cmd == "hi" || cmd == "hello") this.deal_hi();
            if (cmd == "hello") this.deal_hello();
            if (cmd == "hit") this.deal_hit();
            if (cmd == "exit" || cmd == "退出") this.deal_exit();
            if (cmd == "jump") this.deal_jump(arg);
        },
        deal_help: function (arg) {
            if (!this.open) {
                if (arg == "hello") this.send(`第一个示例插件
- hello 打开hello world应用
[*]
- exit/退出 返回到world 或 退出hello world应用
- jump 跳转到指定的星球
[world]
- hi 打个招呼
- hit 给世界来个大比兜
[moon]
- hi 打个招呼
- hit 给月亮来个大比兜
[sun]
- hi 打个招呼
- hit 给太阳来个大比兜
`);
                else if (!arg) {
                    this.send("使用帮助时提供参数可以展示进一步信息");
                    this.send(`[hello]
第一个示例插件
- hello 打开hello world应用
`);
                }
                else this.send(`应用不存在 [${arg}]`);
            }
            else {
                if (this.state == "world") this.send(`- hi 打个招呼
- hit 给世界来个大比兜
- exit/退出 返回到world 或 退出hello world应用
- jump 跳转到指定的星球`);
                else if (this.state == "moon") this.send(`- hi 打个招呼
- hit 给月亮来个大比兜
- exit/退出 返回到world 或 退出hello world应用
- jump 跳转到指定的星球
`);
                else if (this.state == "sun") this.send(`- hi 打个招呼
- hit 给太阳来个大比兜
- exit/退出 返回到world 或 退出hello world应用
- jump 跳转到指定的星球
`);
                else this.send(`- exit/退出 返回到world 或 退出hello world应用
- jump 跳转到指定的星球
`);
            }
        },
        deal_state: function () {
            if (!this.open) this.send("当前设备处于闲置状态");
            else this.send(`正在运行应用 [hello | ${this.state}]`);
        },
        deal_hello: function () {
            if (!this.open) {
                this.open = true;
                this.state = "world";
                this.send("已打开应用 [hello]");
            }
        },
        deal_hi: function () {
            if (!this.open) return;
            if (this.state == "world" || this.state == "moon" || this.state == "sun") this.send(`hello, ${this.state}!`);
        },
        deal_hit: function () {
            if (!this.open) return;
            if (this.state == "world") this.send("earthquake");
            if (this.state == "moon") this.send("moon fall");
            if (this.state == "sun") this.send("big bang!");
        },
        deal_exit: function () {
            if (!this.open) return;
            if (this.state != "world") this.deal_jump("world");
            else {
                this.open = false;
                this.send("已关闭应用 [hello]");
            }
        },
        deal_jump: function (arg) {
            this.send(`跳转到 ${arg}`);
            this.state = arg;
        },
    };



    // 输入框
    const input = frame.querySelector("input");
    const input_check = function () {
        if (!input.value) input.value = "#";
        else if (input.value[0] != "#") input.value = "#" + input.value;
    };
    const input_send = function (e) {
        if (e.key == "Enter") {
            let cmd = input.value;
            add_message(cmd, "#0f0");
            setTimeout(function () { HELLO_WORLD.deal(cmd); }, 300);
            input.value = "#";
        }
    };
    const input_blur = function () {
        if (input.value == "#") input.value = "";
    };
    input.addEventListener("click", input_check);
    input.addEventListener("keyup", input_send);
    input.addEventListener("blur", input_blur);

    // 快捷输入
    const cmd_list = frame.querySelector(".command-list");
    const cmds = ["#help", "#help hello", "#state", "#hello",
        "#hi", "#hit", "#exit", "#退出", "#jump world", "#jump moon",
        "#jump sun", "#jump mars"];
    cmds.forEach(cmd => {
        let el = document.createElement("div");
        el.className = "command";
        el.innerHTML = cmd;
        const cmd_input = function () {
            input.value = cmd;
            input.focus();
        };
        el.addEventListener("click", cmd_input);
        cmd_list.appendChild(el);
    });
};
