"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
// Contact Section
var contactForm = document.getElementById("contactForm");
var sending = false;
contactForm.onsubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
    var formname, formemail, formsubject, formmessage, n, bodyContent, response, data, n, n;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                e.preventDefault();
                if (sending)
                    return [2 /*return*/];
                formname = document.getElementById("name"), formemail = document.getElementById("email"), formsubject = document.getElementById("subject"), formmessage = document.getElementById("message");
                if (formname.value == "" ||
                    formemail.value == "" ||
                    formsubject.value == "" ||
                    formmessage.value == "") {
                    formname.setAttribute("required", "required");
                    formemail.setAttribute("required", "required");
                    formsubject.setAttribute("required", "required");
                    formmessage.setAttribute("required", "required");
                    n = document.getElementById("errorInfo");
                    n.classList.remove("error");
                    n.classList.add("warning");
                    n.innerText =
                        "Don't play a trick on us, you have to fill the required fields correctly!";
                    return [2 /*return*/];
                }
                formname = formname.value;
                formemail = formemail.value;
                formsubject = formsubject.value;
                formmessage = formmessage.value;
                bodyContent = {
                    name: formname,
                    email: formemail,
                    subject: formsubject,
                    message: formmessage,
                };
                (_a = document.getElementById("submit")) === null || _a === void 0 ? void 0 : _a.setAttribute("disabled", "disabled");
                sending = true;
                return [4 /*yield*/, fetch("https://backend-repatriation.vercel.app", {
                        method: "POST",
                        body: JSON.stringify(bodyContent),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })];
            case 1:
                response = _d.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                data = _d.sent();
                if (data.status) {
                    n = document.getElementById("errorInfo");
                    n.classList.remove("error");
                    n.classList.remove("warning");
                    n.innerText =
                        "Your message has been received and will be forwarded to our sales team.";
                    contactForm.reset();
                    (_b = document.getElementById("submit")) === null || _b === void 0 ? void 0 : _b.removeAttribute("disabled");
                    sending = false;
                }
                else {
                    n = document.getElementById("errorInfo");
                    n.classList.remove("warning");
                    n.classList.add("error");
                    n.innerText = "Error sending message";
                    (_c = document.getElementById("submit")) === null || _c === void 0 ? void 0 : _c.removeAttribute("disabled");
                    sending = false;
                }
                return [2 /*return*/];
        }
    });
}); };
//Open a FAQ on page load
window.onload = function () {
    document.getElementsByClassName("preOpen")[0]
        .getElementsByTagName("button")[0]
        .click();
};
window.onclick = function () {
    classes("navigation")[0].classList.remove("active");
};
