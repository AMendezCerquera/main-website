const header = document.getElementById('headerCard')
const title = document.getElementById('title')
const excerpt = document.getElementById('excerpt')
const profile_img = document.getElementById('profile_img')
const name = document.getElementById('name')
const date = document.getElementById('date')

const animated_bgs = document.querySelectorAll('.animated-bg');
const animated_bg_texts = document.querySelectorAll('.animated-bg-text');

setTimeout(getData, 1000)

function getData() {
    header.innerHTML = '<img src="/Structural Elements/Images/laptop.jpg" alt="Profile Picture">';
    title.innerHTML = 'EcoTrack';
    excerpt.innerHTML = 'EcoTrack is an innovative mobile application designed to help users track and reduce their carbon footprint through daily activities. The app provides personalized insights and tips on sustainable living, encouraging users to make environmentally friendly choices.';
    profile_img.innerHTML = '<img src="/Structural Elements/Images/test.png" alt="User Picture">';
    name.innerHTML = 'Alejandro Mendez';
    date.innerHTML = 'Oct 08, 2020';

    animated_bgs.forEach((bg) => bg.classList.remove('animated-bg'));

    animated_bg_texts.forEach((bg) => bg.classList.remove('animated-bg-text'))
}