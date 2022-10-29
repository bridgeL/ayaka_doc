window.onload = function () {
    const frame = document.querySelector("#fake-qq");
    if (!frame) return;

    const help_1 = `第一个示例插件
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
- hit 给太阳来个大比兜`;

    const help_2 = `使用 帮助 <插件名> 可获取详细帮助
[hello]
第一个示例插件
- hello 打开hello world应用`;

    const help_6 = `- exit/退出 返回到world 或 退出hello world应用
- jump 跳转到指定的星球`;

    const help_7 = "- hi 打个招呼";

    const help_3 = `${help_7}
- hit 给世界来个大比兜
${help_6}`;

    const help_4 = `${help_7}
- hit 给月亮来个大比兜
${help_6}`;

    const help_5 = `${help_7}
- hit 给太阳来个大比兜
${help_6}`;


    // 核心逻辑
    const app = {
        state: null,
        triggers: [],
        deal(text) {
            if (!(text && text[0] == "#")) return;
            if (text.indexOf(" ") == -1) text = text + " ";
            let cmd, arg;
            [cmd, arg] = text.slice(1).split(" ", 2);
            this.triggers.some(t => {
                if (t.cmd == cmd && (t.state == this.state || (t.state == "*" && this.state != null))) {
                    t.run(arg);
                    return true;
                }
            });
        },
        start() {
            if (this.state == null) {
                this.state = "init";
                this.send("已打开应用 [hello]");
            }
        },
        close() {
            this.state = null;
            this.send("已关闭应用 [hello]");
        },
        set_state(arg) {
            this.state = arg;
            this.send(`跳转到 ${arg}`);
        },
        on(cmds, states, run) {
            cmds.forEach(cmd => {
                states.forEach(state => {
                    this.triggers.push({ cmd, state, run });
                });
            });
        },
        send(text) {
            text.split("\n").forEach(t => add_message(t, "#fff"));
        }
    };

    app.on(
        ["hello"], [null],
        function () {
            //打开hello world应用
            app.start();
            app.set_state("world");
        }
    );

    app.on(
        ["help"], [null],
        function (arg) {
            if (arg == "hello") app.send(help_1);
            else if (arg == "") app.send(help_2);
            else app.send(`应用不存在 [${arg}]`);
        }
    );

    app.on(
        ["help"], ["*"],
        function () {
            if (app.state == "world") app.send(help_3);
            else if (app.state == "moon") app.send(help_4);
            else if (app.state == "sun") app.send(help_5);
            else app.send(help_6);
        }
    );

    app.on(
        ["state"], ["*"],
        function () {
            app.send(`正在运行应用 [hello | ${app.state}]`);
        }
    );

    app.on(
        ["state"], [null],
        function () {
            app.send("当前设备处于闲置状态");
        }
    );


    app.on(
        ["exit", "退出"], ["*"],
        function () {
            //返回到world 或 退出hello world应用
            if (app.state == "world") {
                app.close();
            } else {
                app.set_state("world");
                app.send("跳转到 world");
            }
        }
    );

    app.on(
        ["hi", "hello"], ["world", "moon", "sun"],
        function () {
            //打个招呼
            app.send(`hello, ${app.state}!`);
        }
    );

    app.on(
        ["hit"], ["world"],
        function () {
            //给世界来个大比兜
            app.send("earthquake");
        }
    );

    app.on(
        ["hit"], ["moon"],
        function () {
            //给月亮来个大比兜
            app.send("moon fall");
        }
    );

    app.on(
        ["hit"], ["sun"],
        function () {
            //给太阳来个大比兜
            app.send("big bang!");
        }
    );

    app.on(
        ["jump"], ["*"],
        function (arg) {
            //跳转到指定的星球
            if (!arg) app.send("没有参数！");
            else app.set_state(arg);
        }
    );

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
            setTimeout(function () { app.deal(cmd); }, 300);
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
