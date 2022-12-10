(function () {
    const div_lines = (demo) => {
        demo = demo.replace(/.*"user" 说：/g, `<span class="demo-user">user</span>`);
        demo = demo.replace(/.*"Bot" 说：/g, `<span class="demo-bot">Bot</span>`);
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
