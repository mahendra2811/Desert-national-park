// aboutNew.js - Custom JavaScript for the aboutNew.html page

document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      mainNav.classList.toggle('active');
      // Toggle between menu and close icon
      const icon = this.querySelector('i');
      if (icon.classList.contains('fa-bars')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    if (mainNav && mainNav.classList.contains('active') && !event.target.closest('.main-nav') && !event.target.closest('.nav-toggle')) {
      mainNav.classList.remove('active');
      const icon = navToggle.querySelector('i');
      if (icon.classList.contains('fa-times')) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    }
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Close mobile menu if open
      if (mainNav && mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
        const icon = navToggle.querySelector('i');
        if (icon && icon.classList.contains('fa-times')) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 80; // Adjust based on your header height
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Back to Top Button
  const backToTopButton = document.querySelector('.back-to-top');
  
  if (backToTopButton) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('active');
      } else {
        backToTopButton.classList.remove('active');
      }
    });
    
    backToTopButton.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Highlight active section in navigation
  const sections = document.querySelectorAll('.content-section');
  const navLinks = document.querySelectorAll('.main-nav a');
  
  function highlightNavigation() {
    let scrollPosition = window.pageYOffset;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  window.addEventListener('scroll', highlightNavigation);
  
  // Initialize highlight on page load
  highlightNavigation();
});