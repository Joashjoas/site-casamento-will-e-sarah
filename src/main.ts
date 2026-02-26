import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

// Initialize Lenis for Smooth Scrolling
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
})

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

// Make iframe interactive on hover by pausing lenis occasionally if needed,
// but lenis handles iframe pointer-events automatically via CSS.
const iframes = document.querySelectorAll('iframe')
iframes.forEach((iframe) => {
  iframe.addEventListener('mouseenter', () => {
    lenis.stop()
  })
  iframe.addEventListener('mouseleave', () => {
    lenis.start()
  })
})

document.addEventListener('DOMContentLoaded', () => {
  // Replace text logic removed

  // Countdown Timer
  const countdownDate = new Date("Jun 20, 2026 15:30:00").getTime();
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (daysEl && hoursEl && minutesEl && secondsEl) {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      if (distance < 0) {
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      daysEl.textContent = days.toString().padStart(2, '0');
      hoursEl.textContent = hours.toString().padStart(2, '0');
      minutesEl.textContent = minutes.toString().padStart(2, '0');
      secondsEl.textContent = seconds.toString().padStart(2, '0');
    };

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  const tl = gsap.timeline();

  // Preloader Animation
  tl.to('.p-char', {
    y: 0,
    opacity: 1,
    duration: 1,
    stagger: 0.1,
    ease: "power4.out"
  })
    .to('.p-char', {
      y: -100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power4.in",
      delay: 0.5
    })
    .to('.preloader', {
      yPercent: -100,
      duration: 1,
      ease: "power4.inOut"
    }, "-=0.3")

    // Hero Reveal Animation
    .to('.hero-title .word', {
      y: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power4.out"
    }, "-=0.5")
    .fromTo('.hero-subtitle, .scroll-indicator, .header', {
      opacity: 0,
      y: 20
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out"
    }, "-=0.8");

  // Parallax effects for images
  gsap.utils.toArray<HTMLElement>('[data-speed]').forEach(el => {
    const parent = el.parentElement;
    if (!parent) return;

    // Find the img directly inside elements with data-speed
    const img = el.querySelector('img') || el;

    gsap.to(img, {
      y: () => `${(1 - parseFloat(el.dataset.speed || "1")) * 100}%`,
      ease: "none",
      scrollTrigger: {
        trigger: parent,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });

  // Reveal texts and elements on scroll
  gsap.utils.toArray<HTMLElement>('.fade-up').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });

  // SplitText effect alternative (manually or just simple fade for block texts)
  gsap.utils.toArray<HTMLElement>('.fade-text').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        }
      }
    );
  });
});
