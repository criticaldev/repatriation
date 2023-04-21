"use strict";
var id = function (e) {
    return document.getElementById(e);
};
var tags = function (e) {
    return document.getElementsByTagName(e);
};
var classes = function (e) {
    return document.getElementsByClassName(e);
};
id("navButton").onclick = function () {
    classes("navigation")[0].classList.toggle("active");
};
tags("nav")[0].onclick = function (e) {
    e.stopPropagation();
};
// Smooth Scroll to element
var scrollAnchor = Array.from(document.querySelectorAll("button[data-href^='#']"));
scrollAnchor.map(function (anchor) {
    var scrollELementID = anchor.getAttribute("data-href");
    scrollELementID = scrollELementID.substring(1);
    anchor.onclick = function (e) {
        e.preventDefault();
        var scrollElement = id(scrollELementID);
        if (scrollElement) {
            setTimeout(function () {
                window.scrollTo({
                    top: (scrollElement === null || scrollElement === void 0 ? void 0 : scrollElement.offsetTop) - 70,
                    behavior: "smooth",
                });
            }, 300);
        }
    };
});
// Add active class depending on scroll position
function isScrolledIntoView(el) {
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;
    var isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    return isVisible;
}
function scrollActive(elementIDArray) {
    window.onscroll = function () {
        if (window.scrollY > 50)
            tags("nav")[0].classList.add("active");
        else
            tags("nav")[0].classList.remove("active");
        elementIDArray.map(function (elementID) {
            // if (elementIDArray.indexOf(elementID) == 0) return;
            if (window.scrollY >= id(elementID).offsetTop - 200 &&
                window.scrollY <
                    id(elementID).scrollHeight + id(elementID).offsetTop + 100) {
                Array.from(classes("navLI")).map(function (li) {
                    if (li.querySelectorAll("button[data-href='#".concat(elementID, "']"))[0] != null &&
                        li.querySelectorAll("button[data-href='#".concat(elementID, "']"))[0] != undefined) {
                        var p = li.querySelectorAll("button[data-href='#".concat(elementID, "']"))[0];
                        Array.from(classes("navAnchor")).map(function (navAnchor) {
                            if (navAnchor.parentElement.classList.contains("active")) {
                                navAnchor.parentElement.classList.remove("active");
                            }
                        });
                        if (!p.parentElement.classList.contains("active")) {
                            p.parentElement.classList.add("active");
                        }
                    }
                });
            }
        });
    };
}
var scrollActiveChange = true;
var scrollAnchorArray = [];
if (scrollActiveChange) {
    var navAnchors = Array.from(classes("navAnchor"));
    navAnchors.map(function (anchor) {
        var navAnchorToElementID = anchor.getAttribute("data-href");
        navAnchorToElementID = navAnchorToElementID.substring(1);
        scrollAnchorArray.push(navAnchorToElementID);
        scrollActiveChange = false;
    });
}
scrollActive(scrollAnchorArray);
// FAQ Section
var faqs = Array.from(document.getElementsByClassName("faq"));
var previousFaq = null;
faqs.map(function (faq) {
    faq.onclick = function (e) {
        if (e.target.tagName == "P" ||
            e.target.tagName == "p" ||
            e.target.tagName == "H3" ||
            e.target.tagName == "h3" ||
            e.target.classList.contains("faqHead") ||
            e.target.classList.contains("faqBody"))
            return;
        if (previousFaq != null &&
            (previousFaq ==
                e.target.parentElement
                    .parentElement ||
                e.target.parentElement
                    .parentElement.classList.contains("row"))) {
            previousFaq.classList.remove("open");
            previousFaq.getElementsByTagName("p")[0].style.height =
                "0px";
            previousFaq = null;
            return;
        }
        previousFaq = e.target.parentElement
            .parentElement;
        faqs.map(function (faqX) {
            if (faqX !=
                e.target.parentElement.parentElement) {
                faqX.classList.remove("open");
                faqX.getElementsByTagName("p")[0].style.height = "0px";
            }
        });
        if (faq.classList.contains("open")) {
            return;
        }
        else {
            faq.classList.add("open");
            getAndSetHeight(faq, faq.getElementsByTagName("p")[0]);
        }
    };
});
function getAndSetHeight(faqElement, element) {
    if (faqElement.classList.contains("open")) {
        element.style.height = "auto";
        var newHeight_1 = element.offsetHeight;
        element.style.height = "";
        setTimeout(function () {
            element.style.height = "".concat(newHeight_1, "px");
        }, 1);
    }
    else {
        element.style.height = "0px";
    }
}
//Open a FAQ on page load
window.onload = function () {
    document.getElementsByClassName("preOpen")[0]
        .getElementsByTagName("button")[0]
        .click();
};
window.onclick = function () {
    classes("navigation")[0].classList.remove("active");
};
