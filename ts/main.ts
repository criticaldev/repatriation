const backendAPI = "https://backend-repatriation.vercel.app";

id("navButton").onclick = () => {
  classes("navigation")[0].classList.toggle("active");
};

tags("nav")[0].onclick = (e) => {
  e.stopPropagation();
};

// Smooth Scroll to element

let scrollAnchor = Array.from(
  document.querySelectorAll("button[data-href^='#']")
);
scrollAnchor.map((anchor) => {
  let scrollELementID = anchor.getAttribute("data-href") as string;
  scrollELementID = scrollELementID.substring(1);
  (anchor as HTMLAnchorElement).onclick = function (e: any) {
    e.preventDefault();
    let scrollElement = id(scrollELementID);
    if (scrollElement) {
      setTimeout(() => {
        window.scrollTo({
          top: (scrollElement?.offsetTop as number) - 70,
          behavior: "smooth",
        });
      }, 300);
    }
  };
});

// Add active class depending on scroll position

function isScrolledIntoView(el: HTMLElement) {
  let rect = el.getBoundingClientRect();
  let elemTop = rect.top;
  let elemBottom = rect.bottom;
  let isVisible = elemTop < window.innerHeight && elemBottom >= 0;
  return isVisible;
}

function scrollActive(elementIDArray: any) {
  window.onscroll = () => {
    if (window.scrollY > 50) tags("nav")[0].classList.add("active");
    else tags("nav")[0].classList.remove("active");
    elementIDArray.map((elementID: string) => {
      // if (elementIDArray.indexOf(elementID) == 0) return;
      if (
        window.scrollY >= id(elementID).offsetTop - 200 &&
        window.scrollY <
          id(elementID).scrollHeight + id(elementID).offsetTop + 100
      ) {
        Array.from(classes("navLI")).map((li) => {
          if (
            (li as HTMLElement).querySelectorAll(
              `button[data-href='#${elementID}']`
            )[0] != null &&
            (li as HTMLElement).querySelectorAll(
              `button[data-href='#${elementID}']`
            )[0] != undefined
          ) {
            let p = (li as HTMLElement).querySelectorAll(
              `button[data-href='#${elementID}']`
            )[0];

            Array.from(classes("navAnchor")).map((navAnchor) => {
              if (
                (
                  (navAnchor as HTMLElement).parentElement as HTMLElement
                ).classList.contains("active")
              ) {
                (
                  (navAnchor as HTMLElement).parentElement as HTMLElement
                ).classList.remove("active");
              }
            });
            if (
              !(p.parentElement as HTMLElement).classList.contains("active")
            ) {
              (p.parentElement as HTMLElement).classList.add("active");
            }
          }
        });
      }
    });
  };
}

let scrollActiveChange = true;
let scrollAnchorArray: any = [];
if (scrollActiveChange) {
  let navAnchors = Array.from(classes("navAnchor"));
  navAnchors.map((anchor) => {
    let navAnchorToElementID = anchor.getAttribute("data-href") as string;
    navAnchorToElementID = navAnchorToElementID.substring(1);
    scrollAnchorArray.push(navAnchorToElementID);
    scrollActiveChange = false;
  });
}
scrollActive(scrollAnchorArray);

// FAQ Section

const faqs = Array.from(document.getElementsByClassName("faq"));
let previousFaq: any = null;

