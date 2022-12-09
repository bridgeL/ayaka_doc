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

const demo3 = `<<< "user" 说：travel
>>>  "Bot" 说：已打开应用 [星际旅行]
<<< "user" 说：move 太阳
>>>  "Bot" 说：前往 太阳
<<< "user" 说：watch
>>>  "Bot" 说：先去售票处买票！
<<< "user" 说：move 太阳.售票处
>>>  "Bot" 说：前往 太阳.售票处
<<< "user" 说：buy
>>>  "Bot" 说：耀斑表演门票+1
<<< "user" 说：watch
>>>  "Bot" 说：10分甚至9分的好看
<<< "user" 说：watch
>>>  "Bot" 说：先去售票处买票！
<<< "user" 说：exit
>>>  "Bot" 说：已关闭应用 [星际旅行]`;

const demo4 = `<<< "user" 说：travel
>>>  "Bot" 说：已打开应用 [星际旅行]
<<< "user" 说：move 太阳
>>>  "Bot" 说：前往 太阳
<<< "user" 说：hi
>>>  "Bot" 说：hi I'm in ['太阳']
<<< "user" 说：move 太阳.奶茶店
>>>  "Bot" 说：前往 太阳.奶茶店
<<< "user" 说：嗯？
>>>  "Bot" 说：你发现这里只卖热饮
<<< "user" 说：hi
>>>  "Bot" 说：hi I'm in ['太阳', '奶茶店']
<<< "user" 说：exit
>>>  "Bot" 说：已关闭应用 [星际旅行]`;

const demo5 = `<<< "user" 说：help 星际旅行
>>>  "Bot" 说：[星际旅行]
xing ji lv xing
- 星际旅行/travel | 打开应用

[星际旅行]
- 退出/exit 
- move <where> | 移动
    <where> 你要去的地方
- hi | 打招呼
[星际旅行.地球]
- drink | 喝水
[星际旅行.月球]
- drink | 喝土
[星际旅行.太阳]
- drink | 喝太阳风
- watch/看表演 | 看表演
[星际旅行.太阳.奶茶店]
- drink | 喝奶茶
- * | 令人震惊的事实
[星际旅行.太阳.售票处]
- buy/买票 | 买门票
<<< "user" 说：travel
>>>  "Bot" 说：已打开应用 [星际旅行]
<<< "user" 说：help
>>>  "Bot" 说：[root.星际旅行]
- 退出/exit 
- move <where> | 移动
    <where> 你要去的地方
- hi | 打招呼
[root]
xing ji lv xing
- 星际旅行/travel | 打开应用
<<< "user" 说：move 太阳.奶茶店
>>>  "Bot" 说：前往 太阳.奶茶店
<<< "user" 说：help
>>>  "Bot" 说：[root.星际旅行.太阳.奶茶店]
- drink | 喝奶茶
- * | 令人震惊的事实
[root.星际旅行.太阳]
- drink | 喝太阳风
- watch/看表演 | 看表演
[root.星际旅行]
- 退出/exit 
- move <where> | 移动
    <where> 你要去的地方
- hi | 打招呼
[root]
xing ji lv xing
- 星际旅行/travel | 打开应用
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
    "demo3": div_lines(demo3),
    "demo4": div_lines(demo4),
    "demo5": div_lines(demo5),
};


let timer = setInterval(() => {
    let divs = document.querySelectorAll(".demo");
    if (divs) {
        for (let div of divs) {
            let lines = total_lines[div.id];
            for (let line of lines) div.innerHTML += `<div class="demo-line">${line}</div>`;
        }
        clearInterval(timer);
    }
}, 100)

