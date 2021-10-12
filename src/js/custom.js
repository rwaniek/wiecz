/*!
 * Generic custom js
 * @author: RW
 */

/**
   * 
   * @param {DOM Element} elem 
   * @returns {boolean}
   */
  
 const isInViewport = function (elem) {
  // console.log('checking viewport');
  let bounding = elem.getBoundingClientRect();
  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * 
 * @param {DOM Element} el element to be manipulated
 * @param {DOM Element} triggerEl element in the viewport to trigger the manipulation
 */

const manipulateImg = function(el, triggerEl) {

  if(isInViewport(triggerEl)) {
    
    el.style.transform = "translateY(-20px)";
  } else {
    
    el.style.transform = "initial";
  };
  
};

;(function () {

  const body = document.querySelector('body');

  /**
   * Activate pricing plans 
   */

  document.addEventListener('click', function(event){
    let currentTarget = event.target.closest('.pricing-cards .card');
    
    if (!event.target.closest('.pricing-cards .card')) return;

    let pricingCards = Array.from(document.querySelectorAll('.pricing-cards .card'));
    
    pricingCards.forEach(function (card){
      card.classList.remove('card--active');
    });

    currentTarget.classList.add('card--active');

  });

  const pricingModalEl = document.getElementById('pricingModal');
  // const pricingModal = new Modal(pricingModalEl, {
  //   keyboard: false
  // });

  // // pricingModal.show();

  pricingModalEl.addEventListener('show.bs.modal', function (event) {
    let button = event.relatedTarget;
    let recordCount = button.getAttribute('data-bs-records');
    let price = button.getAttribute('data-bs-price');
    let count = pricingModalEl.querySelector('.modal-title span');
    let priceSpan = pricingModalEl.querySelector('#price');
    let packageNumber = pricingModalEl.querySelector('input[name="recordsNumber"]');
    count.textContent = recordCount;
    priceSpan.textContent = price;
    packageNumber.value = recordCount;
    
  });

  let counterEl = document.querySelector('.counter');
  let reportImg = document.getElementById('reportImg');

  /**
     * Scroll event debounce
     */
  var timeout; // Setup a timer for scroll debounce
  document.addEventListener('scroll', function (event) {

    // console.log('no debounce');

    // If there's a timer, cancel it
    if (timeout) {
      window.cancelAnimationFrame(timeout);
    }

    // Setup the new requestAnimationFrame()
    timeout = window.requestAnimationFrame(function () {

      // Run our scroll functions
      manipulateImg(reportImg, counterEl);
      // console.log('debounced');

    });
  }, false);

    let navToggler = document.querySelector('.nav-toggler');
    let nav = document.querySelector('nav');
    let navClose = document.querySelector('nav .btn-close');
    let navLinks = document.querySelectorAll('nav a');

    document.addEventListener('click', function(event){

      if (event.target.closest('.nav-toggler')) {
        nav.classList.add('open');
        body.style.overflow = 'hidden';
      }

      if (event.target.closest('nav .btn-close')) {
        nav.classList.remove('open');
        body.style.overflow = 'initial';
      }

      if (event.target.closest('nav a')) {
        nav.classList.remove('open');
        body.style.overflow = 'initial';
      }

    });
    

  

})();



