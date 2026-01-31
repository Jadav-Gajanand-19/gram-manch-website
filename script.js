// Download APK function
function downloadAPK() {
    // Show a message while downloading
    const button = event.target.closest('.download-button') || event.target;
    const originalText = button.innerHTML;

    button.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="rotate"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> Preparing Download...';
    button.disabled = true;

    // Create a temporary link to download the APK
    setTimeout(() => {
        const link = document.createElement('a');
        link.href = 'GramManch.apk';  // APK file in same directory
        link.download = 'GramManch.apk';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Reset button
        button.innerHTML = originalText;
        button.disabled = false;

        // Show success message
        showToast('Download started! Check your downloads folder.');
    }, 500);
}

// Toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #2C2C2C;
        color: white;
        padding: 16px 24px;
        border-radius: 24px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        animation: slideUp 0.3s ease;
        font-weight: 500;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideDown 0.3s ease';
        setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
}

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from {
            transform: translate(-50%, 100px);
            opacity: 0;
        }
        to {
            transform: translate(-50%, 0);
            opacity: 1;
        }
    }
    
    @keyframes slideDown {
        from {
            transform: translate(-50%, 0);
            opacity: 1;
        }
        to {
            transform: translate(-50%, 100px);
            opacity: 0;
        }
    }
    
    @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    .rotate {
        animation: rotate 1s linear infinite;
    }
`;
document.head.appendChild(style);

// Smooth scrolling for anchor links
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

// Add scroll reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.feature-card, .stat-item');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Contact form handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.submit-btn');
            const formMessage = document.getElementById('formMessage');
            const originalBtnText = submitBtn.innerHTML;

            // Disable button and show loading
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="rotate"><circle cx="12" cy="12" r="10"></circle></svg> Sending...';

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent
            };

            try {
                // Check if Firebase is initialized
                if (typeof firebase !== 'undefined' && firebase.firestore) {
                    const db = firebase.firestore();

                    // Save to Firestore
                    await db.collection('contact_submissions').add(formData);

                    // Log event to Analytics
                    if (firebase.analytics) {
                        firebase.analytics().logEvent('contact_form_submit', {
                            name: formData.name,
                            email: formData.email
                        });
                    }

                    // Show success message
                    formMessage.textContent = '✅ Message sent successfully! We\'ll get back to you soon.';
                    formMessage.className = 'form-message success';

                    // Reset form
                    contactForm.reset();
                } else {
                    // If Firebase not setup, just show success (form data collected in browser)
                    console.log('Contact form submission:', formData);
                    formMessage.textContent = '✅ Message recorded! Firebase configuration needed for full functionality.';
                    formMessage.className = 'form-message success';
                    contactForm.reset();
                }

                // Show toast
                showToast('Thank you for contacting us!');

            } catch (error) {
                console.error('Error submitting form:', error);
                formMessage.textContent = '❌ Failed to send message. Please try again or email us directly.';
                formMessage.className = 'form-message error';
            } finally {
                // Reset button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;

                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.className = 'form-message';
                }, 5000);
            }
        });
    }
});

// Track download button clicks
document.addEventListener('click', (e) => {
    if (e.target.closest('.download-button, .download-btn, .cta-button')) {
        // Log download event to Analytics
        if (typeof firebase !== 'undefined' && firebase.analytics) {
            firebase.analytics().logEvent('download_button_click', {
                button_location: e.target.textContent.trim()
            });
        }
    }
});
