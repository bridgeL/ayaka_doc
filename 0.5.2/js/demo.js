(function () {
    const div_lines = (demo) => {
        demo = demo.replaceAll(`<<< "user" 说：`, `<span class="demo-user">user</span>`);
        demo = demo.replaceAll(`>>>  "Bot" 说：`, `<span class="demo-bot">Bot</span>`);
        demo = demo.split("\n");
        return demo;
    };

    let timer = setInterval(() => {
        let divs = document.querySelectorAll(".demo");
        if (divs) {
            for (let div of divs) {
                console.log(div.innerHTML);
                let lines = div_lines(div.innerHTML);
                div.innerHTML = "";
                for (let line of lines) div.innerHTML += `<div class="demo-line">${line}</div>`;
            }
            clearInterval(timer);
        }
    }, 100);
})();
