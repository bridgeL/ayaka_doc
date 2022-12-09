const demo1 = `<<< "user" 说：travel
>>>  "Bot" 说：已打开应用 [星际旅行]
<<< "user" 说：hi
>>>  "Bot" 说：hi I'm in []
<<< "user" 说：move 地球
>>>  "Bot" 说：前往 地球
<<< "user" 说：hi
>>>  "Bot" 说：hi I'm in ['地球']
<<< "user" 说：drink
>>>  "Bot" 说：喝水
<<< "user" 说：move 月球
>>>  "Bot" 说：前往 月球
<<< "user" 说：drink
>>>  "Bot" 说：喝土
<<< "user" 说：move 太阳
>>>  "Bot" 说：前往 太阳
<<< "user" 说：drink
>>>  "Bot" 说：喝太阳风
<<< "user" 说：hi
>>>  "Bot" 说：hi I'm in ['太阳']
<<< "user" 说：exit
>>>  "Bot" 说：已关闭应用 [星际旅行]
`;

const demo2 = `<<< "user" 说：travel
>>>  "Bot" 说：已打开应用 [星际旅行]
<<< "user" 说：move 太阳
>>>  "Bot" 说：前往 太阳
<<< "user" 说：drink
>>>  "Bot" 说：喝太阳风
<<< "user" 说：move 太阳.森林公园
>>>  "Bot" 说：前往 太阳.森林公园
<<< "user" 说：drink
>>>  "Bot" 说：喝太阳风
<<< "user" 说：move 太阳.奶茶店
>>>  "Bot" 说：前往 太阳.奶茶店
<<< "user" 说：drink
>>>  "Bot" 说：喝了一口3000度的奶茶
<<< "user" 说：hi
>>>  "Bot" 说：hi I'm in ['太阳', '奶茶店']
<<< "user" 说：exit
>>>  "Bot" 说：已关闭应用 [星际旅行]`;

const div_lines = (demo) => {
    demo = demo.replaceAll(`<<< "user" 说：`, `<span class="demo-user">user</span>`);
    demo = demo.replaceAll(`>>>  "Bot" 说：`, `<span class="demo-bot">Bot</span>`);
    demo = demo.split("\n");
    return demo;
};

const total_lines = {
    "demo1": div_lines(demo1),
    "demo2": div_lines(demo2),
};

const add_demo = (e, id) => {
    e.preventDefault();
    let div = document.querySelector(`#${id}`);
    let i = 0;
    let lines = total_lines[id];
    div.innerHTML += `<div class="demo-line">${lines[i]}</div>`;
    div.scrollTo(0, 10000);
    i += 1;
};

const sub_demo = (e, id) => {
    e.preventDefault();
    console.log("reoght");
};

let timer = setInterval(() => {
    let divs = document.querySelectorAll(".demo");
    if (divs) {
        for (let div of divs) {
            div.onclick = (e) => add_demo(e, div.id);
            div.oncontextmenu = (e) => sub_demo(e, div.id);
            div.innerHTML = `<div class="demo-line">点击查看示例</div>`;
            div.i = 0;
        }
        clearInterval(timer);
    }
}, 100)

