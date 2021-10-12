/*!
 * Carousel plugin
 * @author: RW
 */

;(function () {

  'use strict'; 

  const root = document.documentElement;
  const buttonNext = document.getElementById('navNext');
  const buttonPrev = document.getElementById('navPrev');
  const container = document.querySelector('.carousel-container');
  let slideWidth = getComputedStyle(root).getPropertyValue('--card-width');
  let scrollLenght = parseInt(slideWidth, 10);
  const slides = document.querySelectorAll('.carousel .card');
  const slidesArr = Array.from(slides);
  root.style.setProperty('--card-count', slidesArr.length);
  const lastSlide = slidesArr[slidesArr.length - 1];
  const firstSlide = slidesArr[0];
  
  buttonNext.addEventListener('click', function (event) {
    container.scrollLeft += scrollLenght;
  }, false);
  
  buttonPrev.addEventListener('click', function (event) {
    container.scrollLeft -= scrollLenght;
  }, false);
  
  /**
   * Toggling carousel nav and disabling/enabling buttons
   */
  let updateNav = function(){

    if (isInViewport(firstSlide) && isInViewport(lastSlide)) {
      buttonPrev.parentElement.classList.add('invisible');
      return;

    } else {
      buttonPrev.parentElement.classList.remove('invisible');

      if (isInViewport(firstSlide)) {
        buttonPrev.classList.add('disabled');
        buttonNext.classList.remove('disabled');
      }
      else if (isInViewport(lastSlide)) {
        buttonNext.classList.add('disabled');
        buttonPrev.classList.remove('disabled');
      }
      else if (!isInViewport(firstSlide) && !isInViewport(lastSlide)){
        buttonPrev.classList.remove('disabled');
        buttonNext.classList.remove('disabled');
      }
    }
  };

  window.addEventListener('resize', updateNav);

  /**
   * Scroll event debounce
   */

  var timeout; // Setup a timer for scroll debounce

  container.addEventListener('scroll', function (event) {

    // console.log('no debounce');

    // If there's a timer, cancel it
    if (timeout) {
      window.cancelAnimationFrame(timeout);
    }

    // Setup the new requestAnimationFrame()
    timeout = window.requestAnimationFrame(function () {

      // Run our scroll functions
      updateNav();
      
      // console.log('debounced');

    });

  }, false);

  updateNav();

})();


