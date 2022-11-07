// 当使用mike切换版本时，保持链接位置不变，不要跳转到根路径
// 目前该问题仍未被官方修复 https://github.com/jimporter/mike/issues/81
(window.onload = function () {
  // 删除首尾 分割符
  var pathname = window.location.pathname.replace(/^\//, "");
  pathname = pathname.slice(pathname.indexOf("/") + 1);

  setInterval(function () {
    // 找到所有链接，修改其链接地址
    var items = document.querySelectorAll('.md-version__link:not(.changed)');
    for (var item of items) {
      item.href += pathname;
      item.className += " changed";
      console.log(item.innerHTML, "修改成功");
    }
  }, 100);
})();