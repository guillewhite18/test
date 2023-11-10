import React, { useState, useEffect } from 'react';
import lottie from 'lottie-web';
import styles from '../styles/Home.module.scss'; 

interface LoadingProps {
  shouldLoadAnimation: boolean;
  onHideAnimation: () => void;
}

function Loading({ shouldLoadAnimation, onHideAnimation }: LoadingProps) {
  const [animationVisible, setAnimationVisible] = useState(false);

  useEffect(() => {
    if (shouldLoadAnimation) {
      const lottieAnimationPath = '/1699603749428.json';
      const container = document.getElementById('lottie-container');

      if (!container) {
        return; 
      }

      setAnimationVisible(true); 

      const animation = lottie.loadAnimation({
        container: container,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: lottieAnimationPath,
      });

      animation.addEventListener('complete', () => {
        const hideTimeout = setTimeout(() => {
          setAnimationVisible(false);
          onHideAnimation(); 
        }, 2000);

        return () => {
          clearTimeout(hideTimeout);
        };
      });

      return () => {
        animation.destroy();
      };
    } else {
      setAnimationVisible(false);
    }
  }, [shouldLoadAnimation, onHideAnimation]);

  return (
    <div id="lottie-container" className={`${styles.animationContainer} ${animationVisible ? styles.visible : ''}`}>
    </div>
  );
}

export default Loading;
