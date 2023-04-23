"use strict";
id("navButton").onclick = function () {
    classes("navigation")[0].classList.toggle("active");
};
tags("nav")[0].onclick = function (e) {
    e.stopPropagation();
};
window.onclick = function () {
    classes("navigation")[0].classList.remove("active");
};
window.onscroll = function () {
    if (window.scrollY > 50)
        tags("nav")[0].classList.add("active");
    else
        tags("nav")[0].classList.remove("active");
};
