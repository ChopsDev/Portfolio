// Image Lightbox
let lightboxOverlay = null;
let currentGallery = [];
let currentIndex = 0;

function createLightbox() {
  if (lightboxOverlay) return;

  lightboxOverlay = document.createElement('div');
  lightboxOverlay.className = 'lightbox-overlay';
  lightboxOverlay.innerHTML = `
    <button class="lightbox-close" aria-label="Close lightbox"></button>
    <button class="lightbox-nav lightbox-prev" aria-label="Previous image"></button>
    <img src="" alt="">
    <button class="lightbox-nav lightbox-next" aria-label="Next image"></button>
    <span class="lightbox-counter"></span>
    <span class="lightbox-hint">Click anywhere or press ESC to close</span>
  `;
  document.body.appendChild(lightboxOverlay);

  // Close on overlay click
  lightboxOverlay.addEventListener('click', closeLightbox);

  // Prevent closing when clicking the image or nav buttons
  lightboxOverlay.querySelector('img').addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // Navigation buttons
  lightboxOverlay.querySelector('.lightbox-prev').addEventListener('click', (e) => {
    e.stopPropagation();
    navigateLightbox(-1);
  });

  lightboxOverlay.querySelector('.lightbox-next').addEventListener('click', (e) => {
    e.stopPropagation();
    navigateLightbox(1);
  });
}

function updateLightboxImage() {
  const img = lightboxOverlay.querySelector('img');
  const counter = lightboxOverlay.querySelector('.lightbox-counter');
  const prevBtn = lightboxOverlay.querySelector('.lightbox-prev');
  const nextBtn = lightboxOverlay.querySelector('.lightbox-next');

  const currentImg = currentGallery[currentIndex];
  img.src = currentImg.src;
  img.alt = currentImg.alt || '';

  // Update counter
  if (currentGallery.length > 1) {
    counter.textContent = `${currentIndex + 1} / ${currentGallery.length}`;
    counter.style.display = '';
    prevBtn.style.display = '';
    nextBtn.style.display = '';

    // Disable buttons at ends
    prevBtn.classList.toggle('disabled', currentIndex === 0);
    nextBtn.classList.toggle('disabled', currentIndex === currentGallery.length - 1);
  } else {
    // Single image - hide nav
    counter.style.display = 'none';
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
  }
}

function navigateLightbox(direction) {
  const newIndex = currentIndex + direction;
  if (newIndex >= 0 && newIndex < currentGallery.length) {
    currentIndex = newIndex;
    updateLightboxImage();
  }
}

function openLightbox(img) {
  createLightbox();

  // Find gallery (all lightbox images in the same parent container)
  const parent = img.closest('.content') || img.parentElement;
  currentGallery = Array.from(parent.querySelectorAll('.lightbox-img'));
  currentIndex = currentGallery.indexOf(img);

  updateLightboxImage();

  // Force reflow for transition
  void lightboxOverlay.offsetWidth;
  lightboxOverlay.classList.add('visible');

  // Prevent body scroll
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!lightboxOverlay) return;

  lightboxOverlay.classList.remove('visible');
  document.body.style.overflow = '';
}

// Initialize lightbox for all images with the class
function initLightbox() {
  document.querySelectorAll('.lightbox-img').forEach(img => {
    img.addEventListener('click', () => {
      openLightbox(img);
    });
  });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!lightboxOverlay?.classList.contains('visible')) return;

  if (e.key === 'Escape') {
    closeLightbox();
  } else if (e.key === 'ArrowLeft') {
    navigateLightbox(-1);
  } else if (e.key === 'ArrowRight') {
    navigateLightbox(1);
  }
});

// Initialize on load
initLightbox();
