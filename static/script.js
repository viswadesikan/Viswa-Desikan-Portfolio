// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const html = document.documentElement;
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbxCiMGdjghLFb_Y0CUEEwX25lS4SDwNkKkQWzs_lFeGLHGc1XmjJIApv1utSZWLNipeZw/exec';

function toggleTheme() {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  html.setAttribute('data-theme', newTheme);
  themeIcon.className = newTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
  
  // Save theme preference
  localStorage.setItem('theme', newTheme);
}

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  html.setAttribute('data-theme', savedTheme);
  themeIcon.className = savedTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
}

themeToggle.addEventListener('click', toggleTheme);


const body = document.body;

// Load saved theme from localStorage
if (localStorage.getItem("dark-mode") === "enabled") {
  body.classList.add("dark-mode");
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Change icon to moon
}

// Toggle theme on button click
themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("dark-mode", "enabled");
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Moon icon for dark mode
  } else {
    localStorage.setItem("dark-mode", "disabled");
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon for light mode
  }
});


// Smooth scroll for navigation links with custom delay
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetSection = document.querySelector(this.getAttribute('href'));

    // Custom scroll duration in milliseconds (e.g., 1.5 seconds = 1500ms)
    const duration = 600;

    smoothScroll(targetSection, duration);
  });
});

// Function to smoothly scroll to a target element
function smoothScroll(target, duration) {
  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const startTime = performance.now();

  // Animation function for smooth scrolling
  function animation(currentTime) {
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);  // Ensure scroll doesn't exceed 100%

    window.scrollTo(0, startPosition + distance * progress);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  // Start the animation
  requestAnimationFrame(animation);
}

// Active navigation highlight on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 60 && scrollY < sectionTop + sectionHeight - 60) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});




window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 100) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

// Initialize skill levels
document.querySelectorAll('.skill-item').forEach(skill => {
  const level = skill.getAttribute('data-level');
  skill.style.setProperty('--skill-level', `${level}%`);
});

// Intersection Observer for animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add visible class for general sections
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';

      // Add visible class for skill categories and items
      if (entry.target.classList.contains('skill-category')) {
        entry.target.classList.add('visible');
        
        // Animate skill items with delay
        const skillItems = entry.target.querySelectorAll('.skill-item');
        skillItems.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('visible');
          }, index * 100);
        });
      }

      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe sections and skill categories for animation
document.querySelectorAll('section, .skill-category').forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(20px)';
  element.style.transition = 'all 0.5s ease-out';
  observer.observe(element);
});


// Typing animation for roles
const roles = [
  "Civil Engineer",
  "Robotics Engineer",
  "Python Developer"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isWaiting = false;

function typeRole() {
  const roleElement = document.querySelector('.role-text');
  const currentRole = roles[roleIndex];
  const typeSpeed = 100; // Base typing speed
  const deleteSpeed = 50; // Deletion speed
  const waitTime = 2000; // Time to wait before deleting

  if (isWaiting) {
    setTimeout(() => {
      isWaiting = false;
      isDeleting = true;
      typeRole();
    }, waitTime);
    return;
  }

  if (isDeleting) {
    charIndex--;
    roleElement.textContent = currentRole.substring(0, charIndex);
    
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  } else {
    charIndex++;
    roleElement.textContent = currentRole.substring(0, charIndex);
    
    if (charIndex === currentRole.length) {
      isWaiting = true;
    }
  }

  const speed = isDeleting ? deleteSpeed : typeSpeed;
  setTimeout(typeRole, speed);
}

// Start the typing animation
typeRole();