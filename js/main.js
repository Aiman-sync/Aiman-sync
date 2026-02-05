/**
 * PORTFOLIO MAIN JAVASCRIPT
 * Creative Front-End Developer Portfolio
 * Author: Aiman
 */

// ========================================
// DOM Elements
// ========================================
const preloader = document.getElementById('preloader');
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('nav-menu');
const mobileToggle = document.getElementById('mobile-toggle');
const themeToggle = document.getElementById('theme-toggle');
const typewriterElement = document.getElementById('typewriter');
const backToTop = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');
const toast = document.getElementById('toast');

// ========================================
// Preloader
// ========================================
window.addEventListener('load', () => {
    setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 1500);
});

document.body.style.overflow = 'hidden';

// ========================================
// Custom Cursor
// ========================================
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;

if (window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        // Smooth cursor movement
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;

        cursor.style.left = cursorX - 5 + 'px';
        cursor.style.top = cursorY - 5 + 'px';
        cursorFollower.style.left = followerX - 15 + 'px';
        cursorFollower.style.top = followerY - 15 + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-item, .value-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        });
    });
}

// ========================================
// Sticky Navbar
// ========================================
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Add/remove scrolled class
    if (currentScrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar on scroll
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
    
    // Back to top button
    if (currentScrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    
    // Update active nav link
    updateActiveNavLink();
    
    // Animate skill bars
    animateSkillBars();
    
    // Counter animation
    animateCounters();
});

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    });
});

// Update active nav link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ========================================
// Mobile Menu Toggle
// ========================================
mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileToggle.classList.toggle('active');
});

// ========================================
// Theme Toggle
// ========================================
const currentTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fas fa-moon';
    } else {
        icon.className = 'fas fa-sun';
    }
}

// ========================================
// Typewriter Effect
// ========================================
const roles = ['Front-End Developer', 'JavaScript Enthusiast', 'UI/UX Implementer', 'Problem Solver'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeWriter() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500; // Pause before typing
    }
    
    setTimeout(typeWriter, typeSpeed);
}

// Start typewriter after preloader
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeWriter, 2000);
});

// ========================================
// Counter Animation
// ========================================
const counters = document.querySelectorAll('.stat-number');
let countersAnimated = false;

function animateCounters() {
    if (countersAnimated) return;
    
    const statsSection = document.querySelector('.hero-stats');
    if (!statsSection) return;
    
    const sectionTop = statsSection.offsetTop;
    const windowHeight = window.innerHeight;
    
    if (window.scrollY + windowHeight > sectionTop) {
        countersAnimated = true;
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }
}

// ========================================
// Skill Bars Animation
// ========================================
let skillBarsAnimated = false;

function animateSkillBars() {
    if (skillBarsAnimated) return;
    
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;
    
    const sectionTop = skillsSection.offsetTop;
    const windowHeight = window.innerHeight;
    
    if (window.scrollY + windowHeight > sectionTop + 100) {
        skillBarsAnimated = true;
        
        const skillBars = document.querySelectorAll('.skill-bar');
        skillBars.forEach(bar => {
            const skill = bar.getAttribute('data-skill');
            setTimeout(() => {
                bar.style.width = skill + '%';
            }, 200);
        });
    }
}

// ========================================
// Scroll Animations (AOS-like)
// ========================================
const animatedElements = document.querySelectorAll('[data-aos]');

function checkAnimations() {
    animatedElements.forEach(el => {
        const elementTop = el.offsetTop;
        const windowHeight = window.innerHeight;
        const triggerPoint = window.scrollY + windowHeight - 100;
        
        if (triggerPoint > elementTop) {
            el.classList.add('aos-animate');
        }
    });
}

window.addEventListener('scroll', checkAnimations);
window.addEventListener('load', checkAnimations);

// ========================================
// GitHub API Integration
// ========================================
const GITHUB_USERNAME = 'Aiman-sync'; // Replace with your GitHub username

async function fetchGitHubData() {
    try {
        // Fetch user data
        const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        const userData = await userResponse.json();
        
        // Update GitHub card
        document.getElementById('github-avatar').src = userData.avatar_url;
        document.getElementById('github-name').textContent = userData.name || userData.login;
        document.getElementById('github-bio').textContent = userData.bio || 'GitHub Developer';
        document.getElementById('github-repos').textContent = userData.public_repos;
        document.getElementById('github-followers').textContent = userData.followers;
        
        // Fetch repositories
        const reposResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
        const repos = await reposResponse.json();
        
        // Calculate total stars
        const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
        document.getElementById('github-stars').textContent = totalStars;
        
        // Display projects
        displayProjects(repos);
        
    } catch (error) {
        console.error('Error fetching GitHub data:', error);
        displayFallbackProjects();
    }
}

