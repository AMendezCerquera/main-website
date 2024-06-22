async function navigateLoad() {
  try {
    // Await the fetch operation to complete and then convert response to text
    const chatBox = await fetch(
      "/Structural Elements/Loaded Content/Chatbox/index.html"
    );

    if (!chatBox.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const chatData = await chatBox.text();

    // Replace the placeholder with the fetched navigation content
    document.getElementById("chatbot-placeholder").outerHTML = chatData;

    // Access the elements after they have been added to the DOM
    navigateFunctionalities();

    const swiper = new Swiper(".mySwiper", {
      direction: "vertical",
      slidesPerView: 1,
      spaceBetween: 0,
      mousewheel: false,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      autoplay: {
        delay: 10000,
      },
    });
  } catch (error) {
    console.error("Failed to load navigation:", error);
  }
}

function navigateFunctionalities() {
  const chatbot = document.getElementById("chatbot");
  const navMenu = document.getElementById("nav-menu");
  const navList = document.getElementById("nav-list");
  const navToggle = document.getElementById("nav-toggle");
  const navClose = document.getElementById("nav-close");

  //Menu Show
  navToggle.addEventListener("click", () => {
    navList.classList.toggle("expanded");
    navToggle.style.display = "none";
    navClose.style.display = "flex";
  });

  navClose.addEventListener("click", () => {
    navList.classList.toggle("expanded");
    navClose.style.display = "none";
    navToggle.style.display = "flex";
  });

  document.addEventListener("DOMContentLoaded", function () {
    const chatbot = document.getElementById("chatbot");
    chatbot.classList.add("hidden"); // Ensure chatbot is hidden on page load
  });

  const input = document.getElementById("chat-input");
  input.addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      sendMessage();
    }
  });
}

function toggleChat() {
  chatbot.classList.toggle("hidden");
}

function sendMessage() {
  const input = document.getElementById("chat-input");
  const output = document.getElementById("chat-output");

  const message = input.value.trim();
  if (message !== "") {
    output.innerHTML += `<div class='user-message'>${message}</div>`;

    const formData = new URLSearchParams();
    formData.append("question", message);

    fetch("http://localhost:3000/faq", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        output.innerHTML += `<div class='bot-response'>${data.answer}</div>`;
        output.scrollTop = output.scrollHeight; // Scroll to the bottom
      })
      .catch((error) => console.error("Error:", error));

    input.value = ""; // Clear input after sending
  }
}

var resizeLeft = function resizeLeft() {
  var r = document.getElementById("right-col");
  var l = document.getElementById("left-col");
  var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  console.log(width);
    if (width >= 500) {
        l.style.height = r.offsetHeight + "px";
        console.log(r.offsetHeight);
    }
};

var addEvent = function (elem, type, eventHandle) {
  if (elem == null || typeof elem == "undefined") return;
  if (elem.addEventListener) {
    elem.addEventListener(type, eventHandle, false);
  } else if (elem.attachEvent) {
    elem.attachEvent("on" + type, eventHandle);
  } else {
    elem["on" + type] = eventHandle;
  }
};
addEvent(window, "resize", resizeLeft);

resizeLeft();

// Call the navigateLoad function on window load
window.onload = navigateLoad();
