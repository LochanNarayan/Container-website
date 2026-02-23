import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

class UIExperience {
  constructor() {
    this.initLenis();
    this.initHeroEntrance();
    this.initScrollAnimations();
    setupCarousel();
  }

  initLenis() {
    this.lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    this.lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      this.lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }

  initHeroEntrance() {
    // Cinematic Intro Timeline
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    // Initial state setup to prevent flash of unstyled content
    gsap.set('.hero-video', { scale: 1.2, filter: 'brightness(0) contrast(1)' });

    // Image fades up and scales down slightly
    tl.to('.hero-video', {
      scale: 1,
      filter: 'brightness(0.4) contrast(1.2)',
      duration: 2.5,
    })
      // Headline lines slide up from masking
      .to('.hero-headline', {
        y: '0%',
        duration: 1.5,
        stagger: 0.15,
      }, "-=1.8")
      // Subheadline fades and slides up
      .to('.hero-subheadline', {
        opacity: 1,
        y: 0,
        duration: 1,
      }, "-=1.2")
      // Marquee fades in at the end
      .to('.marquee-container', {
        opacity: 1,
        duration: 1.5,
        ease: 'power2.inOut'
      }, "-=0.5");
  }

  initScrollAnimations() {
    // Content fade up stagger for intro section
    gsap.from('.section-intro .eyebrow, .section-intro .section-title, .section-intro .section-desc, .section-intro .cta-group', {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.section-intro',
        start: 'top 80%',
      }
    });

    // Services card stagger
    gsap.from('.service-card', {
      y: 80,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.section-services',
        start: 'top 75%',
      }
    });

    // Operations Grid stagger
    gsap.from('.op-card', {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '.section-operations',
        start: 'top 75%',
      }
    });

    // Trust Metrics count up (simulated with opacity)
    gsap.from('.metric', {
      scale: 0.9,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: '.section-trust',
        start: 'top 85%',
      }
    });
  }
}

// Service Carousel Setup
const setupCarousel = () => {
  const slider = document.querySelector('.services-slider');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  if (!slider || !prevBtn || !nextBtn) return;

  const scrollAmount = 400; // card width + gap

  prevBtn.addEventListener('click', () => {
    slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });

  // Basic drag to scroll for desktop
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener('mouseleave', () => {
    isDown = false;
  });
  slider.addEventListener('mouseup', () => {
    isDown = false;
  });
  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; // scroll-fast
    slider.scrollLeft = scrollLeft - walk;
  });
};

document.addEventListener('DOMContentLoaded', () => {
  new UIExperience();
});