function displayProjects(repos) {
    const projectsGrid = document.getElementById('projects-grid');
    projectsGrid.innerHTML = '';
    
    repos.forEach(repo => {
        const projectCard = createProjectCard(repo);
        projectsGrid.appendChild(projectCard);
    });
}

function createProjectCard(repo) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-category', getProjectCategory(repo.language));
    
    const languageColor = getLanguageColor(repo.language);
    
    card.innerHTML = `
        <div class="project-header">
            <div class="project-icon">
                <i class="fas fa-folder-open"></i>
            </div>
            <div class="project-links">
                <a href="${repo.html_url}" target="_blank" class="project-link" aria-label="View Code">
                    <i class="fab fa-github"></i>
                </a>
                ${repo.homepage ? `
                <a href="${repo.homepage}" target="_blank" class="project-link" aria-label="Live Demo">
                    <i class="fas fa-external-link-alt"></i>
                </a>
                ` : ''}
            </div>
        </div>
        <div class="project-content">
            <h3>${repo.name}</h3>
            <p>${repo.description || 'No description available'}</p>
        </div>
        <div class="project-footer">
            <div class="project-language">
                <span class="language-dot" style="background: ${languageColor}"></span>
                <span>${repo.language || 'Unknown'}</span>
            </div>
            <div class="project-stats">
                <span class="project-stat">
                    <i class="fas fa-star"></i> ${repo.stargazers_count}
                </span>
                <span class="project-stat">
                    <i class="fas fa-code-branch"></i> ${repo.forks_count}
                </span>
            </div>
        </div>
    `;
    
    return card;
}

function getProjectCategory(language) {
    if (!language) return 'other';
    const lang = language.toLowerCase();
    if (lang === 'javascript') return 'javascript';
    if (lang === 'html' || lang === 'css') return 'javascript';
    if (lang === 'typescript') return 'javascript';
    return 'other';
}

function getLanguageColor(language) {
    const colors = {
        'JavaScript': '#f1e05a',
        'TypeScript': '#2b7489',
        'HTML': '#e34c26',
        'CSS': '#563d7c',
        'Python': '#3572A5',
        'Java': '#b07219',
        'C++': '#f34b7d',
        'C#': '#178600',
        'PHP': '#4F5D95',
        'Ruby': '#701516',
        'Go': '#00ADD8',
        'Rust': '#dea584',
        'Swift': '#ffac45',
        'Kotlin': '#A97BFF'
    };
    return colors[language] || '#8b949e';
}

function displayFallbackProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    projectsGrid.innerHTML = '';
    
    const fallbackProjects = [
        {
            name: 'Portfolio Website',
            description: 'A modern, responsive portfolio website built with HTML, CSS, and JavaScript.',
            language: 'JavaScript',
            stargazers_count: 12,
            forks_count: 3,
            html_url: '#',
            homepage: '#'
        },
        {
            name: 'Weather App',
            description: 'Real-time weather application using OpenWeatherMap API.',
            language: 'JavaScript',
            stargazers_count: 8,
            forks_count: 2,
            html_url: '#',
            homepage: '#'
        },
        {
            name: 'Task Manager',
            description: 'A productivity app for managing daily tasks and projects.',
            language: 'JavaScript',
            stargazers_count: 15,
            forks_count: 4,
            html_url: '#',
            homepage: '#'
        },
        {
            name: 'Quiz Game',
            description: 'Interactive quiz game with multiple categories and scoring.',
            language: 'JavaScript',
            stargazers_count: 6,
            forks_count: 1,
            html_url: '#',
            homepage: '#'
        },
        {
            name: 'E-commerce UI',
            description: 'Frontend implementation of an e-commerce platform.',
            language: 'CSS',
            stargazers_count: 10,
            forks_count: 2,
            html_url: '#',
            homepage: '#'
        },
        {
            name: 'Chat Application',
            description: 'Real-time chat app with WebSocket integration.',
            language: 'JavaScript',
            stargazers_count: 20,
            forks_count: 5,
            html_url: '#',
            homepage: '#'
        }
    ];
    
    fallbackProjects.forEach(project => {
        const card = createProjectCard(project);
        projectsGrid.appendChild(card);
    });
}

