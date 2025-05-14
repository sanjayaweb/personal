// Ensure content is hidden until loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add loaded class to body
    document.body.classList.add('loaded');
    
    // Start datetime updates
    updateDateTime();
    setInterval(updateDateTime, 1000);
});

// Prevent scroll during intro animation
const introOverlay = document.querySelector('.intro-overlay');
if (introOverlay) {
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
        document.body.style.overflow = '';
    }, 4500); // Match this with the animation duration
}

// Function to update date and time
function updateDateTime() {
    // Update English DateTime
    const now = new Date();
    const englishOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };
    const englishDateTime = now.toLocaleString('en-US', englishOptions);
    document.getElementById('english-datetime').textContent = englishDateTime;

    // Update Nepali DateTime
    const npDate = new NepaliDate(now);
    const npYear = npDate.getYear();
    const npMonth = npDate.getMonth() + 1; // Months are 0-based
    const npDay = npDate.getDate();
    const npMonthName = getNepaliMonth(npMonth);
    const npDayName = getNepaliDay(now.getDay());
    
    const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
    
    const nepaliDateTime = `${npDayName}, ${npYear} ${npMonthName} ${npDay} - ${timeString}`;
    document.getElementById('nepali-datetime').textContent = nepaliDateTime;
}

// Helper function to get Nepali month name
function getNepaliMonth(month) {
    const months = [
        'बैशाख', 'जेठ', 'असार', 'श्रावण', 'भदौ', 'असोज',
        'कार्तिक', 'मंसिर', 'पुष', 'माघ', 'फाल्गुन', 'चैत'
    ];
    return months[month - 1];
}

// Helper function to get Nepali day name
function getNepaliDay(day) {
    const days = [
        'आइतबार', 'सोमबार', 'मंगलबार', 'बुधबार',
        'बिहिबार', 'शुक्रबार', 'शनिबार'
    ];
    return days[day];
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = '#1a1a1a';
        navbar.style.padding = '0.5rem 0';
    } else {
        navbar.style.backgroundColor = '#343a40';
        navbar.style.padding = '1rem 0';
    }
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Show success message (in a real application, you would send this data to a server)
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

Add animation to service cards on scroll
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    observer.observe(card);
});

// ... existing code ...