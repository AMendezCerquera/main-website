function navigateLoad() {
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
}

function navigateFunctionalities() {
  chatbot = document.getElementById("chatbot");
  const navMenu = document.getElementById("nav-menu");
  navList = document.getElementById("nav-list");
  navToggle = document.getElementById("nav-toggle");
  navClose = document.getElementById("nav-close");

  //Menu Show
  navToggle.addEventListener("click", () => {
    navList.classList.toggle("expanded");
    navToggle.style.display = "none";
    navClose.style.display = "flex";
    hideScrollbar();
  });

  navClose.addEventListener("click", () => {
    navList.classList.toggle("expanded");
    navClose.style.display = "none";
    navToggle.style.display = "flex";
    hideScrollbar();
  });

  //Menu Functionalities
  const nevButtons = document.querySelectorAll(".nav__link");
  const contactMenu = document.getElementById("contact-button");
  chatInvitation = document.getElementById("chat-invitation");

  contactMenu.addEventListener("click", () => {
    toggleChat();
  });

  nevButtons.forEach((button) => {
    button.addEventListener("click", () => {
      navList.classList.toggle("expanded");
      navClose.style.display = "none";
      navToggle.style.display = "flex";
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    const chatbot = document.getElementById("chatbot");
    chatbot.classList.add("hidden"); // Ensure chatbot is hidden on page load
  });

  hoverChat();

  function hoverChat() {
    chatBot = document.querySelector(".chatbot-toggle");
    const icon1 = document.getElementById("icon1");
    const icon2 = document.getElementById("icon2");

    chatBot.addEventListener("mouseover", () => {
      icon1.classList.add("hidden");
      icon2.classList.remove("hidden");
    });
    chatBot.addEventListener("mouseout", () => {
      icon2.classList.add("hidden");
      icon1.classList.remove("hidden");
    });
  }
}

function toggleChat() {
  chatInvitation.classList.toggle("hiddens");
  chatInvitation.classList.toggle("show");
  chatbot.classList.toggle("hidden");
  if (window.innerWidth <= 678) {
    chatBotcontainer.classList.toggle("expanded");
    hideScrollbar();
    if(chatBotcontainer.classList.contains('expanded'))
      toggleContainer.classList.add('hide');
    else
      toggleContainer.classList.remove('hide');
  }
}

var resizeLeft = function resizeLeft() {
  var r = document.getElementById("right-col");
  var l = document.getElementById("left-col");
  var width = window.innerWidth > 0 ? window.innerWidth : screen.width;
  if (width >= 500) {
    l.style.height = r.offsetHeight + "px";
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

chatBotcontainer = document.querySelector('.chatbot-container');
toggleContainer = document.querySelector('.toggle-container');
logo = document.getElementById('logo');

function hideScrollbar() {
  var root = document.getElementsByTagName("html")[0];
  if ((navList.classList.contains("expanded") || chatBotcontainer.classList.contains('expanded')) && window.innerWidth <= 678) {
    setTimeout(() => {
      logo.src = "/Structural Elements/Logo and Favicon/AlejandroMendez_Icon-2.png";
    }, 100);
    root.classList.add("hidden-scrollbar");
    navClose.classList.add("lock-toggleClose");
  } else {
    setTimeout(() => {
      logo.src = "/Structural Elements/Logo and Favicon/AlejandroMendez_Icon-1.png";
    }, 100);
    root.classList.remove("hidden-scrollbar");
    navClose.classList.remove("lock-toggleClose");
  }
  if(window.innerWidth <= 678) {
    chatBotcontainer.classList.add("mobile");
    if(!chatbot.classList.contains('hidden')){
      chatBotcontainer.classList.add('expanded');
      toggleContainer.classList.add('hide');
    }else{
      chatBotcontainer.classList.remove('expanded');
      toggleContainer.classList.remove('hide');
    }
  }else{
    chatBotcontainer.classList.remove("mobile");
  }
}

addEvent(window, "resize", resizeLeft);
window.addEventListener("resize", hideScrollbar);

//Managing The Prompts for the ChatBox
const prompts = document.querySelectorAll(".promptButton");
const messagesContainer = document.getElementById("chat-output");

const initialMessages = [
  "Hello, I'm Alejandro Bot.",
  "I'm here to help you with any questions you might have.",
  "How can i help you today?",
];

const data = {
  1: {
    prompt: ["What are you currently working on?"],
    messages: [
      "I'm currently working on a website for an independent consulting company.",
      "The main focus for the website is to offer healthcare programs to different age groups.",
    ],
    subPrompts: [
      {
        subPromptId: "data[1].subPrompts[0].subPrompts[0]",
        label: "What stack are you using?",
        subPrompts: [
          {
            messages: [
              "The customer requested for the website to be a simpler design",
              "So I'm planning to use HTML, CSS, and JS.",
              "I mainly want to use JS for any dinamically loaded content that the user wants to use, as well as for a budget calculator.",
            ],
            subPrompts: [{ subPromptId: "go-back", label: "Go Back" }],
          },
        ],
      },
      { subPromptId: "go-back", label: "Go Back" },
    ],
  },
  2: {
    prompt: ["What's on your to-do list for personal projects?"],
    messages: [
      "In my future plans, I want to work on:",
      "A CRM platform for managing a small companies dedicated in healthcare sales.",
      'A website called "Visit Colombia" with an interactive map to see highlights of my country.',
    ],
    subPrompts: [
      {
        subPromptId: "data[2].subPrompts[0].subPrompts[0]",
        label: "What stack are you planning to use?",
        subPrompts: [
          {
            messages: [
              "So far I've only planned for the CRM.",
              "For the frontend, I want to use React.js, Redux, and CSS-in-JS",
              "For Backend, I want to use Node.js, Java, and Express.js",
              "For the database, I'm not sure yet but either PostgreSQL or MongoDB.",
              "Last but not least, I want to use RESTful API, Passport.js, and Docker for the remaining parts of the project.",
            ],
            subPrompts: [{ subPromptId: "go-back", label: "Go Back" }],
          },
        ],
      },
      { subPromptId: "go-back", label: "Go Back" },
    ],
  },
  4: {
    prompt: ["Are you available for hire?"],
    messages: ["Yes, I am!", "Send me an email to:", "hello@alejandromendez.dev", "Or click below: ","email"],
    subPrompts: [{ subPromptId: "go-back", label: "Go Back" }],
  },
};

function displayInitialMessages() {
  //Clearing out the space
  promptsSpace = document.getElementById("prompt-container");
  promptsSpace.replaceChildren();
  messagesContainer.replaceChildren();

  //Adding the Initial Messages
  initialMessages.forEach((message) => {
    const currentMessage = document.createElement("p");
    currentMessage.classList.add("bot-message");
    currentMessage.innerText = message;
    messagesContainer.appendChild(currentMessage);
  });
}

function displayMainPrompts() {
  promptsSpace = document.getElementById("prompt-container");
  promptsSpace.replaceChildren();
  const promptKeys = Object.keys(data);
  promptKeys.forEach((prompt) => {
    const currentPrompt = document.createElement("button");
    currentPrompt.classList.add("promptButton");
    var currentMessage = data[prompt].prompt;
    currentPrompt.innerText = currentMessage;
    var promptId = "data[" + prompt + "]";
    console.log(promptId);
    currentPrompt.addEventListener("click", () =>
      displayContent(promptId, currentMessage)
    );
    promptsSpace.appendChild(currentPrompt);
  });
  scrollToBottom();
}

function displayContent(promptId, message) {
  //messagesContainer.appendChild(promptId);
  promptsSpace.classList.remove("show");
  const userSelection = document.createElement("p");
  userSelection.innerText = message;
  userSelection.classList.add("user-message");
  messagesContainer.appendChild(userSelection);

  promptsSpace.replaceChildren();
  console.log(promptId);
  const { messages, subPrompts } = eval(promptId);

  // Display messages
  let delayAmount = 1200;
  messages.forEach((message, index) => {
    console.log(message, index);
    setTimeout(function () {
      if (message !== "email") {
        messageElement = document.createElement("p");
        messageElement.textContent = message;
      } else {
        console.log("worked!");
        messageElement = document.createElement("button");
        emailContainer = document.createElement("i");
        emailContainer.classList.add("fa-solid");
        emailContainer.classList.add("fa-paper-plane");
        messageElement.classList.add("email-button");
        emailContainer.addEventListener("click", () => {
          window.location = "mailto:hello@alejandromendez.dev";
        });
        messageElement.appendChild(emailContainer);
      }
      messageElement.classList.add("bot-message");
      messagesContainer.appendChild(messageElement);
      scrollToBottom();
      console.log(messagesContainer.offsetHeight);
      console.log("delay" + delayAmount);
    }, index * delayAmount); // Multiply the delay by the index
  });

  // Display sub-prompts
  setTimeout(function () {
    if (subPrompts.length > 0) {
      subPrompts.forEach((subPrompt) => {
        subPromptButton = document.createElement("button");
        subPromptButton.className = "subPromptButton";
        subPromptButton.textContent = subPrompt.label;
        subPromptButton.setAttribute("data-prompt", subPrompt.subPromptId);
        if (subPrompt.label === "Go Back") {
          subPromptButton.addEventListener("click", () => {
            displayMainPrompts();
          });
        } else {
          subPromptButton.addEventListener("click", () => {
            displayContent(subPrompt.subPromptId, subPrompt.label);
          });
        }
        promptsSpace.appendChild(subPromptButton);
      });
      console.log(delayAmount);
      promptsSpace.classList.toggle("show");
      scrollToBottom();
    }
  }, messages.length * delayAmount);
}

function waitForCondition(conditionFn, interval = 100) {
  return new Promise((resolve) => {
    const intervalId = setInterval(() => {
      if (conditionFn()) {
        clearInterval(intervalId);
        resolve();
      }
    }, interval);
  });
}

chatMessageWindow = document.querySelector(".chat-messages");

function scrollToBottom() {
  //console.log("messagesContainer Height: "+messagesContainer.offsetHeight);
  //chatMessageWindow.scrollTop = messagesContainer.scrollHeight;
  //console.log(chatMessageWindow.scrollTop);
  const lastMessage = messagesContainer.lastElementChild;
  if (lastMessage) {
    lastMessage.scrollIntoView({ behavior: "smooth" });
  }
}

//Disabling Scroll
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
/*
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}
*/

function checkMobile(){
  if(window.innerWidth <= 678)
    chatBotcontainer.classList.add('mobile');
}

window.onresize = function() {
  document.body.height = window.innerHeight;
}

// Call the navigateLoad function on window load
window.onload = navigateLoad();
window.onload = checkMobile();
resizeLeft();
hideScrollbar();
displayInitialMessages();
displayMainPrompts();
window.onresize();

