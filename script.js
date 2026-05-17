/* ==================== HAMBURGER MENU TOGGLE ==================== */

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Tutup menu saat link diklik
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

/* ==================== GALLERY FILTER ==================== */

const filterButtons = document.querySelectorAll('.filter-btn');
const galeriItems = document.querySelectorAll('.galeri-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        galeriItems.forEach(item => {
            if (filterValue === 'semua') {
                item.classList.remove('hidden');
            } else {
                const itemCategory = item.getAttribute('data-category');
                if (itemCategory === filterValue) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            }
        });
    });
});

/* ==================== LIGHTBOX MODAL ==================== */

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxCaption = document.querySelector('.lightbox-caption');
const closeBtn = document.querySelector('.close');

// Open lightbox when gallery item clicked
galeriItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const overlay = item.querySelector('.galeri-overlay p');
        
        lightbox.classList.add('active');
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightboxCaption.textContent = overlay.textContent;
        
        // Prevent body scroll when lightbox is open
        document.body.style.overflow = 'hidden';
    });
});

// Close lightbox when close button clicked
closeBtn.addEventListener('click', closeLightbox);

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

/* ==================== CONTACT FORM - WHATSAPP INTEGRATION ==================== */

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const nama = document.getElementById('nama').value.trim();
    const luasArea = document.getElementById('luasarea').value.trim();
    const jasa = document.getElementById('jasa').value.trim();
    const pesan = document.getElementById('pesan').value.trim();

    // Validate required fields
    if (!nama || !luasArea || !jasa) {
        alert('Mohon isi semua field yang wajib (Nama, Luas Area, Pilihan Jasa)');
        return;
    }

    // Construct WhatsApp message
    let whatsappMessage = `Halo KNP Baja Ringan,%0A%0A`;
    whatsappMessage += `Nama: ${encodeURIComponent(nama)}%0A`;
    whatsappMessage += `Luas Area: ${encodeURIComponent(luasArea)} m²%0A`;
    whatsappMessage += `Pilihan Jasa: ${encodeURIComponent(jasa)}%0A`;
    
    if (pesan) {
        whatsappMessage += `Pesan: ${encodeURIComponent(pesan)}%0A`;
    }
    
    whatsappMessage += `%0AMohon segera dibalas. Terima kasih!`;

    // WhatsApp API endpoint
    const whatsappNumber = '6281903705961';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');

    // Reset form
    contactForm.reset();
});

/* ==================== SMOOTH SCROLL HELPER ==================== */

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

/* ==================== PAGE LOAD ANIMATIONS ==================== */

// Add animation class to elements on page load
window.addEventListener('load', () => {
    // Animate service cards
    const layananCards = document.querySelectorAll('.layanan-card');
    layananCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = 'fadeIn 0.5s ease forwards';
        }, index * 100);
    });
});

/* ==================== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS ==================== */

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe keunggulan items for animation
document.querySelectorAll('.keunggulan-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(item);
});

/* ==================== UTILITY: DISABLE LINK BEHAVIOR ON HERO BUTTON ==================== */

// Add smooth behavior for any anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});
