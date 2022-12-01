// 当使用mike切换版本时，保持链接位置不变，不要跳转到根路径
// 目前该问题仍未被官方修复 https://github.com/jimporter/mike/issues/81

function update() {
  var items = document.querySelectorAll('.md-version__link:not(.changed)');
  if (!items.length) return;

  var paths = window.location.pathname.split("/").filter(_ => _).slice(2);
  var route = paths.join("/");

  for (var item of items) {
    item.href += route;
    item.className += " changed";
  }
}

(window.onload = function () {
  setInterval(update, 100);
})();

