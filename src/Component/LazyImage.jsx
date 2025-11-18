import React, { useState, useRef, useEffect, useMemo } from 'react';
import { optimizeImageUrl, getResponsiveImage, optimizeImageForDevice, detectDeviceType } from '../utils/imageOptimizer';

const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+',
  width,
  height,
  quality = 80,
  responsive = false,
  sizes,
  ...props 
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [imageRef, setImageRef] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [deviceType, setDeviceType] = useState('desktop');

  // Detect device type on mount and resize
  useEffect(() => {
    const updateDeviceType = () => {
      setDeviceType(detectDeviceType());
    };
    
    updateDeviceType();
    window.addEventListener('resize', updateDeviceType);
    return () => window.removeEventListener('resize', updateDeviceType);
  }, []);

  // Optimize image URL based on props
  const optimizedSrc = useMemo(() => {
    if (!src) return src;
    
    if (responsive) {
      const responsiveData = getResponsiveImage(src, sizes);
      return responsiveData.src;
    }
    
    if (width || height) {
      return optimizeImageUrl(src, { width, height, quality });
    }
    
    // Auto-optimize based on device type if no specific dimensions
    return optimizeImageForDevice(src, { width, height }, deviceType);
  }, [src, width, height, quality, responsive, sizes, deviceType]);

  // Get responsive image attributes
  const responsiveAttrs = useMemo(() => {
    if (!responsive || !src) return {};
    const responsiveData = getResponsiveImage(src, sizes);
    return {
      srcSet: responsiveData.srcSet,
      sizes: responsiveData.sizes
    };
  }, [src, responsive, sizes]);

  useEffect(() => {
    let observer;
    if (imageRef && imageSrc === placeholder) {
      observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setImageSrc(optimizedSrc);
              observer.unobserve(imageRef);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '50px'
        }
      );
      observer.observe(imageRef);
    }
    return () => {
      if (observer && observer.unobserve) {
        observer.unobserve(imageRef);
      }
    };
  }, [imageRef, imageSrc, placeholder, optimizedSrc]);

  const handleLoad = (e) => {
    setIsLoaded(true);
    if (props.onLoad) {
      props.onLoad(e);
    }
  };

  // Add width and height attributes to prevent layout shift
  const imageProps = {
    ...props,
    ref: setImageRef,
    src: imageSrc,
    alt: alt || '',
    className: `transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-70'} ${className}`,
    loading: 'lazy',
    decoding: 'async',
    onLoad: handleLoad,
    ...(width && { width }),
    ...(height && { height }),
    ...responsiveAttrs
  };

  return <img {...imageProps} />;
};

export default LazyImage;
