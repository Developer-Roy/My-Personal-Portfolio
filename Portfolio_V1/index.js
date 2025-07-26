// const preloader = document.querySelector('[data-preloader]');
const mainContainer = document.querySelector('.main-container');
const preloader = document.querySelector('.preloader');

window.addEventListener("load", () => {
    setTimeout(() => {
        preloader.style.display = "none";

        // show main content 
        mainContainer.style.display = "block"
    }, 400);
});


// +++++++++ for navbar sticky function +++++++++++++

const navbar = document.getElementById('navbar');
const stickyOffset = 100;

window.addEventListener('scroll', () => {
    if(window.scrollY >= stickyOffset) {
        navbar.classList.add('sticky');
    } else{
        navbar.classList.remove('sticky');
    }
});

// ++++++++++++++ TOGGLE BUTTON FOR DARK MODE AND LIGHT MODE +++++++++++++++++++++

const modeToggle = document.querySelector('.dark-light');

modeToggle.addEventListener('click', () => {
    modeToggle.classList.toggle('active');
    document.body.classList.toggle('dark');

})





// +++++++++++++++ RESUME BUTTON DOWNLOAD FUNCTIONALITY ++++++++++++++++++++

const downloadResume = document.getElementById('resumeBtn');

downloadResume.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = '/Assets/myResume.pdf';
    link.download = 'my-resume.pdf';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
})


// +++++++++++++++++ scroll and li click page scroll +++++++++++++++++++++++++

const sections = document.querySelectorAll('.hero', '.about-page', '.skills-page', '.project-page');
const navlinks = document.querySelectorAll("#listItem a");

window.addEventListener('scroll', () => {
    let current = "";


    sections.forEach( (section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navlinks.forEach( (link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active")
        }
    })
})


// form validation 



const firstError = document.getElementById('firstName-error');
const lastError = document.getElementById('lastName-error');
const emailError = document.getElementById('email-error');
const phoneError = document.getElementById('phone-error');
const messageError = document.getElementById('message-error');
const submitButton = document.getElementById('submitButton');
const submitError = document.getElementById('submit-error')

let isValid = false;

submitButton.addEventListener('click', (e) => {
    e.preventDefault();


    // submitError.textContent = "";

    const first = document.getElementById('firstInput').value.trim();
    const last = document.getElementById('lastInput').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phoneNumber').value.trim();
    const message = document.getElementById('messageMe').value.trim();


    // validation 
    if (first === "" && last === "" && email === "" && phone === "" && message === "") {

        submitError.textContent = "All fields are required.";
        submitError.style.display= "block";

        setInterval(() => {
            submitError.textContent = "All fields are required.";
            submitError.style.display= "none";
        }, 2000);
    }
})

// script.js
document.getElementById("contact-container").addEventListener("submit", async function(e) {
  e.preventDefault();

  const status = document.getElementById("submit-error");
  status.textContent = "Sending...";

  const formData = new FormData(this);

  try {
    const response = await fetch(this.action, {
      method: this.method,
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      status.textContent = "✅ Message sent successfully!";
      this.reset();
    } else {
      status.textContent = "❌ Failed to send message. Try again.";
    }
  } catch (error) {
    status.textContent = "❌ An error occurred.";
  }
});
