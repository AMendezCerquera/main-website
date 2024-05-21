async function navigateLoad() {
    try {
        // Await the fetch operation to complete and then convert response to text
        const response = await fetch("/Structural Elements/Loaded Content/Navigation/nav.html");
        const login = await fetch("/Structural Elements/Loaded Content/Login/login.html");
        const socialBar = await fetch("/Structural Elements/Loaded Content/Social Bar/index.html");
        const footerBar = await fetch("/Structural Elements/Loaded Content/Footer/footer.html");
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.text();
        const loginData = await login.text();
        const socialData = await socialBar.text();
        const footerData = await footerBar.text();

        // Replace the placeholder with the fetched navigation content
        document.getElementById("nav-placeholder").outerHTML = data;
        document.getElementById("form-placeholder").outerHTML = loginData;
        document.getElementById("social-bar-placeholder").outerHTML = socialData;
        document.getElementById("footer-placeholder").outerHTML = footerData;

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

}

function loginFunctionalities() {
    //Submitting Login Form
    document.getElementById("form-data").addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        
        const formEl = document.querySelector('.login__form');

        const formData = new FormData(formEl);
        const data = new URLSearchParams(formData);
    
        fetch('http://localhost:3000/login', {
            method: 'POST',
            body: data,
        })
        .then(response => {
            console.log(response.text());
        })
        .then(data => {
            console.log('Success:', data);
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

// Call the navigateLoad function on window load
window.onload = navigateLoad();


const buttons = document.querySelectorAll('.ripple');

buttons.forEach(button => {
    button.addEventListener('click', function (e) {
        const x = e.clientX;
        const y = e.clientY;

        const buttonTop = e.target.offsetTop;
        const buttonLeft = e.target.offsetLeft;

        const xInside = x - buttonLeft;
        const yInside = y - buttonTop;

        const circle = document.createElement('span');
        circle.classList.add('circle')
        circle.style.top = yInside + 'px';
        circle.style.left = xInside + 'px';

        this.appendChild(circle);

        setTimeout(() => circle.remove(), 500);
    })
})