
interestContainer = document.querySelector('.interests');
textContact = document.querySelectorAll('.text-contact');
iconContact = document.querySelectorAll('.icon-contact');

function resizeScreen(){
    if (window.innerWidth <= 900){
        textContact.forEach(element => {
            element.classList.add("hide");
        });
        iconContact.forEach(element => {
            element.classList.remove("hide");
        });
    }else{
        interestContainer.classList.remove('hide');
        textContact.forEach(element => {
            element.classList.remove("hide");
        });
        iconContact.forEach(element => {
            element.classList.add("hide");
        });
    }
}

window.addEventListener('resize', () => {
    resizeScreen();
})

function sendEmail() {
    window.location = "mailto:hello@alejandromendez.dev"
}

function accessGithub() {
    window.open('https://github.com/AMendezCerquera', '_blank');
}

function accessWebsite() {
    window.open('https://alejandromendez.dev/', '_self');
}

function accessLinkedin() {
    window.open('www.linkedin.com/in/alejandro-mendez-dev', '_blank');
}


resizeScreen();