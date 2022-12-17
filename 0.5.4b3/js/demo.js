(function () {
    const user_regex = new RegExp(/"user" 说：/);
    const bot_regex = new RegExp(/"Bot" 说：/);
    const sys_regex = new RegExp(/"sys" 说：/);
    const cmd_regex = new RegExp(/(#.*?) /);


    const div_lines = (demo) => {
        demo = user_regex.replace(demo, `<span class="demo-user">user</span>`);
        demo = bot_regex.replace(demo, `<span class="demo-bot">Bot</span>`);
        demo = sys_regex.replace(demo, `<span class="demo-sys">系统</span>`);
        demo = cmd_regex.replace(demo, /<span class="demo-cmd">\1<\/span>/);
        return demo.split("\n");
    };

    let timer = setInterval(() => {
        let divs = document.querySelectorAll(".demo");
        if (divs) {
            for (let div of divs) {
                let lines = div_lines(div.innerHTML);
                div.innerHTML = "";
                for (let line of lines) div.innerHTML += `<div class="demo-line">${line}</div>`;
            }
            clearInterval(timer);
        }
    }, 100);
})();
