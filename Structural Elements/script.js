async function navigateLoad() {
    try {
        // Await the fetch operation to complete and then convert response to text
        const response = await fetch("/Structural Elements/Loaded Content/Navigation/nav.html");
        const login = await fetch("/Structural Elements/Loaded Content/Login/login.html");
        const socialBar = await fetch("/Structural Elements/Loaded Content/Social Bar/index.html");
        const footerBar = await fetch("/Structural Elements/Loaded Content/Footer/footer.html");
        const chatBox = await fetch("/Structural Elements/Loaded Content/Chatbox/index.html");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.text();
        const loginData = await login.text();
        const socialData = await socialBar.text();
        const footerData = await footerBar.text();
        const chatData = await chatBox.text();

        // Replace the placeholder with the fetched navigation content
        document.getElementById("nav-placeholder").outerHTML = data;
        /*document.getElementById("form-placeholder").outerHTML = loginData;*/
        document.getElementById("social-bar-placeholder").outerHTML = socialData;
        document.getElementById("footer-placeholder").outerHTML = footerData;
        document.getElementById("chatbot-placeholder").outerHTML = chatData;

        // Access the elements after they have been added to the DOM
        navigateFunctionalities();
        loginFunctionalities();

        const swiper = new Swiper(".mySwiper", {
            direction: "vertical",
            slidesPerView: 1,
            spaceBetween: 0,
            mousewheel: true,
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
            autoplay: {
                delay: 10000,
            },
          });
        

    } catch (error) {
        console.error('Failed to load navigation:', error);
    }
}

function navigateFunctionalities() {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const login = document.getElementById('login');
    const loginBtn = document.getElementById('login-btn');
    const loginClose = document.getElementById('login-close');

    //Menu Show
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });

    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });

    //Login Show
    loginBtn.addEventListener('click', () => {
        login.classList.add('show-login');
    })

    loginClose.addEventListener('click', () => {
        login.classList.remove('show-login');
    })

    document.addEventListener('DOMContentLoaded', function() {
        const chatbot = document.getElementById('chatbot');
        chatbot.classList.add('hidden'); // Ensure chatbot is hidden on page load
    });
    
    const input = document.getElementById('chat-input');

    
    input.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
      // Cancel the default action, if needed
        event.preventDefault();
      // Trigger the button element with a click
        sendMessage();
        }
    });
}

function loginFunctionalities() {
    //Submitting Login Form
    document.getElementById("form-data").addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        const formEl = document.querySelector('.login__form');

        const formData = new FormData(formEl);
        const data = new URLSearchParams(formData);
    
        fetch('http://localhost:3000/login', {
            method: 'POST',
            credentials: 'include',
            body: data,
        })
        .then(response => {
            console.log(response.text());
        })
        .then(data => {
            console.log('Success:', data);
            window.location.replace("/MyShelf/MyShelf.html");
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
    //Location Form
    const location = document.getElementById('form-data');

    //Changing Form from Login to Sign Up and viceversa
    const checkBox = document.getElementById('checkbox__form');
    const button = document.getElementById('submit-button');
    const forgot = document.getElementById('forgot_pass');
    const logingroup = document.getElementById('login__group');
    const signupgroup = document.getElementById('signup__group');


    checkBox.addEventListener('click', () => {
        if(checkBox.checked == true){
            button.innerText = 'Sign Up';
            forgot.classList.add('hide');
            signupgroup.classList.remove('hide');
            logingroup.classList.add('hide');
        }else{
            forgot.classList.remove('hide');
            button.innerText = 'Log In';
            logingroup.classList.remove('hide');
            signupgroup.classList.add('hide');
        }
    })
    //Submitting Sign Up Form
}

function toggleChat() {
        const chatbot = document.getElementById('chatbot');
        chatbot.classList.toggle('hidden');
}


function sendMessage() {
    const input = document.getElementById('chat-input');
    const output = document.getElementById('chat-output');

    const message = input.value.trim();
    if (message !== '') {
        output.innerHTML += `<div class='user-message'>${message}</div>`;

        const formData = new URLSearchParams();
        formData.append('question', message);

        fetch('http://localhost:3000/faq', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            output.innerHTML += `<div class='bot-response'>${data.answer}</div>`;
            output.scrollTop = output.scrollHeight; // Scroll to the bottom
        })
        .catch(error => console.error('Error:', error));

        input.value = ''; // Clear input after sending
    }
}


// Call the navigateLoad function on window load
window.onload = navigateLoad();
