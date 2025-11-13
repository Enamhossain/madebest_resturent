// Global AOS initialization - only initialize once
let aosInitialized = false;
let aosPromise = null;

// Load AOS CSS dynamically
const loadAOSCSS = () => {
  if (document.querySelector('link[data-aos-css]')) return;
  
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css';
  link.setAttribute('data-aos-css', 'true');
  document.head.appendChild(link);
};

export const initAOS = () => {
  if (aosInitialized) return;
  
  // Return existing promise if already loading
  if (aosPromise) return aosPromise;
  
  // Load CSS first
  loadAOSCSS();
  
  // Dynamic import for AOS to reduce initial bundle size
  aosPromise = import('aos').then((AOS) => {
    if (!aosInitialized) {
      AOS.default.init({
        duration: 800,
        once: true,
        offset: 50,
        delay: 0,
        easing: 'ease-out-cubic',
        disable: false,
      });
      aosInitialized = true;
    }
    return AOS;
  }).catch((error) => {
    console.warn('AOS initialization failed:', error);
    aosPromise = null;
  });
  
  return aosPromise;
};