faqs.map((faq) => {
  (faq as HTMLElement).onclick = function (e) {
    if (
      (e.target as HTMLElement).tagName == "P" ||
      (e.target as HTMLElement).tagName == "p" ||
      (e.target as HTMLElement).tagName == "H3" ||
      (e.target as HTMLElement).tagName == "h3" ||
      (e.target as HTMLElement).classList.contains("faqHead") ||
      (e.target as HTMLElement).classList.contains("faqBody")
    )
      return;
    if (
      previousFaq != null &&
      (previousFaq ==
        (((e.target as HTMLElement).parentElement as HTMLElement)
          .parentElement as HTMLElement) ||
        (
          ((e.target as HTMLElement).parentElement as HTMLElement)
            .parentElement as HTMLElement
        ).classList.contains("row"))
    ) {
      previousFaq.classList.remove("open");
      (previousFaq as HTMLElement).getElementsByTagName("p")[0].style.height =
        "0px";
      previousFaq = null;
      return;
    }

    previousFaq = ((e.target as HTMLElement).parentElement as HTMLElement)
      .parentElement as HTMLElement;
    faqs.map((faqX) => {
      if (
        faqX !=
        ((e.target as HTMLElement).parentElement as HTMLElement).parentElement
      ) {
        faqX.classList.remove("open");
        (faqX as HTMLElement).getElementsByTagName("p")[0].style.height = "0px";
      }
    });
    if (faq.classList.contains("open")) {
      return;
    } else {
      faq.classList.add("open");
      getAndSetHeight(
        faq as HTMLElement,
        (faq as HTMLElement).getElementsByTagName("p")[0]
      );
    }
  };
});

function getAndSetHeight(faqElement: HTMLElement, element: HTMLElement) {
  if (faqElement.classList.contains("open")) {
    element.style.height = "auto";
    let newHeight = element.offsetHeight;
    element.style.height = "";
    setTimeout(() => {
      element.style.height = `${newHeight}px`;
    }, 1);
  } else {
    element.style.height = "0px";
  }
}

// Contact Section

const contactForm = document.getElementById("contactForm") as HTMLFormElement;
let sending = false;

contactForm.onsubmit = async (e) => {
  e.preventDefault();
  if (sending) return;
  let formname = <any>document.getElementById("name"),
    formemail = <any>document.getElementById("email"),
    formsubject = <any>document.getElementById("subject"),
    formmessage = <any>document.getElementById("message");
  if (
    formname.value == "" ||
    formemail.value == "" ||
    formsubject.value == "" ||
    formmessage.value == ""
  ) {
    formname.setAttribute("required", "required");
    formemail.setAttribute("required", "required");
    formsubject.setAttribute("required", "required");
    formmessage.setAttribute("required", "required");
    let n = <HTMLParagraphElement>document.getElementById("errorInfo");
    n.classList.remove("error");
    n.classList.add("warning");
    n.innerText =
      "Don't play a trick on us, you have to fill the required fields correctly!";
    return;
  }

  formname = formname.value;
  formemail = formemail.value;
  formsubject = formsubject.value;
  formmessage = formmessage.value;

  let bodyContent = {
    name: formname,
    email: formemail,
    subject: formsubject,
    message: formmessage,
  };
  document.getElementById("submit")?.setAttribute("disabled", "disabled");
  sending = true;
  let response = await fetch(backendAPI, {
    method: "POST",
    body: JSON.stringify(bodyContent),
    headers: {
      "Content-Type": "application/json",
    },
  });
  let data = await response.json();
  if (data.status) {
    let n = <HTMLParagraphElement>document.getElementById("errorInfo");
    n.classList.remove("error");
    n.classList.remove("warning");
    n.innerText =
      "Your message has been received and will be forwarded to our sales team.";
    contactForm.reset();
    document.getElementById("submit")?.removeAttribute("disabled");
    sending = false;
  } else {
    let n = <HTMLParagraphElement>document.getElementById("errorInfo");
    n.classList.remove("warning");
    n.classList.add("error");
    n.innerText = "Error sending message";
    document.getElementById("submit")?.removeAttribute("disabled");
    sending = false;
  }
};

//Open a FAQ on page load
window.onload = () => {
  (document.getElementsByClassName("preOpen")[0] as HTMLElement)
    .getElementsByTagName("button")[0]
    .click();
};

window.onclick = () => {
  classes("navigation")[0].classList.remove("active");
};
