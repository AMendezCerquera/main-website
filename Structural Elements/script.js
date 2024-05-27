async function navigateLoad() {
    try {
        // Await the fetch operation to complete and then convert response to text
        const response = await fetch("/Structural Elements/Loaded Content/Navigation/nav.html");
        const socialBar = await fetch("/Structural Elements/Loaded Content/Social Bar/index.html");
        const footerBar = await fetch("/Structural Elements/Loaded Content/Footer/footer.html");
        const chatBox = await fetch("/Structural Elements/Loaded Content/Chatbox/index.html");

        if (!response.ok || !socialBar.ok || !footerBar.ok || !chatBox.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.text();
        const socialData = await socialBar.text();
        const footerData = await footerBar.text();
        const chatData = await chatBox.text();

        // Replace the placeholder with the fetched navigation content
        document.getElementById("nav-placeholder").outerHTML = data;
        document.getElementById("social-bar-placeholder").outerHTML = socialData;
        document.getElementById("footer-placeholder").outerHTML = footerData;
        document.getElementById("chatbot-placeholder").outerHTML = chatData;

        // Access the elements after they have been added to the DOM
        navigateFunctionalities();

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

    //Menu Show
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });

    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });

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
