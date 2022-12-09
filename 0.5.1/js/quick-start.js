const total_lines = {
    "demo1": `<<< [user] 说：travel
    >>> [ Bot] 说：已打开应用 [星际旅行]
    <<< [user] 说：hi
    >>> [ Bot] 说：hi I'm in []
    <<< [user] 说：move 地球
    >>> [ Bot] 说：前往 地球
    <<< [user] 说：hi
    >>> [ Bot] 说：hi I'm in ['地球']
    <<< [user] 说：drink
    >>> [ Bot] 说：喝水
    <<< [user] 说：move 月球
    >>> [ Bot] 说：前往 月球
    <<< [user] 说：drink
    >>> [ Bot] 说：喝土
    <<< [user] 说：move 太阳
    >>> [ Bot] 说：前往 太阳
    <<< [user] 说：drink
    >>> [ Bot] 说：喝太阳风
    <<< [user] 说：hi
    >>> [ Bot] 说：hi I'm in ['太阳']
    <<< [user] 说：exit
    >>> [ Bot] 说：已关闭应用 [星际旅行]`.split("\n")
};

const show_demo = (id) => {
    let div = document.querySelector(`#${id}`);
    div.innerHTML = "";
    let i = 0;
    let lines = total_lines[id];
    let timer = setInterval(() => {
        if (i >= lines.length) clearInterval(timer);
        else {
            div.innerHTML += `<div class="demo-line">${lines[i]}</div>`;
            i += 1;
        }
    }, 1000);
};

let tiemr = setInterval(() => {
    let divs = document.querySelectorAll(".demo");
    if (divs) {
        for (let div of divs) div.onClick = show_demo(div.id);
        clearInterval(tiemr);
    }
}, 1000)

