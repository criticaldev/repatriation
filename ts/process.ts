id("navButton").onclick = () => {
  classes("navigation")[0].classList.toggle("active");
};

tags("nav")[0].onclick = (e) => {
  e.stopPropagation();
};
window.onclick = () => {
  classes("navigation")[0].classList.remove("active");
};

window.onscroll = () => {
  if (window.scrollY > 50) tags("nav")[0].classList.add("active");
  else tags("nav")[0].classList.remove("active");
};
