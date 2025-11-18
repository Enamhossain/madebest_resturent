/**
 * Image Optimization Utility for imgbb and other image hosts
 * 
 * NOTE: imgbb doesn't support URL parameters for resizing/optimization.
 * This utility helps with:
 * 1. Proper image dimension tracking
 * 2. Responsive image generation
 * 3. Device-specific optimization strategies
 * 
 * For best results with imgbb:
 * - Upload images at appropriate sizes (not 1MB+ full resolution)
 * - Use imgbb's resize feature when uploading
 * - Consider using multiple image sizes for responsive images
 */

/**
 * Optimizes image URL (currently returns as-is since imgbb doesn't support URL params)
 * This function is kept for future compatibility and other image hosts
 * @param {string} url - Original image URL
 * @param {Object} options - Optimization options (for future use or other hosts)
 * @param {number} options.width - Desired width in pixels (for tracking)
 * @param {number} options.height - Desired height in pixels (for tracking)
 * @param {number} options.quality - Quality hint (for documentation)
 * @returns {string} Image URL (optimized if host supports it, otherwise original)
 */
export const optimizeImageUrl = (url, options = {}) => {
  if (!url || typeof url !== 'string') return url;

  const {
    width,
    height,
    quality = 80
  } = options;

  // Check if URL is from imgbb
  const isImgbb = url.includes('i.ibb.co') || url.includes('ibb.co');
  
  // imgbb doesn't support URL parameters for optimization
  // Return original URL but log optimization intent for debugging
  if (process.env.NODE_ENV === 'development' && (width || height)) {
    console.log(`[Image Optimizer] Requested optimization for ${url}:`, { width, height, quality });
  }

  // For future: if using other image hosts that support URL params, add them here
  // Example for Cloudinary, Imgix, etc:
  // if (url.includes('cloudinary.com')) {
  //   const params = new URLSearchParams();
  //   if (width) params.set('w', width);
  //   if (height) params.set('h', height);
  //   if (quality) params.set('q', quality);
  //   return `${url}?${params.toString()}`;
  // }

  return url;
};

/**
 * Gets responsive image sizes based on viewport
 * @param {string} url - Original image URL
 * @param {Object} sizes - Size breakpoints
 * @returns {Object} Object with srcSet and sizes attributes
 */
export const getResponsiveImage = (url, sizes = {}) => {
  const {
    mobile = 400,
    tablet = 768,
    desktop = 1200,
    large = 1920
  } = sizes;

  if (!url || typeof url !== 'string') {
    return { src: url, srcSet: null, sizes: null };
  }

  // Generate srcset for different screen sizes
  const srcSet = [
    `${optimizeImageUrl(url, { width: mobile, quality: 75 })} ${mobile}w`,
    `${optimizeImageUrl(url, { width: tablet, quality: 80 })} ${tablet}w`,
    `${optimizeImageUrl(url, { width: desktop, quality: 85 })} ${desktop}w`,
    `${optimizeImageUrl(url, { width: large, quality: 90 })} ${large}w`
  ].join(', ');

  const sizesAttr = `(max-width: ${mobile}px) ${mobile}px, (max-width: ${tablet}px) ${tablet}px, (max-width: ${desktop}px) ${desktop}px, ${large}px`;

  return {
    src: optimizeImageUrl(url, { width: desktop, quality: 85 }),
    srcSet,
    sizes: sizesAttr
  };
};

/**
 * Optimizes image based on container size and device type
 * @param {string} url - Original image URL
 * @param {Object} containerSize - Container dimensions
 * @param {string} deviceType - 'mobile', 'tablet', or 'desktop'
 * @returns {string} Optimized image URL
 */
export const optimizeImageForDevice = (url, containerSize = {}, deviceType = 'desktop') => {
  const deviceWidths = {
    mobile: 400,
    tablet: 768,
    desktop: 1200
  };

  const deviceQualities = {
    mobile: 75,  // Lower quality for mobile to save bandwidth
    tablet: 80,
    desktop: 85
  };

  const defaultWidth = deviceWidths[deviceType] || deviceWidths.desktop;
  const quality = deviceQualities[deviceType] || deviceQualities.desktop;

  const width = containerSize.width || defaultWidth;
  const height = containerSize.height || null;

  return optimizeImageUrl(url, {
    width,
    height,
    quality
  });
};

/**
 * Preloads optimized image
 * @param {string} url - Image URL to preload
 * @param {Object} options - Optimization options
 * @returns {Promise} Promise that resolves when image is loaded
 */
export const preloadOptimizedImage = (url, options = {}) => {
  return new Promise((resolve, reject) => {
    const optimizedUrl = optimizeImageUrl(url, options);
    const img = new Image();
    
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${optimizedUrl}`));
    img.src = optimizedUrl;
  });
};

/**
 * Detects device type for responsive image optimization
 * @returns {string} Device type: 'mobile', 'tablet', or 'desktop'
 */
export const detectDeviceType = () => {
  if (typeof window === 'undefined') return 'desktop';
  
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