// Initialize GitHub fetch
document.addEventListener('DOMContentLoaded', fetchGitHubData);

// Project Filter
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        const projects = document.querySelectorAll('.project-card');
        
        projects.forEach(project => {
            if (filter === 'all' || project.getAttribute('data-category') === filter) {
                project.style.display = 'flex';
                project.style.animation = 'fadeIn 0.5s ease';
            } else {
                project.style.display = 'none';
            }
        });
    });
});

// ========================================
// Contact Form Validation & Handling
// ========================================
const formFields = {
    name: {
        element: document.getElementById('name'),
        error: document.getElementById('name-error'),
        validate: (value) => value.length >= 2 ? '' : 'Name must be at least 2 characters'
    },
    email: {
        element: document.getElementById('email'),
        error: document.getElementById('email-error'),
        validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Please enter a valid email'
    },
    subject: {
        element: document.getElementById('subject'),
        error: document.getElementById('subject-error'),
        validate: (value) => value.length >= 3 ? '' : 'Subject must be at least 3 characters'
    },
    message: {
        element: document.getElementById('message'),
        error: document.getElementById('message-error'),
        validate: (value) => value.length >= 10 ? '' : 'Message must be at least 10 characters'
    }
};

// Real-time validation
Object.keys(formFields).forEach(fieldName => {
    const field = formFields[fieldName];
    field.element.addEventListener('blur', () => validateField(fieldName));
    field.element.addEventListener('input', () => {
        if (field.error.textContent) {
            validateField(fieldName);
        }
    });
});

function validateField(fieldName) {
    const field = formFields[fieldName];
    const value = field.element.value.trim();
    const error = field.validate(value);
    field.error.textContent = error;
    return !error;
}

function validateForm() {
    let isValid = true;
    Object.keys(formFields).forEach(fieldName => {
        if (!validateField(fieldName)) {
            isValid = false;
        }
    });
    return isValid;
}

// Form submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
        showFormStatus('Please fix the errors above', 'error');
        return;
    }
    
    const submitBtn = document.getElementById('submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Get form data
    const formData = {
        name: formFields.name.element.value.trim(),
        email: formFields.email.element.value.trim(),
        subject: formFields.subject.element.value.trim(),
        message: formFields.message.element.value.trim()
    };
    
    // Option 1: Using Formspree (Recommended for static sites)
    // Uncomment and add your Formspree endpoint
    /*
    try {
        const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            showToast('Message sent successfully!');
            contactForm.reset();
        } else {
            throw new Error('Failed to send');
        }
    } catch (error) {
        showFormStatus('Failed to send message. Please try again.', 'error');
    }
    */
    
    // Option 2: Simulate successful submission (for demo)
    setTimeout(() => {
        showToast('Message sent successfully!');
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1500);
});

function showFormStatus(message, type) {
    const status = document.getElementById('form-status');
    status.textContent = message;
    status.className = 'form-status ' + type;
    
    setTimeout(() => {
        status.textContent = '';
        status.className = 'form-status';
    }, 5000);
}

function showToast(message) {
    const toastMessage = toast.querySelector('.toast-message');
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// ========================================
// Back to Top Button
// ========================================
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// Parallax Effect for Hero
// ========================================
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const orbs = document.querySelectorAll('.gradient-orb');
    
    orbs.forEach((orb, index) => {
        const speed = 0.1 + (index * 0.05);
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ========================================
// Keyboard Navigation
// ========================================
document.addEventListener('keydown', (e) => {
    // Escape to close mobile menu
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
    }
});

// ========================================
// Performance: Debounce scroll events
// ========================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handler
const debouncedScroll = debounce(() => {
    // Additional scroll-based animations can go here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ========================================
// Intersection Observer for Lazy Animations
// ========================================
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// ========================================
// Console Easter Egg
// ========================================
console.log('%c👋 Hey there, curious developer!', 'font-size: 20px; font-weight: bold; color: #00d4ff;');
console.log('%cThanks for checking out my portfolio!', 'font-size: 14px; color: #a855f7;');
console.log('%cLet\'s connect and build something amazing together!', 'font-size: 14px; color: #ec4899;');
console.log('%c📧 aiman.dev@email.com | 🐙 github.com/aiman', 'font-size: 12px; color: #94a3b8;');
